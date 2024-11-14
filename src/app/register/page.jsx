"use client"
import React, { useState, useEffect } from "react";
import {
  Mail,
  Lock,
  User,
  Calendar,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Shield,
  Rocket,
  Globe,
  Zap,
} from "lucide-react";

// Add keyframes for animations
const styleTag = document.createElement("style");
styleTag.textContent = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  .animate-blob {
    animation: blob 7s infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
`;
document.head.appendChild(styleTag);

function Page() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    confirmPassword: "",
    interests: [],
    avatar: null,
  });

  const [animation, setAnimation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setAnimation("animate-fade-in");
    const timer = setTimeout(() => setAnimation(""), 500);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const interests = [
    { icon: <Globe className="w-4 h-4" />, label: "AI & Machine Learning" },
    { icon: <Shield className="w-4 h-4" />, label: "Blockchain" },
    { icon: <Zap className="w-4 h-4" />, label: "IoT" },
    { icon: <Rocket className="w-4 h-4" />, label: "Cloud Computing" },
    { icon: <Lock className="w-4 h-4" />, label: "Cybersecurity" },
  ];

  const strengthIndicator = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getStrengthWidth = () => {
    const strength = strengthIndicator(formState.password);
    return `${(strength / 4) * 100}%`;
  };

  const getStrengthColor = () => {
    const strength = strengthIndicator(formState.password);
    if (strength <= 1) return "bg-red-500";
    if (strength <= 2) return "bg-yellow-500";
    if (strength <= 3) return "bg-blue-500";
    return "bg-green-500";
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formState.fullName) newErrors.fullName = "Name is required";
        if (!formState.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formState.email))
          newErrors.email = "Email is invalid";
        if (!formState.phone) newErrors.phone = "Phone is required";
        if (!formState.dob) newErrors.dob = "Date of birth is required";
        break;
      case 2:
        if (!formState.password) newErrors.password = "Password is required";
        else if (formState.password.length < 8)
          newErrors.password = "Password must be at least 8 characters";
        if (formState.password !== formState.confirmPassword)
          newErrors.confirmPassword = "Passwords don't match";
        break;
      case 3:
        if (formState.interests.length === 0)
          newErrors.interests = "Please select at least one interest";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);

    // Show success message or redirect
    alert("Registration successful!");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className={`space-y-6 ${animation}`}>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <User className="w-8 h-8 mr-2 text-purple-400" />
              Personal Information
            </h3>

            {/* Avatar Upload */}
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1">
                  <div className="w-full h-full rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                    {formState.avatar ? (
                      <img
                        src={URL.createObjectURL(formState.avatar)}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 text-gray-400" />
                    )}
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) =>
                    setFormState({ ...formState, avatar: e.target.files[0] })
                  }
                />
                <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-sm">Change Photo</span>
                </div>
              </div>
            </div>

            {/* Form Inputs */}
            <div className="space-y-4">
              {/* Full Name Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-purple-400" />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className={`w-full pl-10 pr-4 py-3 bg-black/30 border ${
                    errors.fullName ? "border-red-500" : "border-purple-500"
                  } rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300`}
                  value={formState.fullName}
                  onChange={(e) =>
                    setFormState({ ...formState, fullName: e.target.value })
                  }
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-purple-400" />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className={`w-full pl-10 pr-4 py-3 bg-black/30 border ${
                    errors.email ? "border-red-500" : "border-purple-500"
                  } rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300`}
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-purple-400" />
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className={`w-full pl-10 pr-4 py-3 bg-black/30 border ${
                    errors.phone ? "border-red-500" : "border-purple-500"
                  } rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300`}
                  value={formState.phone}
                  onChange={(e) =>
                    setFormState({ ...formState, phone: e.target.value })
                  }
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Date of Birth Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-purple-400" />
                </div>
                <input
                  type="date"
                  className={`w-full pl-10 pr-4 py-3 bg-black/30 border ${
                    errors.dob ? "border-red-500" : "border-purple-500"
                  } rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300`}
                  value={formState.dob}
                  onChange={(e) =>
                    setFormState({ ...formState, dob: e.target.value })
                  }
                />
                {errors.dob && (
                  <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className={`space-y-6 ${animation}`}>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Shield className="w-8 h-8 mr-2 text-purple-400" />
              Security
            </h3>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-purple-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`w-full pl-10 pr-12 py-3 bg-black/30 border ${
                  errors.password ? "border-red-500" : "border-purple-500"
                } rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300`}
                value={formState.password}
                onChange={(e) =>
                  setFormState({ ...formState, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Password Strength Indicator */}
            {formState.password && (
              <div className="space-y-2">
                <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getStrengthColor()} transition-all duration-300`}
                    style={{ width: getStrengthWidth() }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Weak</span>
                  <span>Medium</span>
                  <span>Strong</span>
                </div>
              </div>
            )}

            {/* Confirm Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Shield className="h-5 w-5 text-purple-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className={`w-full pl-10 pr-4 py-3 bg-black/30 border ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-purple-500"
                } rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300`}
                value={formState.confirmPassword}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    confirmPassword: e.target.value,
                  })
                }
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className={`space-y-6 ${animation}`}>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Sparkles className="w-8 h-8 mr-2 text-purple-400" />
              Your Interests
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {interests.map((interest, index) => (
                <div
                  key={index}
                  onClick={() => {
                    const newInterests = formState.interests.includes(
                      interest.label
                    )
                      ? formState.interests.filter((i) => i !== interest.label)
                      : [...formState.interests, interest.label];
                    setFormState({ ...formState, interests: newInterests });
                  }}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 flex items-center space-x-3
                      ${
                        formState.interests.includes(interest.label)
                          ? "border-purple-500 bg-purple-500/20"
                          : "border-gray-700 bg-black/30 hover:border-purple-500/50"
                      }`}
                >
                  <div className="flex-shrink-0">{interest.icon}</div>
                  <span className="text-white">{interest.label}</span>
                </div>
              ))}
            </div>
            {errors.interests && (
              <p className="text-red-500 text-sm mt-1">{errors.interests}</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6 flex flex-col items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-2xl relative">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-gray-700 rounded-full">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2">
            <span
              className={`text-sm ${
                currentStep >= 1 ? "text-purple-400" : "text-gray-500"
              }`}
            >
              Personal
            </span>
            <span
              className={`text-sm ${
                currentStep >= 2 ? "text-purple-400" : "text-gray-500"
              }`}
            >
              Security
            </span>
            <span
              className={`text-sm ${
                currentStep >= 3 ? "text-purple-400" : "text-gray-500"
              }`}
            >
              Interests
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-6 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300"
                >
                  Previous
                </button>
              )}
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="ml-auto px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity duration-300 flex items-center"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="ml-auto px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity duration-300 flex items-center"
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin mr-2">⚬</span>
                      Processing...
                    </>
                  ) : (
                    <>
                      Complete Registration
                      <CheckCircle2 className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
