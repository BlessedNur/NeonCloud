// services/api.service.ts

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
}

export interface NotificationPreferences {
  email: {
    securityAlerts: boolean;
    newsletter: boolean;
    productUpdates: boolean;
  };
  push: {
    newMessages: boolean;
    accountActivity: boolean;
  };
}
export interface UserData {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  avatar: string | null;
  location: string;
  timezone: string;
  joinDate: string;
  lastActive: string;
  bio: string;
  skills: string[];
  languages: string[];
  socialLinks: SocialLinks;
  notificationPreferences?: NotificationPreferences;
}

import { useCloudContext } from "../context/Context";

interface ApiResponse<T> {
  error: boolean;
  message?: string;
  profile?: T; // Changed from data to profile to match backend
}

const API_URL = "http://localhost:4000/api";

export const useApi = () => {
  const { getToken, logout } = useCloudContext();

  const fetchWithAuth = async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> => {
    const token = getToken();

    // Debug token
    console.log("Raw token:", token);

    if (!token) {
      logout();
      throw new Error("No authentication token found");
    }

    // Check if the body is FormData
    const isFormData = options.body instanceof FormData;

    // Prepare headers based on content type
    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`, // Add Bearer prefix here
    };

    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    const finalHeaders = {
      ...headers,
      ...(options.headers || {}),
    };

    try {
      // Debug request details
      console.log("Making request to:", `${API_URL}${endpoint}`);
      console.log("With headers:", finalHeaders);

      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: finalHeaders,
      });

      // Debug response
      console.log("Response status:", response.status);
      console.log("Response headers:", Object.fromEntries(response.headers));

      if (response.status === 401) {
        logout();
        throw new Error(
          "Authentication failed - token might be invalid or expired"
        );
      }

      const data = await response.json();

      // Debug response data
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.message || "Request failed");
      }

      return data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  };

  // Profile API methods
  const profileApi = {
    getProfile: async () => {
      try {
        const token = getToken();
        const response = await fetch(`${API_URL}/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data: ApiResponse<UserData> = await response.json();
        return data; // Now returns { error: boolean, profile: UserData }
      } catch (error) {
        console.error("Get profile error:", error);
        throw error;
      }
    }, // services/api.service.ts
    updateProfile: async (profileData: Partial<UserData>) => {
      try {
        const token = getToken();
        console.log("Sending profile update:", profileData);

        const response = await fetch(`${API_URL}/profile`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to update profile");
        }

        return data;
      } catch (error) {
        console.error("Update profile error:", error);
        throw error;
      }
    },

    updateAvatar: async (file: File) => {
      try {
        const token = getToken();
        const formData = new FormData();
        formData.append("avatar", file);

        console.log("Uploading file:", file);

        const response = await fetch(`${API_URL}/profile/avatar`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload avatar");
        }

        const data = await response.json();
        // Transform success response to error format to match other endpoints
        return {
          error: !data.success,
          profile: data.data,
          message: data.message,
        };
      } catch (error) {
        console.error("Avatar upload error:", error);
        throw error;
      }
    },

    updateNotificationPreferences: async (
      preferences: NotificationPreferences
    ) => {
      try {
        const response = await fetchWithAuth("/profile/notifications", {
          method: "PUT",
          body: JSON.stringify(preferences),
        });

        return {
          error: response.error,
          profile: { notificationPreferences: response.preferences },
          message: response.message,
        };
      } catch (error) {
        throw error;
      }
    },

    deactivateAccount: async () => {
      return fetchWithAuth("/profile/deactivate", {
        method: "POST",
      });
    },

    deleteAccount: async () => {
      return fetchWithAuth("/profile", {
        method: "DELETE",
      });
    },
  };

  return { profileApi };
};
