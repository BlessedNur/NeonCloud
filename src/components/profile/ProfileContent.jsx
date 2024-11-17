"use client";
import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Building,
  Camera,
  Edit2,
  Check,
  Globe,
  Clock,
  CreditCard,
  Calendar,
  DollarSign,
  Lock,
  Shield,
  Smartphone,
  Key,
  AlertTriangle,
  Activity,
  Briefcase,
  Link,
  Laptop,
  MessageSquare,
  Settings,
  Languages,
  Bell,
  X,
} from "lucide-react";

const ProfileContent = () => {
  // Base States
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // Modal States
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showRecoveryEmailModal, setShowRecoveryEmailModal] = useState(false);
  const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
  const [showUpgradePlanModal, setShowUpgradePlanModal] = useState(false);

  // Form States
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [recoveryEmailForm, setRecoveryEmailForm] = useState({
    email: "",
    password: "",
  });

  const [paymentMethodForm, setPaymentMethodForm] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
  });

  // Main User Data State

  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    company: "TechCorp Solutions",
    role: "Senior Developer",
    avatar: null,
    location: "San Francisco, CA",
    timezone: "UTC-7 (Pacific Time)",
    joinDate: "January 15, 2024",
    lastActive: "2 hours ago",
    bio: "Passionate developer with 8+ years of experience in full-stack development.",
    skills: ["React", "Node.js", "Python", "AWS", "Docker"],
    languages: ["English (Native)", "Spanish (Intermediate)", "French (Basic)"],
    socialLinks: {
      github: "github.com/alexjohnson",
      linkedin: "linkedin.com/in/alexjohnson",
      twitter: "@alexjohnson",
    },
    security: {
      lastPasswordChange: "October 15, 2024",
      twoFactorEnabled: true,
      loginHistory: [
        {
          date: "Nov 15, 2024",
          device: "Chrome on Windows",
          location: "San Francisco, CA",
          status: "Success",
        },
        {
          date: "Nov 14, 2024",
          device: "Mobile App on iPhone",
          location: "San Francisco, CA",
          status: "Success",
        },
      ],
    },
    billing: {
      nextBillingDate: "Dec 1, 2024",
      paymentMethods: [
        {
          lastFour: "4242",
          expiryDate: "12/25",
          isDefault: true,
        },
      ],
      history: [
        {
          date: "Nov 1, 2024",
          description: "Professional Plan",
          amount: "99.00",
          status: "Paid",
        },
      ],
    },
  });

  // Handlers
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSave = () => {
    setIsEditing(false);
    // I WILL ADD THIS DURING BACKEND NOW JUST FRONTEND
  };

  const handlePasswordChange = () => {
    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      alert("Please fill in all password fields");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords don't match");
      return;
    }
    // I WILL ADD THIS DURING BACKEND NOW JUST FRONTEND
    setShowPasswordModal(false);
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleRecoveryEmailChange = () => {
    if (!recoveryEmailForm.email || !recoveryEmailForm.password) {
      alert("Please fill in all fields");
      return;
    }
    setUserData({
      ...userData,
      security: {
        ...userData.security,
        recoveryEmail: recoveryEmailForm.email,
      },
    });
    setShowRecoveryEmailModal(false);
    setRecoveryEmailForm({ email: "", password: "" });
  };

  const handleRevokeAccess = (deviceId) => {
    const updatedDevices = userData.security.activeDevices.filter(
      (_, index) => index !== deviceId
    );
    setUserData({
      ...userData,
      security: {
        ...userData.security,
        activeDevices: updatedDevices,
      },
    });
  };

  const handleAddPaymentMethod = () => {
    if (
      !paymentMethodForm.cardNumber ||
      !paymentMethodForm.expiryDate ||
      !paymentMethodForm.cvv ||
      !paymentMethodForm.name
    ) {
      alert("Please fill in all payment details");
      return;
    }
    // I WILL ADD THIS DURING BACKEND NOW JUST FRONTEND
    setShowPaymentMethodModal(false);
    setPaymentMethodForm({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      name: "",
    });
  }; // Modal Components
  const Modal = ({ isOpen, onClose, title, children }) => {
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

  const PasswordChangeModal = ({
    isOpen,
    onClose,
    form,
    setForm,
    onSubmit,
  }) => (
    <Modal isOpen={isOpen} onClose={onClose} title="Change Password">
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Current Password
          </label>
          <input
            type="password"
            value={form.currentPassword}
            onChange={(e) =>
              setForm({ ...form, currentPassword: e.target.value })
            }
            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            New Password
          </label>
          <input
            type="password"
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2"
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
            onClick={onSubmit}
            className="px-4 py-2 bg-[rgba(207,8,140,1)] hover:bg-[rgba(207,8,140,0.8)] rounded-lg"
          >
            Change Password
          </button>
        </div>
      </div>
    </Modal>
  );

  const RecoveryEmailModal = ({ isOpen, onClose, form, setForm, onSubmit }) => (
    <Modal isOpen={isOpen} onClose={onClose} title="Change Recovery Email">
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            New Recovery Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2"
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
            onClick={onSubmit}
            className="px-4 py-2 bg-[rgba(207,8,140,1)] hover:bg-[rgba(207,8,140,0.8)] rounded-lg"
          >
            Update Email
          </button>
        </div>
      </div>
    </Modal>
  );

  const PaymentMethodModal = ({ isOpen, onClose, form, setForm, onSubmit }) => (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Payment Method">
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Card Number
          </label>
          <input
            type="text"
            value={form.cardNumber}
            onChange={(e) => setForm({ ...form, cardNumber: e.target.value })}
            placeholder="1234 5678 9012 3456"
            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Expiry Date
            </label>
            <input
              type="text"
              value={form.expiryDate}
              onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
              placeholder="MM/YY"
              className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">CVV</label>
            <input
              type="text"
              value={form.cvv}
              onChange={(e) => setForm({ ...form, cvv: e.target.value })}
              placeholder="123"
              className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Cardholder Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="John Doe"
            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2"
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
            onClick={onSubmit}
            className="px-4 py-2 bg-[rgba(207,8,140,1)] hover:bg-[rgba(207,8,140,0.8)] rounded-lg"
          >
            Add Payment Method
          </button>
        </div>
      </div>
    </Modal>
  );

  const UpgradePlanModal = ({ isOpen, onClose }) => (
    <Modal isOpen={isOpen} onClose={onClose} title="Upgrade Plan">
      <div className="space-y-6">
        <div className="p-4 bg-black/30 rounded-lg border border-[rgba(207,8,140,1)] relative">
          <div className="absolute -top-3 right-4 bg-[rgba(207,8,140,1)] px-2 py-1 rounded text-xs">
            RECOMMENDED
          </div>
          <h4 className="font-medium mb-2">Enterprise Plan</h4>
          <p className="text-2xl font-bold mb-2">
            $299
            <span className="text-sm font-normal text-gray-400">/month</span>
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <Check size={16} className="text-green-400" />
              Unlimited projects
            </li>
            <li className="flex items-center gap-2">
              <Check size={16} className="text-green-400" />
              Priority support
            </li>
            <li className="flex items-center gap-2">
              <Check size={16} className="text-green-400" />
              Custom integrations
            </li>
          </ul>
          <button
            onClick={onClose}
            className="w-full mt-4 px-4 py-2 bg-[rgba(207,8,140,1)] hover:bg-[rgba(207,8,140,0.8)] rounded-lg"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </Modal>
  );
  // Tab Components
  const ProfileTab = ({ userData, isEditing, setUserData }) => {
    const [editedData, setEditedData] = useState(userData);
    const [newSkill, setNewSkill] = useState("");
    const [newLanguage, setNewLanguage] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDeactivateModal, setShowDeactivateModal] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState("");
    const [showNotificationSettings, setShowNotificationSettings] =
      useState(false);

    const handleInputChange = (field, value) => {
      setEditedData({ ...editedData, [field]: value });
    };

    const handleAddSkill = (e) => {
      e.preventDefault();
      if (newSkill.trim() && !editedData.skills.includes(newSkill.trim())) {
        setEditedData({
          ...editedData,
          skills: [...editedData.skills, newSkill.trim()],
        });
        setNewSkill("");
      }
    };

    const handleRemoveSkill = (skillToRemove) => {
      setEditedData({
        ...editedData,
        skills: editedData.skills.filter((skill) => skill !== skillToRemove),
      });
    };

    const handleAddLanguage = (e) => {
      e.preventDefault();
      if (
        newLanguage.trim() &&
        !editedData.languages.includes(newLanguage.trim())
      ) {
        setEditedData({
          ...editedData,
          languages: [...editedData.languages, newLanguage.trim()],
        });
        setNewLanguage("");
      }
    };

    const handleRemoveLanguage = (languageToRemove) => {
      setEditedData({
        ...editedData,
        languages: editedData.languages.filter(
          (lang) => lang !== languageToRemove
        ),
      });
    };

    // Delete Account Modal
    const DeleteAccountModal = ({ isOpen, onClose }) => (
      <Modal isOpen={isOpen} onClose={onClose} title="Delete Account">
        <div className="space-y-4">
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-red-500 mt-1" size={20} />
              <div>
                <h4 className="text-red-500 font-medium mb-1">Warning</h4>
                <p className="text-sm text-gray-400">
                  This action cannot be undone. All your data will be
                  permanently deleted.
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
              disabled={deleteConfirmation !== "DELETE"}
              onClick={() => {
                // Handle account deletion
                onClose();
              }}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete Account
            </button>
          </div>
        </div>
      </Modal>
    );

    // Deactivate Account Modal
    const DeactivateAccountModal = ({ isOpen, onClose }) => (
      <Modal isOpen={isOpen} onClose={onClose} title="Deactivate Account">
        <div className="space-y-4">
          <p className="text-gray-400">
            Your account will be temporarily deactivated. You can reactivate it
            at any time by logging back in.
          </p>
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-black/30 hover:bg-black/40 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // Handle account deactivation
                onClose();
              }}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg"
            >
              Deactivate Account
            </button>
          </div>
        </div>
      </Modal>
    );

    // Notification Settings Modal
    const NotificationSettingsModal = ({ isOpen, onClose }) => (
      <Modal isOpen={isOpen} onClose={onClose} title="Notification Settings">
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-4">Email Notifications</h4>
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <span className="text-gray-400">Security alerts</span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="form-checkbox"
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-gray-400">Newsletter</span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="form-checkbox"
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-gray-400">Product updates</span>
                <input type="checkbox" className="form-checkbox" />
              </label>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-4">Push Notifications</h4>
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <span className="text-gray-400">New messages</span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="form-checkbox"
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-gray-400">Account activity</span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="form-checkbox"
                />
              </label>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[rgba(207,8,140,1)] hover:bg-[rgba(207,8,140,0.8)] rounded-lg"
            >
              Save Settings
            </button>
          </div>
        </div>
      </Modal>
    );

    useEffect(() => {
      if (!isEditing) {
        setUserData(editedData);
      }
    }, [isEditing]);

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
                value={isEditing ? editedData.name : userData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                disabled={!isEditing}
                className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                type="email"
                value={userData.email}
                disabled
                className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Phone</label>
              <input
                type="tel"
                value={isEditing ? editedData.phone : userData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                disabled={!isEditing}
                className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Location
              </label>
              <input
                type="text"
                value={isEditing ? editedData.location : userData.location}
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
            value={isEditing ? editedData.bio : userData.bio}
            onChange={(e) => handleInputChange("bio", e.target.value)}
            disabled={!isEditing}
            rows={4}
            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 disabled:opacity-50"
          />
        </section>

        {/* Skills & Languages Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium">Skills & Languages</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Skills</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {editedData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[rgba(207,8,140,0.2)] text-[rgba(207,8,140,1)] rounded-full text-sm flex items-center gap-2"
                  >
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="hover:text-white"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </span>
                ))}
              </div>
              {isEditing && (
                <form onSubmit={handleAddSkill} className="flex gap-2">
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

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Languages
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {editedData.languages.map((language, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-black/30 border border-white/10 rounded-full text-sm flex items-center gap-2"
                  >
                    {language}
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveLanguage(language)}
                        className="hover:text-white"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </span>
                ))}
              </div>
              {isEditing && (
                <form onSubmit={handleAddLanguage} className="flex gap-2">
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
          </div>
        </section>

        {/* Account Management Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium">Account Management</h3>
          <div className="space-y-4">
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

        {/* Social Links Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium">Social Links</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">GitHub</label>
              <div className="flex gap-2">
                <span className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-gray-400">
                  github.com/
                </span>
                <input
                  type="text"
                  value={
                    isEditing
                      ? editedData.socialLinks.github.replace("github.com/", "")
                      : userData.socialLinks.github.replace("github.com/", "")
                  }
                  onChange={(e) =>
                    handleInputChange("socialLinks", {
                      ...editedData.socialLinks,
                      github: `github.com/${e.target.value}`,
                    })
                  }
                  disabled={!isEditing}
                  className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 disabled:opacity-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                LinkedIn
              </label>
              <div className="flex gap-2">
                <span className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-gray-400">
                  linkedin.com/in/
                </span>
                <input
                  type="text"
                  value={
                    isEditing
                      ? editedData.socialLinks.linkedin.replace(
                          "linkedin.com/in/",
                          ""
                        )
                      : userData.socialLinks.linkedin.replace(
                          "linkedin.com/in/",
                          ""
                        )
                  }
                  onChange={(e) =>
                    handleInputChange("socialLinks", {
                      ...editedData.socialLinks,
                      linkedin: `linkedin.com/in/${e.target.value}`,
                    })
                  }
                  disabled={!isEditing}
                  className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 disabled:opacity-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Twitter
              </label>
              <div className="flex gap-2">
                <span className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-gray-400">
                  @
                </span>
                <input
                  type="text"
                  value={
                    isEditing
                      ? editedData.socialLinks.twitter.replace("@", "")
                      : userData.socialLinks.twitter.replace("@", "")
                  }
                  onChange={(e) =>
                    handleInputChange("socialLinks", {
                      ...editedData.socialLinks,
                      twitter: `@${e.target.value}`,
                    })
                  }
                  disabled={!isEditing}
                  className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 disabled:opacity-50"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Data Export Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium">Data & Privacy</h3>
          <div className="bg-black/30 border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium mb-1">Export Your Data</h4>
                <p className="text-sm text-gray-400">
                  Download a copy of your data including profile, posts, and
                  activities
                </p>
              </div>
              <button className="px-4 py-2 bg-[rgba(207,8,140,1)] hover:bg-[rgba(207,8,140,0.8)] rounded-lg">
                Export Data
              </button>
            </div>
          </div>
        </section>

        {/* Modals */}
        <DeleteAccountModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
        />
        <DeactivateAccountModal
          isOpen={showDeactivateModal}
          onClose={() => setShowDeactivateModal(false)}
        />
        <NotificationSettingsModal
          isOpen={showNotificationSettings}
          onClose={() => setShowNotificationSettings(false)}
        />
      </div>
    );
  };

  const SecurityTab = ({ userData }) => {
    return (
      <div className="space-y-8">
        {/* Password Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium">Password</h3>
          <div className="bg-black/30 border border-white/10 rounded-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h4 className="font-medium mb-1">Password</h4>
                <p className="text-sm text-gray-400">
                  Last changed{" "}
                  {userData.security?.lastPasswordChange || "Never"}
                </p>
              </div>
              <button className="px-4 py-2 bg-[rgba(207,8,140,1)] hover:bg-[rgba(207,8,140,0.8)] rounded-lg">
                Change Password
              </button>
            </div>
          </div>
        </section>

        {/* Two-Factor Authentication */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
          <div className="bg-black/30 border border-white/10 rounded-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h4 className="font-medium mb-1">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-400">
                  {userData.security?.twoFactorEnabled
                    ? "Enabled - Using Authenticator App"
                    : "Not enabled"}
                </p>
              </div>
              <button className="px-4 py-2 border border-white/10 hover:bg-white/5 rounded-lg">
                {userData.security?.twoFactorEnabled ? "Disable" : "Enable"}
              </button>
            </div>
          </div>
        </section>

        {/* Login History */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium">Login History</h3>
          <div className="space-y-4">
            {userData.security?.loginHistory?.map((login, index) => (
              <div
                key={index}
                className="bg-black/30 border border-white/10 rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium mb-1">{login.device}</h4>
                    <p className="text-sm text-gray-400">
                      {login.date} • {login.location}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      login.status === "Success"
                        ? "bg-green-400/20 text-green-400"
                        : "bg-red-400/20 text-red-400"
                    }`}
                  >
                    {login.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Active Sessions */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Active Sessions</h3>
            <button className="text-[rgba(207,8,140,1)] hover:text-[rgba(207,8,140,0.8)]">
              Sign out all devices
            </button>
          </div>
          <div className="space-y-4">
            <div className="bg-black/30 border border-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium mb-1">Current Session</h4>
                  <p className="text-sm text-gray-400">
                    Chrome on Windows • San Francisco, CA
                  </p>
                </div>
                <span className="px-2 py-1 bg-green-400/20 text-green-400 rounded-full text-xs">
                  Active
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  const BillingTab = ({
    userData,
    showPaymentMethodModal,
    setShowPaymentMethodModal,
    showUpgradePlanModal,
    setShowUpgradePlanModal,
  }) => (
    <div className="space-y-8">
      {/* Current Plan Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Current Plan</h3>
        <div className="bg-black/30 border border-white/10 rounded-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h4 className="font-medium mb-1">Professional Plan</h4>
              <p className="text-sm text-gray-400">
                $99/month • Renews on {userData.billing?.nextBillingDate}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowUpgradePlanModal(true)}
                className="px-4 py-2 bg-[rgba(207,8,140,1)] hover:bg-[rgba(207,8,140,0.8)] rounded-lg"
              >
                Upgrade Plan
              </button>
              <button className="px-4 py-2 border border-white/10 hover:bg-white/5 rounded-lg">
                Cancel Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Payment Methods</h3>
          <button
            onClick={() => setShowPaymentMethodModal(true)}
            className="px-4 py-2 border border-[rgba(207,8,140,1)] text-[rgba(207,8,140,1)] hover:bg-[rgba(207,8,140,1)] hover:text-white rounded-lg transition-colors"
          >
            Add Payment Method
          </button>
        </div>
        <div className="space-y-4">
          {userData.billing?.paymentMethods.map((method, index) => (
            <div
              key={index}
              className="bg-black/30 border border-white/10 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
                    <CreditCard className="text-gray-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">
                      •••• •••• •••• {method.lastFour}
                    </h4>
                    <p className="text-sm text-gray-400">
                      Expires {method.expiryDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {method.isDefault && (
                    <span className="text-sm text-gray-400">Default</span>
                  )}
                  <button
                    onClick={() => setShowPaymentMethodModal(true)}
                    className="text-[rgba(207,8,140,1)] hover:text-[rgba(207,8,140,0.8)]"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Billing History Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Billing History</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="text-left border-b border-white/10">
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Description</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {userData.billing?.history.map((item, index) => (
                <tr key={index} className="border-b border-white/10">
                  <td className="py-4">{item.date}</td>
                  <td className="py-4">{item.description}</td>
                  <td className="py-4">${item.amount}</td>
                  <td className="py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        item.status === "Paid"
                          ? "bg-green-400/20 text-green-400"
                          : "bg-yellow-400/20 text-yellow-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="text-[rgba(207,8,140,1)] hover:text-[rgba(207,8,140,0.8)]">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );

  // Main Component Return
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-black/30 border border-white/10 overflow-hidden">
              {userData.avatar ? (
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User size={32} className="text-gray-400" />
                </div>
              )}
            </div>
            {isEditing && (
              <label className="absolute bottom-0 right-0 p-2 bg-[rgba(207,8,140,1)] rounded-full hover:bg-[rgba(207,8,140,0.8)] cursor-pointer">
                <Camera size={16} />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </label>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-bold">{userData.name}</h1>
            <p className="text-gray-400">{userData.role}</p>
          </div>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 px-4 py-2 w-fit bg-[rgba(207,8,140,1)] hover:bg-[rgba(207,8,140,0.8)] rounded-lg"
        >
          {isEditing ? (
            <>
              <Check size={20} />
              Save Changes
            </>
          ) : (
            <>
              <Edit2 size={20} />
              Edit Profile
            </>
          )}
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-white/10 mb-8">
        <nav className="flex gap-4">
          {["Profile", "Security", "Billing"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`pb-4 px-2 relative ${
                activeTab === tab.toLowerCase()
                  ? "text-[rgba(207,8,140,1)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
              {activeTab === tab.toLowerCase() && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[rgba(207,8,140,1)]" />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "profile" && (
          <ProfileTab
            userData={userData}
            isEditing={isEditing}
            setUserData={setUserData}
          />
        )}
        {activeTab === "security" && (
          <SecurityTab
            userData={userData}
            showPasswordModal={showPasswordModal}
            setShowPasswordModal={setShowPasswordModal}
          />
        )}
        {activeTab === "billing" && (
          <BillingTab
            userData={userData}
            showPaymentMethodModal={showPaymentMethodModal}
            setShowPaymentMethodModal={setShowPaymentMethodModal}
            showUpgradePlanModal={showUpgradePlanModal}
            setShowUpgradePlanModal={setShowUpgradePlanModal}
          />
        )}
      </div>

      {/* Modals */}
      <PasswordChangeModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        form={passwordForm}
        setForm={setPasswordForm}
        onSubmit={() => {
          // Handle password change
          setShowPasswordModal(false);
        }}
      />
      <RecoveryEmailModal
        isOpen={showRecoveryEmailModal}
        onClose={() => setShowRecoveryEmailModal(false)}
        form={recoveryEmailForm}
        setForm={setRecoveryEmailForm}
        onSubmit={() => {
          // Handle recovery email change
          setShowRecoveryEmailModal(false);
        }}
      />
      <PaymentMethodModal
        isOpen={showPaymentMethodModal}
        onClose={() => setShowPaymentMethodModal(false)}
        form={paymentMethodForm}
        setForm={setPaymentMethodForm}
        onSubmit={() => {
          // Handle payment method addition/edit
          setShowPaymentMethodModal(false);
        }}
      />
      <UpgradePlanModal
        isOpen={showUpgradePlanModal}
        onClose={() => setShowUpgradePlanModal(false)}
      />
    </div>
  );
};

export default ProfileContent;
