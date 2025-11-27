"use client";

import * as React from "react";
import { Suspense } from "react";
import Link from "next/link";
import { forgotPassword, resetPassword } from "@/services/auth.service";
import { useToast } from "@/context/ToastContext";
import { useSearchParams } from "next/navigation";
import { resetSchema } from "@/lib/validate";
import { Mail, ShieldCheck, Plane, Eye, EyeOff, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";

type Step = "forgot" | "otp" | "reset";

function ForgotPasswordInner() {
  const { push } = useToast();
  const params = useSearchParams();
  const [step, setStep] = React.useState<Step>("forgot");
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [notification, setNotification] = React.useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);

  const [otpDigits, setOtpDigits] = React.useState<string[]>(Array(6).fill(""));
  const inputRefs = React.useRef<Array<HTMLInputElement | null>>([]);
  const [countdownLeft, setCountdownLeft] = React.useState(600);
  const [resendLeft, setResendLeft] = React.useState(60);
  const countdownTimer = React.useRef<ReturnType<typeof setInterval> | null>(
    null
  );
  const resendTimer = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const strength = React.useMemo(() => {
    let score = 0;
    if (password.length >= 8) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;
    return score;
  }, [password]);
  const match = React.useMemo(
    () => password.length > 0 && password === confirmPassword,
    [password, confirmPassword]
  );

  React.useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (loading) {
      setProgress(0);
      timer = setInterval(() => {
        setProgress((p) => {
          const next = Math.min(100, p + Math.floor(10 + Math.random() * 20));
          if (next >= 100) {
            if (timer) clearInterval(timer);
            setLoading(false);
          }
          return next;
        });
      }, 100);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [loading]);

  React.useEffect(() => {
    return () => {
      if (countdownTimer.current) clearInterval(countdownTimer.current);
      if (resendTimer.current) clearInterval(resendTimer.current);
    };
  }, []);

  function startOtpTimers() {
    setCountdownLeft(600);
    setResendLeft(60);
    if (countdownTimer.current) clearInterval(countdownTimer.current);
    if (resendTimer.current) clearInterval(resendTimer.current);
    countdownTimer.current = setInterval(() => {
      setCountdownLeft((t) => {
        const next = t - 1;
        if (next <= 0) {
          if (countdownTimer.current) clearInterval(countdownTimer.current);
          return 0;
        }
        return next;
      });
    }, 1000);
    resendTimer.current = setInterval(() => {
      setResendLeft((t) => {
        const next = t - 1;
        if (next <= 0) {
          if (resendTimer.current) clearInterval(resendTimer.current);
          return 0;
        }
        return next;
      });
    }, 1000);
  }

  async function onForgotSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) {
      setNotification({
        message: "Please enter your email address.",
        type: "error",
      });
      return;
    }
    setNotification(null);
    setLoading(true);
    const res = await forgotPassword({ email });
    setLoading(false);
    if (!res.success) {
      push({ message: res.error || "Request failed.", type: "error" });
      return;
    }
    setStep("otp");
    startOtpTimers();
    push({
      message: `Password reset instructions sent to ${email}`,
      type: "success",
    });
  }

  function onOtpVerify(e: React.FormEvent) {
    e.preventDefault();
    const otp = otpDigits.join("");
    if (otp.length !== 6) {
      setNotification({
        message: "Please enter the complete 6-digit code.",
        type: "error",
      });
      return;
    }
    setNotification(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (otp === "123456") {
        setStep("reset");
        if (countdownTimer.current) clearInterval(countdownTimer.current);
        if (resendTimer.current) clearInterval(resendTimer.current);
        setNotification({
          message: "Identity verified. Please create a new password.",
          type: "success",
        });
      } else {
        setNotification({
          message: "Invalid verification code. Please try again.",
          type: "error",
        });
        setOtpDigits(Array(6).fill(""));
        inputRefs.current[0]?.focus();
      }
    }, 1200);
  }

  async function onResetSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setNotification({
        message: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }
    if (password !== confirmPassword) {
      setNotification({ message: "Passwords do not match.", type: "error" });
      return;
    }
    if (password.length < 8) {
      setNotification({
        message: "Password must be at least 8 characters long.",
        type: "error",
      });
      return;
    }
    setNotification(null);
    setLoading(true);
    const token = params.get("token") || otpDigits.join("");
    const parsed = resetSchema.safeParse({ token: token || "", password });
    if (!parsed.success) {
      setLoading(false);
      push({ message: "Please check your input.", type: "error" });
      return;
    }
    const res = await resetPassword({ token: token || "", password });
    setLoading(false);
    if (!res.success) {
      push({ message: res.error || "Reset failed.", type: "error" });
      return;
    }
    push({ message: "Password updated. Please login.", type: "success" });
  }

  function renderForgot() {
    return (
      <form onSubmit={onForgotSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 pl-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="admin@personalwings.com"
            />
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-primary to-purple-600 text-white"
        >
          Send Reset Link
        </Button>
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            Remember your password?{" "}
            <Link href="/login" className="text-primary font-semibold">
              Back to Login
            </Link>
          </p>
        </div>
      </form>
    );
  }

  function renderOtp() {
    const minutes = Math.floor(countdownLeft / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (countdownLeft % 60).toString().padStart(2, "0");
    return (
      <form onSubmit={onOtpVerify} className="space-y-6">
        <div className="text-center mb-2 text-sm text-gray-600">
          Code sent to {email || "your email"}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
            Enter 6-digit verification code
          </label>
          <div className="flex justify-center space-x-3 mb-4">
            {otpDigits.map((d, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                value={d}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);
                  setOtpDigits((prev) => {
                    const next = [...prev];
                    next[i] = val;
                    return next;
                  });
                  if (val && i < 5) inputRefs.current[i + 1]?.focus();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !otpDigits[i] && i > 0) {
                    inputRefs.current[i - 1]?.focus();
                  }
                }}
                inputMode="numeric"
                className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            ))}
          </div>
          <div className="text-xs text-green-600 text-center">
            Use code 123456 for testing
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Expires in {minutes}:{seconds}
          </div>
          <Button
            type="button"
            variant="outline"
            className="border-gray-300"
            disabled={resendLeft > 0}
            onClick={() => setResendLeft(60)}
          >
            {resendLeft > 0 ? `Resend in ${resendLeft}s` : "Resend Code"}
          </Button>
        </div>
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-primary to-purple-600 text-white"
        >
          Verify Code
        </Button>
      </form>
    );
  }

  function renderReset() {
    return (
      <form onSubmit={onResetSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${
                    strength < 50
                      ? "bg-red-500"
                      : strength < 75
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  } h-2 rounded-full`}
                  style={{ width: `${strength}%` }}
                />
              </div>
              <div
                className={`text-xs mt-1 ${
                  strength < 50
                    ? "text-red-500"
                    : strength < 75
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {strength < 50 ? "Weak" : strength < 75 ? "Medium" : "Strong"}
              </div>
            </div>
          </div>

          <div>
            <label className="block text sm font-medium text-gray-700 mb-2">
              Confirm Password *
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 pr-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirm ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className={`text-xs mt-2 ${match ? "text-green-600" : "text-red-500"}`}>
              {match ? "Passwords match" : "Passwords do not match"}
            </div>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-primary to purple-600 text-white"
        >
          Reset Password
        </Button>
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            Back to{" "}
            <Link href="/login" className="text-primary font-semibold">
              Login
            </Link>
          </p>
        </div>
      </form>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-500 to-purple-600 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 text-white/10 text-6xl">☁️</div>
        <div className="absolute top-1/3 right-1/4 text-white/10 text-4xl">☁️</div>
        <div className="absolute bottom-1/4 left-1/3 text-white/10 text-5xl">☁️</div>
        <div className="absolute top-1/2 right-1/4 text-white/20 -rotate-45">
          <Plane className="w-20 h-20" />
        </div>
      </div>

      <div className="rounded-3xl shadow-2xl w-full max-w-md mx-auto overflow-hidden bg-white/95 backdrop-blur-md border border-white/30">
        <div className="bg-gradient-to-r from-primary to-purple-600 p-8 text-center text-white">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold">Personal Wings</h1>
          </div>
          <p className="text-white/80 text-sm">
            {step === "forgot"
              ? "Reset Password"
              : step === "otp"
              ? "Verify Your Identity"
              : "Create New Password"}
          </p>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {step === "forgot" && "Forgot your password?"}
              {step === "otp" && "Enter Verification Code"}
              {step === "reset" && "Set a New Password"}
            </h2>
            <p className="text-gray-600">
              {step === "forgot" && "We’ll send a reset link to your email"}
              {step === "otp" && `Code sent to ${email || "your email"}`}
              {step === "reset" && "Create a strong password to secure your account"}
            </p>
          </div>

          {step === "forgot" && renderForgot()}
          {step === "otp" && renderOtp()}
          {step === "reset" && renderReset()}
        </div>

        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
          <div className="text-center text-sm text-gray-600">
            <p>© 2024 Personal Wings. All rights reserved.</p>
            <p className="mt-1">
              <button className="text-primary">Privacy Policy</button> •{" "}
              <button className="text-primary">Terms of Service</button> •{" "}
              <button className="text-primary">Support</button>
            </p>
          </div>
        </div>
      </div>

      {notification && (
        <div
          className={`fixed top-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg shadow-md ${
            notification.type === "error"
              ? "bg-red-600 text-white"
              : "bg-green-600 text-white"
          }`}
        >
          {notification.message}
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl w-[360px]">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <KeyRound className="text-white w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Processing</h3>
            <p className="text-gray-600 mb-4">
              Please wait while we process your request...
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ForgotPasswordInner />
    </Suspense>
  );
}
