"use client";
import React, { useState, useEffect, use, Suspense } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Github,
  Chrome,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import ParticlesComponent from "../../components/Particles/ParticlesBackground";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import NotFound from "../../components/notfound/NotFound";
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

// FIX LOGO MOBILE VIEW
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
type Params = {
  id: string;
};
type FormDataProps = {
  email: string;
  password: string;
  confirmPassword: string;
};
type Erros = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
};

const Content = () => {
  const searchParams = useSearchParams();
  const { choosenPlan } = useCloudContext();
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    const token = searchParams.get("token");
    const planId = searchParams.get("planId");

    if (token && choosenPlan?.registrationToken === token) {
      setIsValidToken(true);
    }
  }, [searchParams, choosenPlan]);

  const router = useRouter();
  const [formData, setFormData] = useState<FormDataProps>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Erros>({});
  const [terms, setTerms] = useState({
    accepted: false,
    error: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Erros = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!terms.accepted) {
      newErrors.terms = "You must accept the Terms of Service";
      setTerms((prev) => ({ ...prev, error: true }));
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    console.log(formData, choosenPlan.title);
    try {
      const res = await fetch(
        "https://neoncloud-backend.onrender.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            plan: choosenPlan.title,
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setIsLoading(false);
      } else {
        setIsLoading(false);

        toast.error(data.message);
      }

      // router.push("/signin");
    } catch (error) {
      toast.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };
  if (!isValidToken) {
    return <NotFound />;
  }

  return (
    <PublicRoute>
      <Logo onclick={() => router.push("/")} />
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="w-full relative z-10 max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[rgba(207,8,140,1)] via-purple-500 to-blue-500 bg-clip-text text-transparent mb-2">
              Create Your Account
            </h1>
            <p className="text-gray-400">Sign up to start your cloud journey</p>
          </div>

          <div className="space-y-3 mb-8">
            {/* <SocialButton
              icon={Github}
              label="GitHub"
              variant="github"
              onClick={() => console.log("GitHub signup")}
            /> */}
            <SocialButton
              icon={Chrome}
              label="Google"
              variant="google"
              onClick={() => console.log("Google signup")}
            />
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-black text-gray-400">
                Or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              icon={Mail}
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) =>
                handleInputChange({
                  target: { name: "email", value: e.target.value },
                })
              }
              error={errors.email}
            />

            <InputField
              icon={Lock}
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                handleInputChange({
                  target: { name: "password", value: e.target.value },
                })
              }
              error={errors.password}
              showPasswordToggle
              onTogglePassword={() => setShowPassword(!showPassword)}
              showPassword={showPassword}
            />

            <InputField
              icon={Lock}
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange({
                  target: { name: "confirmPassword", value: e.target.value },
                })
              }
              error={errors.confirmPassword}
              showPasswordToggle
              onTogglePassword={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              showPassword={showConfirmPassword}
            />

            <div className="flex items-start gap-2 flex-col justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={terms.accepted}
                  onChange={(e) => {
                    setTerms({
                      accepted: e.target.checked,
                      error: false,
                    });
                    // Clear error when user checks the box
                    if (e.target.checked && errors.terms) {
                      setErrors((prev) => ({ ...prev, terms: undefined }));
                    }
                  }}
                  className={`w-4 h-4 rounded border-white/10 bg-white/5 text-[rgba(207,8,140,1)] 
        focus:ring-[rgba(207,8,140,1)] focus:ring-offset-0
        ${terms.error ? "border-red-500" : "border-white/10"}`}
                />
                <span>I agree to the Terms of Service</span>
              </label>
              {terms.error && (
                <p className="text-red-500 text-sm">
                  {errors.terms || "You must accept the Terms of Service"}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-[rgba(207,8,140,1)] text-white rounded-lg hover:bg-[rgba(207,8,140,0.8)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400">Already have an account?</p>
            <Link
              href="/signin"
              className="text-[rgba(207,8,140,1)] hover:text-[rgba(207,8,140,0.8)] transition-colors text-lg font-medium"
            >
              Sign in to your account
            </Link>
          </div>

          <div className="mt-8 text-center text-sm text-gray-400">
            <p>By signing up, you agree to our</p>
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
};

function Page() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  );
}
export default Page;
