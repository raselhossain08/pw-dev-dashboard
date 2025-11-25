"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { verifyEmail } from "@/services/auth.service";
import { useToast } from "@/context/ToastContext";
import {
  GraduationCap,
  Mail,
  UserPlus,
  SlidersHorizontal,
  Check,
  Book,
  Plane,
  LineChart,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ActivateAccountPage() {
  const router = useRouter();
  const params = useSearchParams();
  const { push } = useToast();
  const [step, setStep] = React.useState(1);
  const totalSteps = 4;
  const [codes, setCodes] = React.useState<string[]>(Array(6).fill(""));
  const [countdown, setCountdown] = React.useState(60);
  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);

  React.useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  React.useEffect(() => {
    const token = params.get("token");
    if (token) {
      (async () => {
        const res = await verifyEmail(token);
        if (res.success) {
          push({ message: "Email verified successfully.", type: "success" });
          setStepSafe(2);
        } else {
          push({ message: res.error || "Verification failed.", type: "error" });
        }
      })();
    }
  }, [params]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const setStepSafe = (s: number) => {
    setStep(s);
  };

  const handleCodeChange = (index: number, value: string) => {
    const v = value.replace(/[^0-9A-Za-z]/g, "").slice(0, 1);
    const next = [...codes];
    next[index] = v;
    setCodes(next);
    if (v && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
    if (next.every((c) => c.length === 1)) {
      setStepSafe(2);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const text = e.clipboardData.getData("text").trim();
    if (text.length === codes.length) {
      const arr = text.split("").slice(0, codes.length);
      setCodes(arr);
      setStepSafe(2);
    }
  };

  const resend = () => {
    if (countdown === 0) {
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) {
            clearInterval(timer);
            return 0;
          }
          return c - 1;
        });
      }, 1000);
    }
  };

  const progressWidth = `${(step / totalSteps) * 100}%`;

  return (
    <main
      className="bg-background min-h-screen flex items-center justify-center p-6"
      onPaste={handlePaste}
    >
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <GraduationCap className="text-white w-7 h-7" />
            </div>
            <h1 className="text-3xl font-bold text-secondary">EduSaaS</h1>
          </div>
          <h2 className="text-2xl font-bold text-secondary mb-2">
            Activate Your Account
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Complete your account setup to access all platform features
          </p>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: progressWidth }}
                />
              </div>
            </div>
            <span className="ml-4 text-sm font-medium text-gray-600">{`Step ${step} of ${totalSteps}`}</span>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div
                className={`w-8 h-8 rounded-full border-2 mx-auto flex items-center justify-center text-sm font-medium mb-2 ${
                  step === 1
                    ? "bg-primary border-primary text-white"
                    : step > 1
                    ? "bg-accent border-accent text-white"
                    : "bg-gray-100 border-gray-300 text-gray-600"
                }`}
              >
                {step > 1 ? <Check className="w-3 h-3" /> : 1}
              </div>
              <p
                className={`text-xs font-medium ${
                  step >= 1 ? "text-primary" : "text-gray-500"
                }`}
              >
                Email Verification
              </p>
            </div>
            <div className="text-center">
              <div
                className={`w-8 h-8 rounded-full border-2 mx-auto flex items-center justify-center text-sm font-medium mb-2 ${
                  step === 2
                    ? "bg-primary border-primary text-white"
                    : step > 2
                    ? "bg-accent border-accent text-white"
                    : "bg-gray-100 border-gray-300 text-gray-600"
                }`}
              >
                {step > 2 ? <Check className="w-3 h-3" /> : 2}
              </div>
              <p
                className={`text-xs font-medium ${
                  step >= 2 ? "text-primary" : "text-gray-500"
                }`}
              >
                Profile Setup
              </p>
            </div>
            <div className="text-center">
              <div
                className={`w-8 h-8 rounded-full border-2 mx-auto flex items-center justify-center text-sm font-medium mb-2 ${
                  step === 3
                    ? "bg-primary border-primary text-white"
                    : step > 3
                    ? "bg-accent border-accent text-white"
                    : "bg-gray-100 border-gray-300 text-gray-600"
                }`}
              >
                {step > 3 ? <Check className="w-3 h-3" /> : 3}
              </div>
              <p
                className={`text-xs font-medium ${
                  step >= 3 ? "text-primary" : "text-gray-500"
                }`}
              >
                Preferences
              </p>
            </div>
            <div className="text-center">
              <div
                className={`w-8 h-8 rounded-full border-2 mx-auto flex items-center justify-center text-sm font-medium mb-2 ${
                  step === 4
                    ? "bg-primary border-primary text-white"
                    : step > 4
                    ? "bg-accent border-accent text-white"
                    : "bg-gray-100 border-gray-300 text-gray-600"
                }`}
              >
                {step > 4 ? <Check className="w-3 h-3" /> : 4}
              </div>
              <p
                className={`text-xs font-medium ${
                  step >= 4 ? "text-primary" : "text-gray-500"
                }`}
              >
                Complete
              </p>
            </div>
          </div>
        </div>

        <div className="activation-card bg-card rounded-xl shadow-sm border border-gray-100 p-8">
          {step === 1 && (
            <div>
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="text-primary w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-2">
                  Verify Your Email Address
                </h3>
                <p className="text-gray-600">
                  We&apos;ve sent a 6-digit verification code to{" "}
                  <span className="font-medium">john.doe@example.com</span>
                </p>
              </div>
              <div className="max-w-md mx-auto mb-6">
                <div className="flex justify-between space-x-3">
                  {codes.map((c, idx) => (
                    <input
                      key={idx}
                      ref={(el) => {
                        inputsRef.current[idx] = el;
                      }}
                      value={c}
                      onChange={(e) => handleCodeChange(idx, e.target.value)}
                      maxLength={1}
                      className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  ))}
                </div>
              </div>
              <div className="text-center mb-6">
                <p className="text-sm text-gray-600">
                  Didn&apos;t receive the code?{" "}
                  <button
                    onClick={resend}
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    {countdown > 0 ? `Resend in ${countdown}s` : "Resend now"}
                  </button>
                </p>
              </div>
              <div className="flex justify-between max-w-md mx-auto">
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700"
                >
                  Change Email
                </Button>
                <Button
                  onClick={() => setStepSafe(2)}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  Verify Code
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="text-accent w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-2">
                  Complete Your Profile
                </h3>
                <p className="text-gray-600">
                  Tell us more about yourself to personalize your experience
                </p>
              </div>
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <UserPlus className="text-gray-400 w-8 h-8" />
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90">
                      <SlidersHorizontal className="text-white w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Upload a profile picture (optional)
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User Role
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-primary">
                      <input
                        type="radio"
                        name="role"
                        className="text-primary"
                        defaultChecked
                      />
                      <span className="ml-3">
                        <span className="block font-medium text-secondary">
                          Student
                        </span>
                        <span className="block text-sm text-gray-600">
                          Learning courses
                        </span>
                      </span>
                    </label>
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-primary">
                      <input
                        type="radio"
                        name="role"
                        className="text-primary"
                      />
                      <span className="ml-3">
                        <span className="block font-medium text-secondary">
                          Instructor
                        </span>
                        <span className="block text-sm text-gray-600">
                          Teaching courses
                        </span>
                      </span>
                    </label>
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-primary">
                      <input
                        type="radio"
                        name="role"
                        className="text-primary"
                      />
                      <span className="ml-3">
                        <span className="block font-medium text-secondary">
                          Admin
                        </span>
                        <span className="block text-sm text-gray-600">
                          Platform management
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    className="border-gray-300 text-gray-700"
                    onClick={() => setStepSafe(1)}
                  >
                    Back
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary/90 text-white"
                    onClick={() => setStepSafe(3)}
                  >
                    Save & Continue
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SlidersHorizontal className="text-purple-600 w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-2">
                  Set Your Preferences
                </h3>
                <p className="text-gray-600">
                  Customize your platform experience
                </p>
              </div>
              <div className="max-w-2xl mx-auto space-y-6">
                <div>
                  <h4 className="font-medium text-secondary mb-4">
                    Notification Preferences
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-secondary">
                          Email Notifications
                        </p>
                        <p className="text-sm text-gray-600">
                          Receive updates about courses and platform news
                        </p>
                      </div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <span className="relative w-12 h-6 bg-gray-200 rounded-full peer-checked:bg-primary after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-secondary">
                          Push Notifications
                        </p>
                        <p className="text-sm text-gray-600">
                          Get instant alerts about important updates
                        </p>
                      </div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <span className="relative w-12 h-6 bg-gray-200 rounded-full peer-checked:bg-primary after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-secondary">SMS Alerts</p>
                        <p className="text-sm text-gray-600">
                          Receive text messages for critical updates
                        </p>
                      </div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <span className="relative w-12 h-6 bg-gray-200 rounded-full peer-checked:bg-primary after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-secondary mb-4">
                    Communication Frequency
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-primary">
                      <input
                        type="radio"
                        name="frequency"
                        className="text-primary"
                        defaultChecked
                      />
                      <span className="ml-3">
                        <span className="block font-medium text-secondary">
                          Regular
                        </span>
                        <span className="block text-sm text-gray-600">
                          Weekly updates
                        </span>
                      </span>
                    </label>
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-primary">
                      <input
                        type="radio"
                        name="frequency"
                        className="text-primary"
                      />
                      <span className="ml-3">
                        <span className="block font-medium text-secondary">
                          Minimal
                        </span>
                        <span className="block text-sm text-gray-600">
                          Important only
                        </span>
                      </span>
                    </label>
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-primary">
                      <input
                        type="radio"
                        name="frequency"
                        className="text-primary"
                      />
                      <span className="ml-3">
                        <span className="block font-medium text-secondary">
                          Frequent
                        </span>
                        <span className="block text-sm text-gray-600">
                          Daily updates
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    className="border-gray-300 text-gray-700"
                    onClick={() => setStepSafe(2)}
                  >
                    Back
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary/90 text-white"
                    onClick={() => setStepSafe(4)}
                  >
                    Save & Continue
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center">
              <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="text-accent w-12 h-12" />
              </div>
              <h3 className="text-2xl font-semibold text-secondary mb-4">
                Account Activated Successfully!
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                Your EduSaaS account is now ready. You can start exploring all
                the features and capabilities of our platform.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
                <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Book className="text-primary w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-secondary mb-2">
                    Training Programs
                  </h4>
                  <p className="text-sm text-gray-600">
                    Access comprehensive aviation training courses
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Plane className="text-accent w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-secondary mb-2">
                    Aircraft Brokerage
                  </h4>
                  <p className="text-sm text-gray-600">
                    Browse and manage aircraft listings
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <LineChart className="text-purple-600 w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-secondary mb-2">
                    Analytics
                  </h4>
                  <p className="text-sm text-gray-600">
                    Track your progress and performance
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-primary hover:bg-primary/90 text-white px-8"
                  onClick={() => router.push("/")}
                >
                  Go to Dashboard
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 px-8"
                >
                  Take a Tour
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-8 text-gray-600">
          <p>
            Need help?{" "}
            <a
              href="#"
              className="text-primary hover:text-primary/80 font-medium"
            >
              Contact Support
            </a>{" "}
            or call +1 (555) 123-HELP
          </p>
        </div>
      </div>
    </main>
  );
}
