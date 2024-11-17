"use client";
import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Smartphone, Timer, RefreshCcw } from "lucide-react";
import Link from "next/link";
import ParticlesComponent from "../../components/Particles/ParticlesBackground";
import { useRouter } from "next/navigation";

const TOTAL_DIGITS = 6;
const RESEND_TIMEOUT = 30; // seconds

const OTPInput = ({ value, onChange, isDisabled }) => {
  const inputRefs = useRef([]);

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleChange = (e, index) => {
    const newValue = e.target.value;
    if (newValue.match(/^[0-9]$/)) {
      const newOTP = [...value];
      newOTP[index] = newValue;
      onChange(newOTP);

      if (index < TOTAL_DIGITS - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, TOTAL_DIGITS);
    if (pastedData.match(/^[0-9]+$/)) {
      const newOTP = pastedData
        .split("")
        .concat(Array(TOTAL_DIGITS).fill(""))
        .slice(0, TOTAL_DIGITS);
      onChange(newOTP);
    }
  };

  return (
    <div className="flex gap-3 justify-center">
      {Array(TOTAL_DIGITS)
        .fill(0)
        .map((_, index) => (
          <input
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            disabled={isDisabled}
            className="w-12 h-14 text-center text-xl font-semibold bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[rgba(207,8,140,1)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          />
        ))}
    </div>
  );
};

const Logo = ({ onclick }) => (
  <div
    className="fixed top-7 left-7 flex cursor-pointer items-center"
    onClick={onclick}
  >
    <div className="relative flex items-center">
      {/* Stylized lightning bolt mark */}
      <div className="relative w-8 h-8 mr-3">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(207,8,140,1)] to-purple-600 rounded-lg opacity-80"></div>
        <div className="absolute inset-[2px] bg-black/40 backdrop-blur-sm rounded-lg"></div>
        {/* Lightning Bolt SVG */}
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
        {/* Glow effect */}
        <div className="absolute inset-0 bg-[rgba(207,8,140,0.2)] rounded-lg blur-md"></div>
      </div>

      {/* Text part */}
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

  const [otp, setOTP] = useState(Array(TOTAL_DIGITS).fill(""));
  const [timer, setTimer] = useState(RESEND_TIMEOUT);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [phone] = useState("+1 (* * *) * * *-4567"); 

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async () => {
    const otpString = otp.join("");
    if (otpString.length !== TOTAL_DIGITS) {
      setError("Please enter all digits");
      return;
    }

    setError("");
    setIsVerifying(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (otpString === "123456") {
        setVerificationStatus("success");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      } else {
        throw new Error("Invalid OTP code");
      }
    } catch (err) {
      setError(err.message);
      setVerificationStatus("error");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTimer(RESEND_TIMEOUT);
      setOTP(Array(TOTAL_DIGITS).fill(""));
      setError("");
      setVerificationStatus(null);
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <>
      <Logo onclick={() => router.push("/")} />
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link
            href="/forgot_password"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back </span>
          </Link>

          <div className="bg-white/5 relative z-10 border border-white/10 rounded-2xl p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-[rgba(207,8,140,0.1)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-[rgba(207,8,140,1)]" />
              </div>
              <h1 className="text-2xl font-bold">Verify Your Phone</h1>
              <p className="text-gray-400">
                We sent a verification code to {phone}
              </p>
            </div>

            <OTPInput
              value={otp}
              onChange={setOTP}
              isDisabled={isVerifying || verificationStatus === "success"}
            />

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <button
              onClick={handleVerify}
              disabled={
                isVerifying ||
                verificationStatus === "success" ||
                otp.includes("")
              }
              className="w-full py-3 px-4 bg-[rgba(207,8,140,1)] text-white rounded-lg hover:bg-[rgba(207,8,140,0.8)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isVerifying ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Verifying...</span>
                </div>
              ) : verificationStatus === "success" ? (
                "Verified Successfully!"
              ) : (
                "Verify Code"
              )}
            </button>

            <div className="text-center text-sm">
              <div className="text-gray-400">
                {timer > 0 ? (
                  <div className="flex items-center justify-center gap-2">
                    <Timer size={16} />
                    <span>Resend code in {timer}s</span>
                  </div>
                ) : (
                  <button
                    onClick={handleResend}
                    className="flex items-center justify-center gap-2 text-[rgba(207,8,140,1)] hover:text-[rgba(207,8,140,0.8)] transition-colors mx-auto"
                  >
                    <RefreshCcw size={16} />
                    <span>Resend Code</span>
                  </button>
                )}
              </div>
            </div>
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
