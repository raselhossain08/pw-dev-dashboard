"use client";

import * as React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { registerSchema } from "@/lib/validate";
import {
  UserPlus,
  Plane,
  GraduationCap,
  UserCheck,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RegisterPage() {
  const { register } = useAuth();
  const { push } = useToast();
  const [accountType, setAccountType] = React.useState("student");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [country, setCountry] = React.useState("United States");
  const [timezone, setTimezone] = React.useState("America/New_York (EST)");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [terms, setTerms] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [notification, setNotification] = React.useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);

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
            setSuccessOpen(true);
          }
          return next;
        });
      }, 200);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [loading]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword ||
      !country ||
      !timezone ||
      !terms
    ) {
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
    const role = accountType === "dealer" ? "affiliate" : accountType;
    const parsed = registerSchema.safeParse({
      firstName,
      lastName,
      email,
      password,
      role,
    });
    if (!parsed.success) {
      setLoading(false);
      push({ message: "Please check your input.", type: "error" });
      return;
    }
    const res = await register({
      firstName,
      lastName,
      email,
      password,
      role: role as any,
    });
    setLoading(false);
    if (!res.success) {
      push({ message: res.error || "Registration failed.", type: "error" });
      return;
    }
    setSuccessOpen(true);
    push({
      message: "Registration successful. Check your email to activate.",
      type: "success",
    });
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

      <div className="register-container rounded-3xl shadow-2xl w-full max-w-2xl mx-auto overflow-hidden bg-white/95 backdrop-blur-md border border-white/30 relative">
        <div className="bg-gradient-to-r from-primary to-purple-600 p-8 text-center text-white">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <UserPlus className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold">Personal Wings</h1>
          </div>
          <p className="text-white/80 text-sm">
            Create Your Aviation Education Account
          </p>
        </div>

        <div className="px-8 pt-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1 flex items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold bg-accent text-white">
                ✓
              </div>
              <div className="flex-1 h-1 bg-accent mx-2" />
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold bg-gradient-to-r from-primary to-purple-600 text-white">
                2
              </div>
              <div className="flex-1 h-1 bg-gray-200 mx-2" />
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold bg-gray-200 text-gray-600">
                3
              </div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-600 px-2">
            <span>Account Info</span>
            <span>Profile Details</span>
            <span>Verification</span>
          </div>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Create Your Account
            </h2>
            <p className="text-gray-600">
              Join our aviation education and aircraft trading platform
            </p>
          </div>

          <form onSubmit={submit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Account Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  {
                    key: "student",
                    title: "Student Pilot",
                    sub: "Flight Training",
                    icon: <GraduationCap className="text-blue-600" />,
                  },
                  {
                    key: "instructor",
                    title: "Flight Instructor",
                    sub: "Teaching",
                    icon: <UserCheck className="text-green-600" />,
                  },
                  {
                    key: "dealer",
                    title: "Aircraft Dealer",
                    sub: "Trading",
                    icon: <Plane className="text-purple-600" />,
                  },
                ].map((opt) => (
                  <label
                    key={opt.key}
                    className={`flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                      accountType === opt.key
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-primary"
                    }`}
                  >
                    <input
                      type="radio"
                      className="hidden"
                      checked={accountType === opt.key}
                      onChange={() => setAccountType(opt.key)}
                    />
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${
                        opt.key === "student"
                          ? "bg-blue-100"
                          : opt.key === "instructor"
                          ? "bg-green-100"
                          : "bg-purple-100"
                      }`}
                    >
                      {opt.icon}
                    </div>
                    <span className="text-sm font-medium text-center">
                      {opt.title}
                    </span>
                    <span className="text-xs text-gray-500 text-center mt-1">
                      {opt.sub}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <div className="relative">
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 pl-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="John"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    ✎
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <div className="relative">
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 pl-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Doe"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    ✎
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 pl-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="john@example.com"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    @
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <div className="relative">
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 pl-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="+1 (555) 000-0000"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    ☎
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country *
                </label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="United Kingdom">
                      United Kingdom
                    </SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                    <SelectItem value="India">India</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone *
                </label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York (EST)">
                      America/New_York (EST)
                    </SelectItem>
                    <SelectItem value="America/Chicago (CST)">
                      America/Chicago (CST)
                    </SelectItem>
                    <SelectItem value="America/Denver (MST)">
                      America/Denver (MST)
                    </SelectItem>
                    <SelectItem value="America/Los_Angeles (PST)">
                      America/Los_Angeles (PST)
                    </SelectItem>
                    <SelectItem value="Europe/London (GMT)">
                      Europe/London (GMT)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
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
                    {strength < 50
                      ? "Weak"
                      : strength < 75
                      ? "Medium"
                      : "Strong"}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                <div
                  className={`text-xs mt-2 ${
                    match ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {match ? "Passwords match" : "Passwords do not match"}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Terms & Conditions *
              </label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={terms}
                  onCheckedChange={(v) => setTerms(!!v)}
                />
                <span className="text-sm text-gray-600">
                  I agree to the Terms of Service and Privacy Policy
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-purple-600 text-white"
              >
                Create Account
              </Button>
              <div className="flex items-center space-x-4">
                <div className="flex-1 border-t border-gray-200" />
                <div className="text-sm text-gray-500">Or sign up with</div>
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
              <div className="text-center">
                <p className="text-gray-600 text-sm">
                  Already have an account?{" "}
                  <Link href="/" className="text-primary font-semibold">
                    Sign in here
                  </Link>
                </p>
              </div>
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
              <Plane className="text-white w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Creating Your Account
            </h3>
            <p className="text-gray-600 mb-4">
              Setting up your Personal Wings experience...
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

      {successOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl w-[420px]">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
              ✓
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Account Created Successfully
            </h3>
            <p className="text-gray-600 mb-6">
              Please check your email for verification instructions.
            </p>
            <Button
              onClick={() => setSuccessOpen(false)}
              className="w-full bg-primary text-white"
            >
              Continue to Verification
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
