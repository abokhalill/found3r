---
description: How to set up and debug Clerk Webhooks
---

# Setting up Clerk Webhooks

This workflow guides you through setting up the Clerk Webhook to sync user data with Convex.

## Prerequisites
- Clerk Project created
- Convex Project configured
- `ngrok` installed (for local development)

## 1. Local Development Setup

To test webhooks locally, you need to expose your local server to the internet.

1.  **Start your local server**:
    ```bash
    npm run dev
    ```

2.  **Start ngrok**:
    Open a new terminal and run:
    ```bash
    ngrok http 3000
    ```
    Copy the forwarding URL (e.g., `https://your-id.ngrok-free.app`).

3.  **Configure Clerk Dashboard**:
    - Go to the [Clerk Dashboard](https://dashboard.clerk.com/).
    - Navigate to **Webhooks**.
    - Click **Add Endpoint**.
    - **Endpoint URL**: Paste your ngrok URL and append `/api/clerk/webhook` (e.g., `https://your-id.ngrok-free.app/api/clerk/webhook`).
    - **Message Filtering**: Select `user.created`, `user.updated`, and `user.deleted`.
    - Click **Create**.

4.  **Get Signing Secret**:
    - Copy the **Signing Secret** (starts with `whsec_`) from the newly created endpoint.
    - Add it to your `.env.local` file:
      ```env
      CLERK_WEBHOOK_SECRET=whsec_...
      ```

## 2. Production Setup

1.  **Deploy your app** (e.g., to Vercel).
2.  **Configure Clerk Dashboard**:
    - Go to **Webhooks**.
    - Add a new endpoint (or edit the existing one if you want separate dev/prod environments).
    - **Endpoint URL**: `https://your-production-domain.com/api/clerk/webhook`.
    - **Message Filtering**: Select `user.created`, `user.updated`, `user.deleted`.
3.  **Set Environment Variable**:
    - Add `CLERK_WEBHOOK_SECRET` to your production environment variables (e.g., in Vercel Project Settings).

## 3. Verification

1.  **Trigger an Event**:
    - Go to the **Testing** tab in the Clerk Webhook dashboard.
    - Send a test event (e.g., `user.created`).
2.  **Check Logs**:
    - Check your local terminal or production logs.
    - You should see "🔔 Webhook received" and "✅ User created in Convex".
