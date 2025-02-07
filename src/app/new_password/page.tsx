"use client";

import React, { useState, useEffect, Suspense } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  CheckCircle2,
  XCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import ParticlesComponent from "../../components/Particles/ParticlesBackground";
import { useRouter, useSearchParams } from "next/navigation";

const PasswordStrengthIndicator = ({ password }) => {
  const [strength, setStrength] = useState({
    score: 0,
    requirements: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false,
    },
  });

  useEffect(() => {
    const checkStrength = (pass) => {
      const requirements = {
        length: pass.length >= 8,
        uppercase: /[A-Z]/.test(pass),
        lowercase: /[a-z]/.test(pass),
        number: /[0-9]/.test(pass),
        special: /[^A-Za-z0-9]/.test(pass),
      };

      const score = Object.values(requirements).filter(Boolean).length;

      return {
        score,
        requirements,
      };
    };

    setStrength(checkStrength(password));
  }, [password]);

  const getStrengthText = () => {
    if (strength.score === 0) return "";
    if (strength.score <= 2) return "Weak";
    if (strength.score <= 4) return "Medium";
    return "Strong";
  };

  const getStrengthColor = () => {
    if (strength.score <= 2) return "bg-red-500";
    if (strength.score <= 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  const Requirement = ({ met, text }) => (
    <div className="flex items-center gap-2 text-[10px]">
      {met ? (
        <CheckCircle2 className="w-4 h-4 text-green-500" />
      ) : (
        <XCircle className="w-4 h-4  text-gray-400" />
      )}
      <span
        className={
          met ? "text-green-500 text-[11px]" : "text-gray-400 text-[11px] "
        }
      >
        {text}
      </span>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex gap-2 h-1">
          {[1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className={`h-full flex-1 rounded-full transition-colors ${
                index <= strength.score ? getStrengthColor() : "bg-white/10"
              }`}
            />
          ))}
        </div>
        <div className="text-sm text-right">
          {getStrengthText() && (
            <span
              className={`font-medium ${
                strength.score <= 2
                  ? "text-red-500"
                  : strength.score <= 4
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              {getStrengthText()}
            </span>
          )}
        </div>
      </div>

      <div className="grid text-[10px] grid-cols-1 md:grid-cols-2 gap-2">
        <Requirement
          met={strength.requirements.length}
          text="At least 8 characters"
        />
        <Requirement
          met={strength.requirements.uppercase}
          text="One uppercase letter"
        />
        <Requirement
          met={strength.requirements.lowercase}
          text="One lowercase letter"
        />
        <Requirement met={strength.requirements.number} text="One number" />
        <Requirement
          met={strength.requirements.special}
          text="One special character"
        />
      </div>
    </div>
  );
};

const Logo = ({ onclick }) => (
  <div
    className="fixed top-7 left-7 flex cursor-pointer items-center z-10"
    onClick={onclick}
  >
    <div className="relative flex items-center">
      <div className="relative w-8 h-8 mr-3">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(207,8,140,1)] to-purple-600 rounded-lg opacity-80"></div>
        <div className="absolute inset-[2px] bg-black/40 backdrop-blur-sm rounded-lg"></div>
        <svg
          viewBox="0 0 24 24"
          className="absolute inset-0 w-full h-full p-2"
          style={{ filter: "drop-shadow(0 0 4px rgba(207,8,140,0.5))" }}
        >
          <path
            d="M13 3L4 14h7l-2 7 9-11h-7l2-7z"
            fill="none"
            stroke="url(#lightning-gradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient
              id="lightning-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(207,8,140,1)" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 bg-[rgba(207,8,140,0.2)] rounded-lg blur-md"></div>
      </div>

      <div className="flex flex-col">
        <div className="relative">
          <span
            className="text-xl font-bold tracking-wide bg-gradient-to-r from-[rgba(207,8,140,1)] via-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{
              fontFamily: '"Exo 2", sans-serif',
              letterSpacing: "0.02em",
              filter: "drop-shadow(0 0 8px rgba(207,8,140,0.3))",
            }}
          >
            NEON
          </span>
          <span
            className="text-xl font-bold tracking-wide bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
            style={{
              fontFamily: '"Exo 2", sans-serif',
              letterSpacing: "0.02em",
              filter: "drop-shadow(0 0 8px rgba(147,51,234,0.3))",
            }}
          >
            CLOUD
          </span>
          <div
            className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-[rgba(207,8,140,0.5)] via-purple-500/50 to-blue-500/50"
            style={{
              filter: "blur(0.5px)",
            }}
          ></div>
        </div>
      </div>
    </div>
  </div>
);

const Content = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm: false,
  });
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      router.push("/forgot-password");
    }
  }, [token, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
    setWarning("");
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validatePassword = () => {
    setWarning("");
    setError("");

    if (!formData.password) {
      setError("Password is required");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    const strengthChecks = {
      length: formData.password.length >= 8,
      uppercase: /[A-Z]/.test(formData.password),
      lowercase: /[a-z]/.test(formData.password),
      number: /[0-9]/.test(formData.password),
      special: /[^A-Za-z0-9]/.test(formData.password),
    };

    const strengthScore = Object.values(strengthChecks).filter(Boolean).length;

    if (strengthScore <= 2) {
      setWarning(
        "Warning: Your password is weak and may not be secure. Consider using a stronger password."
      );
    } else if (strengthScore <= 4) {
      setWarning(
        "Tip: You can make your password stronger by adding more character types."
      );
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:4000/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            newPassword: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.message);
      }

      setIsSuccess(true);

      // Show success message for 2 seconds before redirecting
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to update password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return null; // Or a loading state if you prefer
  }

  return (
    <>
      <Logo onclick={() => router.push("/")} />
      <div className="min-h-screen relative z-10  text-white flex items-center justify-center p-6">
        <div className="w-full relative z-10 max-w-md">
          <Link
            href="/signin"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </Link>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-[rgba(207,8,140,0.1)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-[rgba(207,8,140,1)]" />
              </div>
              <h1 className="text-2xl font-bold">Create New Password</h1>
              <p className="text-gray-400">
                Your new password must be different from previous passwords
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">New Password</label>
                <div className="relative">
                  <input
                    type={showPassword.password ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-[rgba(207,8,140,1)] transition-colors"
                    placeholder="Enter your new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("password")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword.password ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <PasswordStrengthIndicator password={formData.password} />

              <div className="space-y-2">
                <label className="text-sm text-gray-400">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.confirm ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-[rgba(207,8,140,1)] transition-colors"
                    placeholder="Confirm your new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword.confirm ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {warning && (
                <div className="text-yellow-500 text-sm text-center bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                  {warning}
                </div>
              )}

              {error && (
                <div className="text-red-500 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || isSuccess}
                className="w-full py-3 px-4 bg-[rgba(207,8,140,1)] text-white rounded-lg hover:bg-[rgba(207,8,140,0.8)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Updating Password...</span>
                  </div>
                ) : isSuccess ? (
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 size={20} />
                    <span>Password Updated!</span>
                  </div>
                ) : (
                  "Update Password"
                )}
              </button>
            </form>
          </div>

          <div className="mt-8 text-center text-sm text-gray-400">
            <p>
              Need help?{" "}
              <Link
                href="/support"
                className="text-[rgba(207,8,140,1)] hover:text-[rgba(207,8,140,0.8)] transition-colors"
              >
                Contact Support
              </Link>
            </p>
          </div>
        </div>

        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_30%_50%,rgba(147,51,234,0.1),transparent_70%)]" />
      </div>
      <ParticlesComponent />
    </>
  );
};

function Page() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  );
}

export default Page;
