import { useCallback, useEffect, useState } from "react";
import { useCloudContext } from "../../context/Context";
import { useApi } from "../../services/api.profile";
import { toast } from "sonner";
import { Camera, Check, Edit2, User, X } from "lucide-react";
import ProfileTab from "../ProfileTab";

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

export interface ProfileState extends UserData {
  isLoading: boolean;
  isEditing: boolean;
  error: string | null;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface ProfileTabProps {
  userData: UserData;
  isEditing: boolean;
  setUserData: (data: UserData) => void;
}
const defaultUserData: UserData = {
  name: "Guest User",
  email: "",
  phone: "",
  company: "",
  role: "User",
  avatar: null,
  location: "",
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  joinDate: new Date().toISOString(),
  lastActive: new Date().toISOString(),
  bio: "",
  skills: [],
  languages: [],
  socialLinks: {
    github: "",
    linkedin: "",
    twitter: "",
  },
  notificationPreferences: {
    email: {
      securityAlerts: true,
      newsletter: true,
      productUpdates: false,
    },
    push: {
      newMessages: true,
      accountActivity: true,
    },
  },
};
const ProfileHeader: React.FC<{
  state: ProfileState;
  handleEditToggle: () => void;
  setState: React.Dispatch<React.SetStateAction<ProfileState>>;
  onSave: () => Promise<void>;
}> = ({ state, setState, onSave, handleEditToggle }) => {
  console.log("ProfileHeader render - isEditing:", state.isEditing);

  const { profileApi } = useApi();
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (e.g., max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    try {
      setIsUploadingAvatar(true); // Use separate loading state

      // Create a preview URL for immediate feedback
      const previewUrl = URL.createObjectURL(file);
      setState((prev) => ({ ...prev, avatar: previewUrl }));

      const response = await profileApi.updateAvatar(file);

      if (response.success && response.data) {
        setState((prev) => ({
          ...prev,
          avatar: response.data.avatar,
        }));
        toast.success("Avatar updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update avatar");
      // Revert to previous avatar if needed
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error ? error.message : "Failed to update avatar",
      }));
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-black/30 border border-white/10 overflow-hidden">
            {state.avatar ? (
              <img
                src={state.avatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-full h-full p-4 text-gray-400" />
            )}
            {isUploadingAvatar && ( // Use separate loading state
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" />
              </div>
            )}
          </div>
          {state.isEditing && (
            <label className="absolute bottom-0 right-0 p-1 bg-[rgba(207,8,140,1)] hover:bg-[rgba(207,8,140,0.8)] rounded-full cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <Camera size={16} />
            </label>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{state.name}</h1>
          <p className="text-gray-400">{state.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {state.isEditing ? (
          <>
            <button
              onClick={handleEditToggle} // Use handleEditToggle here instead
              className="px-4 py-2 bg-black/30 hover:bg-black/40 rounded-lg flex items-center gap-2"
              disabled={state.isLoading || isUploadingAvatar}
            >
              <X size={16} />
              Cancel
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 bg-[rgba(207,8,140,1)] hover:bg-[rgba(207,8,140,0.8)] rounded-lg flex items-center gap-2"
              disabled={state.isLoading || isUploadingAvatar}
            >
              {state.isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              ) : (
                <Check size={16} />
              )}
              Save Changes
            </button>
          </>
        ) : (
          <button
            onClick={handleEditToggle}
            className="px-4 py-2 bg-[rgba(207,8,140,1)] hover:bg-[rgba(207,8,140,0.8)] rounded-lg flex items-center gap-2"
            disabled={state.isLoading || isUploadingAvatar}
          >
            <Edit2 size={16} />
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};
const ProfileContent: React.FC = () => {
  const { profileApi } = useApi();
  const [state, setState] = useState<ProfileState>({
    ...defaultUserData,
    isLoading: false,
    isEditing: false,
    error: null,
  });

  // Add logging for state changes
  useEffect(() => {
    console.log("Current state:", state);
  }, [state]);

  const handleEditToggle = useCallback(() => {
    console.log("Edit toggle clicked. Current isEditing:", state.isEditing);
    setState((prev) => {
      const newState = {
        ...prev,
        isEditing: !prev.isEditing,
      };
      console.log("New state after edit toggle:", newState);
      return newState;
    });
  }, [state.isEditing]); // Add state.isEditing as dependency

  // Fetch profile data on mount

  useEffect(() => {
    const fetchProfile = async () => {
      console.log("Fetching profile data...");
      setState((prev) => ({ ...prev, isLoading: true }));

      try {
        const response = await profileApi.getProfile();
        console.log("Profile API response:", response);

        // Change this condition to check for error: false
        if (response.error === false && response.profile) {
          setState((prev) => {
            const newState = {
              ...prev,
              ...response.profile,
              isLoading: false,
              error: null,
            };
            console.log("Updated state with profile data:", newState);
            return newState;
          });
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error:
            error instanceof Error ? error.message : "Failed to load profile",
        }));
        toast.error("Failed to load profile data");
      }
    };

    fetchProfile();
  }, []);
  const handleProfileSave = async () => {
    console.log("Saving profile...");
    try {
      setState((prev) => ({ ...prev, isLoading: true }));

      // Filter only allowed fields
      const allowedFields = [
        "name",
        "phone",
        "location",
        "bio",
        "skills",
        "languages",
        "socialLinks",
      ];

      const updateData = Object.fromEntries(
        Object.entries(state)
          .filter(([key]) => allowedFields.includes(key))
          .map(([key, value]) => [key, value])
      );

      console.log("Filtered update data:", updateData);

      const response = await profileApi.updateProfile(updateData);

      if (response.error === false && response.profile) {
        setState((prev) => {
          const newState = {
            ...prev,
            ...response.profile,
            isEditing: false,
            isLoading: false,
            error: null,
          };
          console.log("State after successful save:", newState);
          return newState;
        });
        toast.success("Profile updated successfully");
      } else {
        throw new Error(response.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Profile save error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile"
      );
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error:
          error instanceof Error ? error.message : "Failed to update profile",
      }));
    }
  };

  console.log("Rendering ProfileContent. Current state:", {
    isLoading: state.isLoading,
    isEditing: state.isEditing,
    error: state.error,
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <ProfileHeader
        state={state}
        setState={setState}
        handleEditToggle={handleEditToggle}
        onSave={handleProfileSave}
      />
      <div className="border-b border-white/10 mb-8">
        <div className="flex gap-4">
          <button
            className={`py-2 px-4 border-b-2 
              border-[rgba(207,8,140,1)] text-white"
              
            `}
          >
            Profile
          </button>
        </div>
      </div>
      <div>
        <ProfileTab
          userData={state}
          isEditing={state.isEditing}
          setUserData={(data: UserData) =>
            setState((prev) => ({ ...prev, ...data }))
          }
        />
      </div>
    </div>
  );
};

export default ProfileContent;
