"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";

export function useAuthenticatedQuery(queryFn: any, ...args: any[]) {
  const { isSignedIn, user } = useUser();
  const result = useQuery(isSignedIn ? queryFn : null, args[0]);
  return result;
}

export function useAuthenticatedMutation(mutationFn: any) {
  const { isSignedIn } = useUser();
  const mutation = useMutation(mutationFn);
  
  if (!mutation) {
    return null;
  }
  
  return {
    mutate: (...args: any[]) => {
      if (!isSignedIn) {
        throw new Error("Not authenticated");
      }
      return mutation(args[0]);
    }
  };
}

export function useCurrentUser() {
  const { user, isSignedIn } = useUser();
  const convexUser = useAuthenticatedQuery(api.users.getUser, { clerkId: user?.id || "" });
  
  return {
    user,
    convexUser,
    isSignedIn,
    isLoading: isSignedIn && convexUser === undefined,
  };
}

export function useProjects() {
  return useAuthenticatedQuery(api.functions.projects.getProjects);
}

export function useProject(projectId: string) {
  return useAuthenticatedQuery(api.functions.projects.getProject, { projectId });
}

export function useCreateProject() {
  return useAuthenticatedMutation(api.functions.projects.createProject);
}

export function useUpdateProject() {
  return useAuthenticatedMutation(api.functions.projects.updateProject);
}

export function useDeleteProject() {
  return useAuthenticatedMutation(api.functions.projects.deleteProject);
}

export function useTasks(projectId: string) {
  return useAuthenticatedQuery(api.functions.tasks.getTasks, { projectId });
}

export function useCreateTask() {
  return useAuthenticatedMutation(api.functions.tasks.createTask);
}

export function useUpdateTask() {
  return useAuthenticatedMutation(api.functions.tasks.updateTask);
}
