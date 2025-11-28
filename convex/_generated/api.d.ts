/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as agent_logs from "../agent_logs.js";
import type * as agents_buildPlanner from "../agents/buildPlanner.js";
import type * as agents_copilot from "../agents/copilot.js";
import type * as agents_distributionKit from "../agents/distributionKit.js";
import type * as agents_launchTest from "../agents/launchTest.js";
import type * as agents_signalScanner from "../agents/signalScanner.js";
import type * as analytics from "../analytics.js";
import type * as functions_founderMatrix from "../functions/founderMatrix.js";
import type * as functions_projects from "../functions/projects.js";
import type * as functions_tasks from "../functions/tasks.js";
import type * as functions_waitlist from "../functions/waitlist.js";
import type * as lib_auth from "../lib/auth.js";
import type * as lib_firecrawl from "../lib/firecrawl.js";
import type * as lib_llm from "../lib/llm.js";
import type * as lib_openai from "../lib/openai.js";
import type * as lib_scraping from "../lib/scraping.js";
import type * as orchestrator from "../orchestrator.js";
import type * as users from "../users.js";
import type * as validation_runFullSweep from "../validation/runFullSweep.js";
import type * as validation_api from "../validation_api.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  agent_logs: typeof agent_logs;
  "agents/buildPlanner": typeof agents_buildPlanner;
  "agents/copilot": typeof agents_copilot;
  "agents/distributionKit": typeof agents_distributionKit;
  "agents/launchTest": typeof agents_launchTest;
  "agents/signalScanner": typeof agents_signalScanner;
  analytics: typeof analytics;
  "functions/founderMatrix": typeof functions_founderMatrix;
  "functions/projects": typeof functions_projects;
  "functions/tasks": typeof functions_tasks;
  "functions/waitlist": typeof functions_waitlist;
  "lib/auth": typeof lib_auth;
  "lib/firecrawl": typeof lib_firecrawl;
  "lib/llm": typeof lib_llm;
  "lib/openai": typeof lib_openai;
  "lib/scraping": typeof lib_scraping;
  orchestrator: typeof orchestrator;
  users: typeof users;
  "validation/runFullSweep": typeof validation_runFullSweep;
  validation_api: typeof validation_api;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
