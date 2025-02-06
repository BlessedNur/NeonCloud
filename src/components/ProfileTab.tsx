// ProfileTab.tsx
import { useApi } from "../services/api.profile";
import { toast } from "sonner";

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

import React, { useState, useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

interface DeactivateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeactivate: () => void;
}

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: {
    email: {
      securityAlerts: boolean;
      newsletter: boolean;
      productUpdates: boolean;
    };
    push: {
      newMessages: boolean;
      accountActivity: boolean;
    };
  };
  onSave: (preferences: any) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
const ProfileTab: React.FC<ProfileTabProps> = ({
  userData,
  isEditing,
  setUserData,
}) => {
  console.log("ProfileTab render - isEditing:", isEditing);

  // Add effect to log prop changes
  useEffect(() => {
    console.log("ProfileTab isEditing changed:", isEditing);
  }, [isEditing]);

  const { profileApi } = useApi();
  const [isLoading, setIsLoading] = useState(false);
  const [editedData, setEditedData] = useState<UserData>(userData);
  const [newSkill, setNewSkill] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] =
    useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  useEffect(() => {
    setEditedData(userData);
  }, [userData]);

  const handleInputChange = (field: keyof UserData, value: any) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setUserData({
      ...userData,
      [field]: value,
    });
  };
  const handleDeactivateAccount = async () => {
    try {
      setIsLoading(true);
      const response = await profileApi.deactivateAccount();
      if (response.success) {
        toast.success("Account deactivated successfully");
        setShowDeactivateModal(false);
      }
    } catch (error) {
      toast.error("Failed to deactivate account");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsLoading(true);
      const response = await profileApi.deleteAccount();
      if (response.success) {
        toast.success("Account deleted successfully");
        setShowDeleteModal(false);
        // Redirect to logout or home page
        window.location.href = "/";
      }
    } catch (error) {
      toast.error("Failed to delete account");
    } finally {
      setIsLoading(false);
    }
  };
  const handleNotificationSave = async (
    newPreferences: NotificationPreferences
  ) => {
    try {
      setIsLoading(true);
      const response = await profileApi.updateNotificationPreferences(
        newPreferences
      );
      if (response?.success) {
        handleInputChange("notificationPreferences", newPreferences);
        toast.success("Notification preferences updated");
      }
    } catch (error) {
      toast.error("Failed to update notification preferences");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLinkChange = (
    platform: keyof typeof userData.socialLinks,
    value: string
  ) => {
    const socialLinks = {
      ...editedData.socialLinks,
      [platform]: value,
    };
    handleInputChange("socialLinks", socialLinks);
  };

  const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
    isOpen,
    onClose,
    onDelete,
  }) => (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Account">
      <div className="space-y-4">
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-red-500 mt-1" size={20} />
            <div>
              <h4 className="text-red-500 font-medium mb-1">Warning</h4>
              <p className="text-sm text-gray-400">
                This action cannot be undone. All your data will be permanently
                deleted.
              </p>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Type &quot;DELETE&quot; to confirm
          </label>
          <input
            type="text"
            value={deleteConfirmation}
            onChange={(e) => setDeleteConfirmation(e.target.value)}
            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2"
            placeholder="DELETE"
          />
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-black/30 hover:bg-black/40 rounded-lg"
          >
            Cancel
          </button>
          <button
            disabled={deleteConfirmation !== "DELETE" || isLoading}
            onClick={onDelete}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Deleting..." : "Delete Account"}
          </button>
        </div>
      </div>
    </Modal>
  );

  const DeactivateAccountModal: React.FC<DeactivateAccountModalProps> = ({
    isOpen,
    onClose,
    onDeactivate,
  }) => (
    <Modal isOpen={isOpen} onClose={onClose} title="Deactivate Account">
      <div className="space-y-4">
        <p className="text-gray-400">
          Your account will be temporarily deactivated. You can reactivate it at
          any time by logging back in.
        </p>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-black/30 hover:bg-black/40 rounded-lg"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            onClick={onDeactivate}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg disabled:opacity-50"
          >
            {isLoading ? "Deactivating..." : "Deactivate Account"}
          </button>
        </div>
      </div>
    </Modal>
  );

  const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({
    isOpen,
    onClose,
    preferences,
    onSave,
  }) => {
    const [localPreferences, setLocalPreferences] = useState(preferences);

    const handleToggle = (category: "email" | "push", setting: string) => {
      setLocalPreferences((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          [setting]:
            !prev[category][setting as keyof (typeof prev)[typeof category]],
        },
      }));
    };

    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Notification Settings">
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-4">Email Notifications</h4>
            <div className="space-y-4">
              {Object.entries(localPreferences.email).map(([key, value]) => (
                <label key={key} className="flex items-center justify-between">
                  <span className="text-gray-400">
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleToggle("email", key)}
                    className="form-checkbox"
                  />
                </label>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-4">Push Notifications</h4>
            <div className="space-y-4">
              {Object.entries(localPreferences.push).map(([key, value]) => (
                <label key={key} className="flex items-center justify-between">
                  <span className="text-gray-400">
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleToggle("push", key)}
                    className="form-checkbox"
                  />
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              disabled={isLoading}
              onClick={() => {
                onSave(localPreferences);
                onClose();
              }}
              className="px-4 py-2 bg-[rgba(207,8,140,1)] hover:bg-[rgba(207,8,140,0.8)] rounded-lg disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div className="space-y-8">
      {/* Basic Info Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Basic Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Name</label>
            <input
              type="text"
              value={editedData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              disabled={!isEditing}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 disabled:opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              type="email"
              value={editedData.email}
              disabled
              className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Phone</label>
            <input
              type="tel"
              value={editedData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              disabled={!isEditing}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 disabled:opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Location</label>
            <input
              type="text"
              value={editedData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              disabled={!isEditing}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 disabled:opacity-50"
            />
          </div>
        </div>
      </section>
      {/* Bio Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Bio</h3>
        <textarea
          value={editedData.bio}
          onChange={(e) => handleInputChange("bio", e.target.value)}
          disabled={!isEditing}
          rows={4}
          className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 disabled:opacity-50"
        />
      </section>
      {/* Social Links Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Social Links</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {/* GitHub */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">GitHub</label>
            <div className="flex gap-2">
              <span className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-gray-400">
                github.com/
              </span>
              <input
                type="text"
                value={editedData.socialLinks.github.replace("github.com/", "")}
                onChange={(e) =>
                  handleSocialLinkChange(
                    "github",
                    `github.com/${e.target.value}`
                  )
                }
                disabled={!isEditing}
                className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 disabled:opacity-50"
              />
            </div>
          </div>

          {/* LinkedIn */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">LinkedIn</label>
            <div className="flex gap-2">
              <span className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-gray-400">
                linkedin.com/in/
              </span>
              <input
                type="text"
                value={editedData.socialLinks.linkedin.replace(
                  "linkedin.com/in/",
                  ""
                )}
                onChange={(e) =>
                  handleSocialLinkChange(
                    "linkedin",
                    `linkedin.com/in/${e.target.value}`
                  )
                }
                disabled={!isEditing}
                className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Twitter */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Twitter</label>
            <div className="flex gap-2">
              <span className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-gray-400">
                @
              </span>
              <input
                type="text"
                value={editedData.socialLinks.twitter.replace("@", "")}
                onChange={(e) =>
                  handleSocialLinkChange("twitter", `@${e.target.value}`)
                }
                disabled={!isEditing}
                className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 disabled:opacity-50"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Skills Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Skills</h3>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {editedData.skills.map((skill, index) => (
              <div
                key={index}
                className="bg-black/30 border border-white/10 rounded-lg px-3 py-1 flex items-center gap-2"
              >
                <span>{skill}</span>
                {isEditing && (
                  <button
                    onClick={() => {
                      const newSkills = editedData.skills.filter(
                        (_, i) => i !== index
                      );
                      handleInputChange("skills", newSkills);
                    }}
                    className="hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
          {isEditing && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (
                  newSkill.trim() &&
                  !editedData.skills.includes(newSkill.trim())
                ) {
                  handleInputChange("skills", [
                    ...editedData.skills,
                    newSkill.trim(),
                  ]);
                  setNewSkill("");
                }
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill"
                className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[rgba(207,8,140,1)] hover:bg-[rgba(207,8,140,0.8)] rounded-lg"
              >
                Add
              </button>
            </form>
          )}
        </div>
      </section>
      {/* Languages Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Languages</h3>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {editedData.languages.map((language, index) => (
              <div
                key={index}
                className="bg-black/30 border border-white/10 rounded-lg px-3 py-1 flex items-center gap-2"
              >
                <span>{language}</span>
                {isEditing && (
                  <button
                    onClick={() => {
                      const newLanguages = editedData.languages.filter(
                        (_, i) => i !== index
                      );
                      handleInputChange("languages", newLanguages);
                    }}
                    className="hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
          {isEditing && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (
                  newLanguage.trim() &&
                  !editedData.languages.includes(newLanguage.trim())
                ) {
                  handleInputChange("languages", [
                    ...editedData.languages,
                    newLanguage.trim(),
                  ]);
                  setNewLanguage("");
                }
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                placeholder="Add a language"
                className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[rgba(207,8,140,1)] hover:bg-[rgba(207,8,140,0.8)] rounded-lg"
              >
                Add
              </button>
            </form>
          )}
        </div>
      </section>
      {/* Account Management Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Account Management</h3>
        <div className="space-y-4">
          {/* Notification Preferences */}
          <div className="bg-black/30 border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium mb-1">Notification Preferences</h4>
                <p className="text-sm text-gray-400">
                  Manage your email and push notification settings
                </p>
              </div>
              <button
                onClick={() => setShowNotificationSettings(true)}
                className="px-4 py-2 bg-[rgba(207,8,140,1)] hover:bg-[rgba(207,8,140,0.8)] rounded-lg"
              >
                Manage
              </button>
            </div>
          </div>

          {/* Deactivate Account */}
          <div className="bg-black/30 border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium mb-1">Deactivate Account</h4>
                <p className="text-sm text-gray-400">
                  Temporarily disable your account
                </p>
              </div>
              <button
                onClick={() => setShowDeactivateModal(true)}
                className="px-4 py-2 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white rounded-lg"
              >
                Deactivate
              </button>
            </div>
          </div>

          {/* Delete Account */}
          <div className="bg-black/30 border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium mb-1 text-red-500">
                  Delete Account
                </h4>
                <p className="text-sm text-gray-400">
                  Permanently delete your account and all data
                </p>
              </div>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Modals */}
      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteAccount}
      />

      <DeactivateAccountModal
        isOpen={showDeactivateModal}
        onClose={() => setShowDeactivateModal(false)}
        onDeactivate={handleDeactivateAccount}
      />

      <NotificationSettingsModal
        isOpen={showNotificationSettings}
        onClose={() => setShowNotificationSettings(false)}
        preferences={
          userData.notificationPreferences || {
            email: {
              securityAlerts: true,
              newsletter: true,
              productUpdates: false,
            },
            push: {
              newMessages: true,
              accountActivity: true,
            },
          }
        }
        onSave={handleNotificationSave}
      />
    </div>
  );
};

export default ProfileTab;
