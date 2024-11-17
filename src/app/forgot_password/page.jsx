"use client";
import React, { useState } from "react";
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import ParticlesComponent from "../../components/Particles/ParticlesBackground";
import { useRouter } from "next/navigation";

const StatusMessage = ({ type, message }) => {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
  };
  const Icon = icons[type];
  const styles = {
    success: "bg-green-500/10 border-green-500/20 text-green-500",
    error: "bg-red-500/10 border-red-500/20 text-red-500",
  };

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-lg border ${styles[type]}`}
    >
      <Icon size={20} />
      <p>{message}</p>
    </div>
  );
};

const Logo = ({ onclick }) => (
  <div
    className="fixed top-7 left-7 flex cursor-pointer items-center"
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

const InputField = ({
  icon: Icon,
  type,
  placeholder,
  value,
  onChange,
  error,
}) => (
  <div className="space-y-2">
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        <Icon size={20} />
      </div>
      <input
        type={type}
        className={`w-full bg-white/5 border ${
          error ? "border-red-500" : "border-white/10"
        } rounded-lg py-3 px-12 focus:outline-none focus:border-[rgba(207,8,140,1)] transition-colors placeholder-gray-500`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

function Page() {
  const router = useRouter()

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus(null);

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus({
        type: "success",
        message: "Password reset instructions have been sent to your email.",
      });
      setEmail("");
    } catch (err) {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <>
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <Logo onclick={() => router.push("/")} />

        <div className="w-full max-w-md">
          <Link
            href="/signin"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back to Login</span>
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[rgba(207,8,140,1)] via-purple-500 to-blue-500 bg-clip-text text-transparent mb-2">
              Reset Your Password
            </h1>
            <p className="text-gray-400">
              Enter your email address and we&apos;ll send you instructions to reset
              your password.
            </p>
          </div>

          {status && (
            <div className="mb-6">
              <StatusMessage type={status.type} message={status.message} />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              icon={Mail}
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-[rgba(207,8,140,1)] text-white rounded-lg hover:bg-[rgba(207,8,140,0.8)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Sending Instructions...</span>
                </div>
              ) : (
                "Send Reset Instructions"
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-400">
            <p>
              Remember your password?{" "}
              <Link
                href="/signin"
                className="text-[rgba(207,8,140,1)] hover:text-[rgba(207,8,140,0.8)] transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-8 text-center text-sm text-gray-400">
            <p>For security reasons, the reset link will expire in 24 hours.</p>
            <p className="mt-2">
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
}

export default Page;
