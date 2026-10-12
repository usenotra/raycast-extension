import { ORGANIZATION_HEADER } from "../constants/workspace";
import type { ListWorkspacesResponse, Workspace } from "../types";

export function getOrganizationHeaders(organizationId: string | null | undefined): Record<string, string> {
  return organizationId ? { [ORGANIZATION_HEADER]: organizationId } : {};
}

export function resolveSelectedWorkspace(
  response: ListWorkspacesResponse | undefined,
  storedOrganizationId: string | undefined,
): Workspace | undefined {
  const workspaces = response?.workspaces ?? [];

  return (
    workspaces.find((workspace) => workspace.id === storedOrganizationId) ??
    workspaces.find((workspace) => workspace.id === response?.currentWorkspace?.id) ??
    workspaces.find((workspace) => workspace.isCurrent) ??
    workspaces[0]
  );
}
