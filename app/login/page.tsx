"use client";

import * as React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/lib/validate";
import {
  Lock,
  User,
  KeyRound,
  Eye,
  EyeOff,
  Plane,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginPage() {
  const { login } = useAuth();
  const { push } = useToast();
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [twoFactor, setTwoFactor] = React.useState(false);
  const [otp, setOtp] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [notification, setNotification] = React.useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);

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

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      push({ message: "Please fill in all required fields.", type: "error" });
      return;
    }
    setLoading(true);
    const res = await login({ email, password });
    if (!res.success) {
      push({ message: res.error || "Invalid credentials.", type: "error" });
      setLoading(false);
      setProgress(0);
      return;
    }
    push({ message: "Login successful", type: "success" });
    router.replace("/");
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-500 to-purple-600 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 text-white/10 text-6xl">
          ☁️
        </div>
        <div className="absolute top-1/3 right-1/4 text-white/10 text-4xl">
          ☁️
        </div>
        <div className="absolute bottom-1/4 left-1/3 text-white/10 text-5xl">
          ☁️
        </div>
        <div className="absolute top-1/2 right-1/4 text-white/20 -rotate-45">
          <Plane className="w-20 h-20" />
        </div>
      </div>

      <div className="rounded-3xl shadow-2xl w-full max-w-md mx-auto overflow-hidden bg-white/95 backdrop-blur-md border border-white/30">
        <div className="bg-gradient-to-r from-primary to-purple-600 p-8 text-center text-white">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold">Personal Wings</h1>
          </div>
          <p className="text-white/80 text-sm">Welcome Back</p>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Sign in to your account
            </h2>
            <p className="text-gray-600">
              Access aviation education and trading dashboard
            </p>
          </div>

          <form onSubmit={submit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 pl-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="admin@personalwings.com"
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link href="/forgot-password" className="text-sm text-primary">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pl-11 pr-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter your password"
                />
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
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
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <Checkbox
                  checked={twoFactor}
                  onCheckedChange={(v) => setTwoFactor(!!v)}
                />
                <span className="text-sm text-gray-700">
                  Use two-factor authentication
                </span>
              </label>
              <Link href="/register" className="text-sm text-primary">
                Create account
              </Link>
            </div>

            {twoFactor && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter 6-digit code"
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-purple-600 text-white"
            >
              Sign In
            </Button>

            <div className="flex items-center space-x-4">
              <div className="flex-1 border-t border-gray-200" />
              <div className="text-sm text-gray-500">Or continue with</div>
              <div className="flex-1 border-t border-gray-200" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="border-gray-200"
              >
                <span className="text-red-500">G</span>
                <span className="ml-2 text-sm font-medium text-gray-700">
                  Google
                </span>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-gray-200"
              >
                <span className="text-blue-600">in</span>
                <span className="ml-2 text-sm font-medium text-gray-700">
                  LinkedIn
                </span>
              </Button>
            </div>
          </form>
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
              <ShieldCheck className="text-white w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Processing</h3>
            <p className="text-gray-600 mb-4">
              Please wait while we process your request...
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
