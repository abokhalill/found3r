"use client";

import { useState } from "react";
import { useMutation, useAction, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Id } from "../../../../convex/_generated/dataModel";

export default function TestValidationPage() {
  const [domain, setDomain] = useState("");
  const [projectId, setProjectId] = useState<Id<"projects"> | null>(null);
  const [status, setStatus] = useState("idle");
  
  const createProfile = useMutation(api.validation_api.createIdeaProfile);
  const trigger = useAction(api.validation_api.triggerFullIntelligenceSweep);
  
  const summary = useQuery(api.validation_api.getValidationSummary, 
    projectId ? { projectId } : "skip"
  );
  const insights = useQuery(api.validation_api.getGlobalInsights, projectId ? { projectId } : "skip");

  const handleStart = async () => {
    if (!domain) return;
    setStatus("creating_profile");
    try {
      // 1. Create Profile
      const pid = await createProfile({
        niche: domain,
        description: "Test validation for " + domain
      });
      setProjectId(pid);
      
      // 2. Trigger Validation
      setStatus("triggering_agent");
      await trigger({ projectId: pid });
      
      setStatus("validating");
    } catch (e: any) {
      console.error(e);
      setStatus("error: " + e.message);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-12 font-mono">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
            <h1 className="text-2xl font-bold text-amber-500">E2E Validation Pipeline Test</h1>
            <p className="text-zinc-400">Enter a domain to run the full scrape-score-ticket loop.</p>
        </div>

        <div className="flex gap-4">
            <Input 
                value={domain} 
                onChange={(e) => setDomain(e.target.value)} 
                placeholder="example.com" 
                className="bg-zinc-900 border-zinc-800 text-white"
            />
            <Button onClick={handleStart} disabled={status !== "idle" && status.startsWith("error")}>
                {status === "idle" ? "Run Pipeline" : status}
            </Button>
        </div>

        {projectId && (
            <div className="grid grid-cols-2 gap-8">
                <div className="space-y-8">
                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardHeader><CardTitle className="text-white">Project Context</CardTitle></CardHeader>
                        <CardContent>
                            <pre className="text-xs text-zinc-300 overflow-auto max-h-60">
                                {JSON.stringify(summary?.project, null, 2)}
                            </pre>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900 border-zinc-800">
                         <CardHeader><CardTitle className="text-white">Agent Logs</CardTitle></CardHeader>
                         <CardContent>
                            <div className="space-y-2 text-xs">
                                {summary?.latestLogs?.map((log: any, i: number) => (
                                    <div key={i} className="text-zinc-400">
                                        <span className="text-amber-500">[{log.agentName}]</span> {log.log}
                                    </div>
                                ))}
                            </div>
                         </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardHeader><CardTitle className="text-white">Validation Snapshot</CardTitle></CardHeader>
                        <CardContent>
                            <pre className="text-xs text-green-300 overflow-auto max-h-96">
                                {JSON.stringify(summary?.validation, null, 2)}
                            </pre>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardHeader><CardTitle className="text-white">Global Insights</CardTitle></CardHeader>
                        <CardContent>
                            <pre className="text-xs text-blue-300 overflow-auto max-h-96">
                                {JSON.stringify(insights, null, 2)}
                            </pre>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
