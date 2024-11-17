"use client";
import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, Loader, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ParticlesComponent from "../../components/Particles/ParticlesBackground";
import { useRouter } from "next/navigation";

const VerificationState = {
  VERIFYING: "VERIFYING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  RESENDING: "RESENDING",
  RESEND_SUCCESS: "RESEND_SUCCESS",
};

const StateDisplay = ({ state, email, error, onResend }) => {
  const displays = {
    [VerificationState.VERIFYING]: (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
          <Loader className="w-8 h-8 animate-spin text-[rgba(207,8,140,1)]" />
        </div>
        <h2 className="text-xl font-semibold">Verifying your email...</h2>
        <p className="text-gray-400">
          Please wait while we verify your email address.
        </p>
      </div>
    ),
    [VerificationState.SUCCESS]: (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-xl font-semibold">Email Verified!</h2>
        <p className="text-gray-400">
          Your email has been successfully verified. You can now access all
          features.
        </p>
        <Link
          href="/signin"
          className="inline-block mt-4 px-6 py-2 bg-[rgba(207,8,140,1)] text-white rounded-lg hover:bg-[rgba(207,8,140,0.8)] transition-colors"
        >
          Continue to Login
        </Link>
      </div>
    ),
    [VerificationState.ERROR]: (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
          <XCircle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-xl font-semibold">Verification Failed</h2>
        <p className="text-gray-400">
          {error || "The verification link is invalid or has expired."}
        </p>
        <button
          onClick={onResend}
          className="inline-block mt-4 px-6 py-2 bg-[rgba(207,8,140,1)] text-white rounded-lg hover:bg-[rgba(207,8,140,0.8)] transition-colors"
        >
          Resend Verification Email
        </button>
      </div>
    ),
    [VerificationState.RESENDING]: (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
          <Mail className="w-8 h-8 text-[rgba(207,8,140,1)]" />
        </div>
        <h2 className="text-xl font-semibold">Sending Verification Email...</h2>
        <p className="text-gray-400">
          Please wait while we send you a new verification email.
        </p>
      </div>
    ),
    [VerificationState.RESEND_SUCCESS]: (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
          <Mail className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-xl font-semibold">Verification Email Sent!</h2>
        <p className="text-gray-400">
          We&apos;ve sent a new verification email to{" "}
          <span className="font-medium text-white">{email}</span>
        </p>
        <div className="text-sm text-gray-400 mt-4">
          <p>Didn&apos;t receive the email?</p>
          <button
            onClick={onResend}
            className="text-[rgba(207,8,140,1)] hover:text-[rgba(207,8,140,0.8)] transition-colors mt-2"
          >
            Click to resend
          </button>
        </div>
      </div>
    ),
  };

  return displays[state] || null;
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

function Page() {
  const router = useRouter()

  const [verificationState, setVerificationState] = useState(
    VerificationState.VERIFYING
  );
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Get token from URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const email = params.get("email");
    setEmail(email);

    if (!token) {
      setVerificationState(VerificationState.ERROR);
      setError("No verification token found.");
      return;
    }

    verifyEmail(token);
  }, []);

  const verifyEmail = async (token) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // For demo purposes, randomly succeed or fail
      if (Math.random() > 0.5) {
        setVerificationState(VerificationState.SUCCESS);
      } else {
        throw new Error("Verification failed");
      }
    } catch (err) {
      setVerificationState(VerificationState.ERROR);
      setError(err.message);
    }
  };

  const handleResend = async () => {
    setVerificationState(VerificationState.RESENDING);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setVerificationState(VerificationState.RESEND_SUCCESS);
    } catch (err) {
      setVerificationState(VerificationState.ERROR);
      setError("Failed to resend verification email. Please try again.");
    }
  };

  return (
    <>
      <Logo onclick={() => router.push("/")} />
      <div className="min-h-screen relative z-10 bg-black text-white flex items-center justify-center p-6">
        <div className="w-full relative z-10 max-w-md">
          {(verificationState === VerificationState.ERROR ||
            verificationState === VerificationState.RESEND_SUCCESS) && (
            <Link
              href="/signin"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft size={20} />
              <span>Back to Login</span>
            </Link>
          )}

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <StateDisplay
              state={verificationState}
              email={email}
              error={error}
              onResend={handleResend}
            />
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
}

export default Page;
