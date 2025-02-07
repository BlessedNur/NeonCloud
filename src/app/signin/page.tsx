"use client";
import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Github,
  Chrome,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import ParticlesComponent from "../../components/Particles/ParticlesBackground";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCloudContext } from "../../context/Context";
import PublicRoute from "../../components/auth/PublicRoutes";

const SocialButton = ({ icon: Icon, label, onClick, variant }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "github":
        return "border-gray-600 hover:bg-gray-800";
      case "google":
        return "border-blue-500 hover:bg-blue-500/10";
      default:
        return "border-gray-600 hover:bg-gray-800";
    }
  };

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg border ${getVariantStyles()} transition-all duration-200`}
    >
      <Icon size={20} />
      <span>Continue with {label}</span>
    </button>
  );
};

type InputFieldProps = {
  name: string;
  icon: LucideIcon;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  showPassword?: boolean;
};

const InputField = ({
  name,
  icon: Icon,
  type,
  placeholder,
  value,
  onChange,
  error,
  showPasswordToggle,
  onTogglePassword,
  showPassword,
}: InputFieldProps) => (
  <div className="space-y-2">
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        <Icon size={20} />
      </div>
      <input
        name={name}
        type={showPasswordToggle ? (showPassword ? "text" : "password") : type}
        className={`w-full bg-white/5 border ${
          error ? "border-red-500" : "border-white/10"
        } rounded-lg py-3 px-12 focus:outline-none focus:border-[rgba(207,8,140,1)] transition-colors placeholder-gray-500`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {showPasswordToggle && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

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

type FormData = {
  email: string;
  password: string;
};
type FormErrors = {
  email?: string;
  password?: string;
};

function Page() {
  const router = useRouter();
  const { login } = useCloudContext(); // Use your context hook

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        "https://neoncloud-backend.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Properly structure the AuthResponse data
      login({
        success: true,
        message: "Login successful",
        user: {
          email: data.user.email,
          role: data.user.role,
          plan: data.user.plan,
        },
        token: data.token, // Make sure the token is included
        email: data.user.email,
        data: {
          plan: data.user.plan || "",
          emailVerified: data.user.emailVerified || false,
        },
      });

      toast.success("Login successful!");
      router.push("/");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.error("Google login is not implemented yet");
  };

  return (
    <PublicRoute>
      <Logo onclick={() => router.push("/")} />
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="w-full relative z-10 max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[rgba(207,8,140,1)] via-purple-500 to-blue-500 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-400">
              Sign in to continue to your dashboard
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {/* <SocialButton
              icon={Github}
              label="GitHub"
              variant="github"
              onClick={() => console.log("GitHub login")}
            /> */}
            <SocialButton
              icon={Chrome}
              label="Google"
              variant="google"
              onClick={handleGoogleLogin}
            />
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-black text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              name="email"
              icon={Mail}
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
            />

            <InputField
              name="password"
              icon={Lock}
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              showPasswordToggle
              onTogglePassword={() => setShowPassword(!showPassword)}
              showPassword={showPassword}
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-white/10 bg-white/5 text-[rgba(207,8,140,1)] focus:ring-[rgba(207,8,140,1)] focus:ring-offset-0"
                />
                <span>Remember me</span>
              </label>
              <Link
                href="/forgot_password"
                className="text-[rgba(207,8,140,1)] hover:text-[rgba(207,8,140,0.8)] transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-[rgba(207,8,140,1)] text-white rounded-lg hover:bg-[rgba(207,8,140,0.8)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400">Not a member yet?</p>
            <Link
              href="/#pricing"
              className="text-[rgba(207,8,140,1)] hover:text-[rgba(207,8,140,0.8)] transition-colors text-lg font-medium"
            >
              Choose a hosting plan and get started now!
            </Link>
          </div>

          <div className="mt-8 text-center text-sm text-gray-400">
            <p>Protected by reCAPTCHA and subject to our</p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <span>and</span>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_30%_50%,rgba(147,51,234,0.1),transparent_70%)]" />
      </div>
      <ParticlesComponent />
    </PublicRoute>
  );
}

export default Page;
