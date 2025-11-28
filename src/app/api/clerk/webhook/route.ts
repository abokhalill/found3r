import { NextRequest } from "next/server";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: NextRequest) {
  console.log("🔔 Webhook received");

  try {
    const headerPayload = await headers();
    const svixId = headerPayload.get("svix-id");
    const svixTimestamp = headerPayload.get("svix-timestamp");
    const svixSignature = headerPayload.get("svix-signature");

    console.log("📋 Headers:", { svixId, svixTimestamp, hasSignature: !!svixSignature });

    if (!svixId || !svixTimestamp || !svixSignature) {
      console.error("❌ Missing svix headers");
      return new Response("Error occurred -- no svix headers", {
        status: 400,
      });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    console.log("📦 Payload type:", payload.type);

    // Check if webhook secret is configured
    if (!process.env.CLERK_WEBHOOK_SECRET) {
      console.error("❌ CLERK_WEBHOOK_SECRET not configured in .env.local");
      console.error("⚠️ Webhook cannot verify signature without secret");
      return new Response("Webhook secret not configured", { status: 500 });
    }

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    let evt: any;

    try {
      evt = wh.verify(body, {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      }) as any;
      console.log("✅ Webhook verified");
    } catch (err) {
      console.error("❌ Error verifying webhook:", err);
      return new Response("Error occurred", { status: 400 });
    }

    const eventType = evt.type;
    console.log("🎯 Event type:", eventType);

    if (eventType === "user.created") {
      const { id, email_addresses, first_name, last_name, image_url } = evt.data;

      const email = email_addresses?.[0]?.email_address || `test-user-${id}@example.com`;

      if (!email_addresses?.[0]?.email_address) {
        console.warn("⚠️ No email found in webhook payload. Using fallback for testing:", email);
      }

      console.log("👤 Creating user in Convex:", {
        clerkId: id,
        email: email,
      });

      try {
        await convex.mutation(api.users.createUser, {
          clerkId: id,
          email: email,
          name: `${first_name || ""} ${last_name || ""}`.trim() || undefined,
        });
        console.log("✅ User created in Convex");
      } catch (error) {
        console.error("❌ Failed to create user in Convex:", error);
        throw error;
      }
    }

    if (eventType === "user.updated") {
      const { id, email_addresses, first_name, last_name, image_url } = evt.data;

      console.log("🔄 Updating user in Convex:", { clerkId: id });

      try {
        await convex.mutation(api.users.updateUser, {
          clerkId: id,
          name: `${first_name || ""} ${last_name || ""}`.trim() || undefined,
        });
        console.log("✅ User updated in Convex");
      } catch (error) {
        console.error("❌ Failed to update user in Convex:", error);
        throw error;
      }
    }

    if (eventType === "user.deleted") {
      const { id } = evt.data;
      console.log(`🗑️ Deleting user ${id} and all associated data`);

      try {
        await convex.mutation(api.users.deleteUser, { clerkId: id });
        console.log("✅ User and all data deleted from Convex");
      } catch (error) {
        console.error("❌ Failed to delete user from Convex:", error);
        // Don't throw - user is already deleted from Clerk
      }
    }

    return new Response("", { status: 200 });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
