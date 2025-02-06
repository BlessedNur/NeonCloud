const API_BASE_URL = "http://localhost:4000/api";

interface DeployProjectParams {
  projectId: string;
  files: Array<{ file: File }>;
  subdomain: string;
}

const getHeaders = (includeContentType = true) => {
  const token = localStorage.getItem("token");
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  if (includeContentType) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
};

export const api = {
  async uploadFiles(files: File[], projectId: string) {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    const response = await fetch(`${API_BASE_URL}/upload/${projectId}/files`, {
      method: "POST",
      headers: getHeaders(false),
      body: formData,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  },

  async createProject(data: any) {
    const response = await fetch(`${API_BASE_URL}/deployments`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        name: data.name || `project-${Date.now()}`,
        settings: {
          framework: data.framework || "static",
          buildCommand: data.buildCommand || "",
          outputDirectory: data.outputDirectory || "",
        },
        domain: data.domain || null,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create project");
    }

    return response.json();
  },

  async deployProject({ projectId, files, subdomain }: DeployProjectParams) {
    const formData = new FormData();
    files.forEach(({ file }) => {
      formData.append("files", file);
    });

    // Add subdomain to formData
    formData.append("subdomain", subdomain);

    const response = await fetch(
      `${API_BASE_URL}/deployments/${projectId}/deploy`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  },
};
