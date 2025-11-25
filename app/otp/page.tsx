"use client";

import * as React from "react";
import Link from "next/link";
import { ShieldCheck, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OTPPage() {
  const [email, setEmail] = React.useState("admin@personalwings.com");
  const [otpDigits, setOtpDigits] = React.useState<string[]>(Array(6).fill(""));
  const inputRefs = React.useRef<Array<HTMLInputElement | null>>([]);
  const [loading, setLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [notification, setNotification] = React.useState<{ message: string; type: "error" | "success" } | null>(null);
  const [countdownLeft, setCountdownLeft] = React.useState(600);
  const [resendLeft, setResendLeft] = React.useState(60);
  const countdownTimer = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const resendTimer = React.useRef<ReturnType<typeof setInterval> | null>(null);

  React.useEffect(() => {
    return () => {
      if (countdownTimer.current) clearInterval(countdownTimer.current);
      if (resendTimer.current) clearInterval(resendTimer.current);
    };
  }, []);

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
    setCountdownLeft(600);
    setResendLeft(60);
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
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const otp = otpDigits.join("");
    if (otp.length !== 6) {
      setNotification({ message: "Please enter the complete 6-digit code.", type: "error" });
      return;
    }
    setNotification(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (otp === "123456") {
        setNotification({ message: "Verification successful! Redirecting...", type: "success" });
      } else {
        setNotification({ message: "Invalid verification code. Please try again.", type: "error" });
        setOtpDigits(Array(6).fill(""));
        inputRefs.current[0]?.focus();
      }
    }, 1200);
  }

  const minutes = Math.floor(countdownLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (countdownLeft % 60).toString().padStart(2, "0");

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
          <p className="text-white/80 text-sm">Verify Your Identity</p>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Enter Verification Code</h2>
            <p className="text-gray-600">Code sent to {email}</p>
          </div>

          <form onSubmit={submit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 text-center">Enter 6-digit verification code</label>
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
              <div className="text-xs text-green-600 text-center">Use code 123456 for testing</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">Expires in {minutes}:{seconds}</div>
              <Button type="button" variant="outline" className="border-gray-300" disabled={resendLeft > 0} onClick={() => setResendLeft(60)}>
                {resendLeft > 0 ? `Resend in ${resendLeft}s` : "Resend Code"}
              </Button>
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-primary to-purple-600 text-white">Verify Code</Button>
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Back to <Link href="/login" className="text-primary font-semibold">Login</Link>
              </p>
            </div>
          </form>
        </div>

        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
          <div className="text-center text-sm text-gray-600">
            <p>© 2024 Personal Wings. All rights reserved.</p>
            <p className="mt-1">
              <button className="text-primary">Privacy Policy</button> • <button className="text-primary">Terms of Service</button> • <button className="text-primary">Support</button>
            </p>
          </div>
        </div>
      </div>

      {notification && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg shadow-md ${notification.type === "error" ? "bg-red-600 text-white" : "bg-green-600 text-white"}`}>{notification.message}</div>
      )}

      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl w-[360px]">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="text-white w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Processing</h3>
            <p className="text-gray-600 mb-4">Please wait while we process your request...</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

