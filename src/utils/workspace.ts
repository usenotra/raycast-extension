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

  if (workspaces.length === 0) {
    // Without a workspace list (e.g. the request failed) keep sending the stored choice instead of no header.
    return storedOrganizationId ? toStoredWorkspace(storedOrganizationId) : undefined;
  }

  return (
    workspaces.find((workspace) => workspace.id === storedOrganizationId) ??
    workspaces.find((workspace) => workspace.id === response?.currentWorkspace?.id) ??
    workspaces.find((workspace) => workspace.isCurrent) ??
    workspaces[0]
  );
}

function toStoredWorkspace(organizationId: string): Workspace {
  return {
    id: organizationId,
    isCurrent: true,
    logo: null,
    name: organizationId,
    role: "",
    slug: "",
    status: "",
  };
}
