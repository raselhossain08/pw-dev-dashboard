"use client";

import * as React from "react";
import Image from "next/image";
import {
  Search as SearchIcon,
  Download,
  Save,
  Camera,
  MapPin,
  Mail,
  Calendar,
  UserCheck,
  Lock,
  ChartLine,
  Users as UsersIcon,
  Github,
  Linkedin,
  Chrome,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Profile() {
  const [activeTab, setActiveTab] = React.useState("Profile");
  const [firstName, setFirstName] = React.useState("Alex");
  const [lastName, setLastName] = React.useState("Johnson");
  const [email, setEmail] = React.useState("alex.johnson@edusaas.com");
  const [phone, setPhone] = React.useState("+1 (555) 123-4567");
  const [bio, setBio] = React.useState(
    "Experienced educational administrator with over 8 years in the EdTech industry. Passionate about creating engaging learning experiences and driving educational innovation through technology."
  );
  const [position, setPosition] = React.useState("Administrator");
  const [department, setDepartment] = React.useState("Academic Operations");

  return (
    <main className="p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-secondary mb-2">My Profile</h2>
          <p className="text-gray-600">
            Manage your personal information, preferences, and account settings.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-gray-300">
            <Download className="w-4 h-4 mr-2" /> Export Data
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" /> Save Changes
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-xl p-1 shadow-sm border border-gray-100 mb-8 inline-flex">
        {["Profile", "Security", "Preferences", "Billing", "Notifications"].map(
          (t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === t
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {t}
            </button>
          )
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <div className="relative">
                  <Image
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                    alt="Profile"
                    width={96}
                    height={96}
                    className="rounded-full border-4 border-white shadow-lg"
                    unoptimized
                  />
                  <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full border-2 border-white bg-green-500" />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <Camera className="text-white w-4 h-4" />
                </button>
              </div>
              <h3 className="text-xl font-bold text-secondary mb-1">
                Alex Johnson
              </h3>
              <p className="text-gray-600 mb-2">Administrator</p>
              <div className="flex items-center justify-center space-x-1 text-sm text-gray-500 mb-4">
                <MapPin className="w-3 h-3" />
                <span>San Francisco, CA</span>
              </div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm mb-4">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>Active now</span>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-lg font-bold text-secondary">142</div>
                  <div className="text-xs text-gray-500">Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-secondary">2.8K</div>
                  <div className="text-xs text-gray-500">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-secondary">98%</div>
                  <div className="text-xs text-gray-500">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
            <h4 className="text-lg font-semibold text-secondary mb-4">
              Contact Information
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="text-blue-600 w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="text-sm font-medium">
                    alex.johnson@edusaas.com
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <PhoneIcon />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <div className="text-sm font-medium">+1 (555) 123-4567</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Calendar className="text-purple-600 w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Joined</div>
                  <div className="text-sm font-medium">January 15, 2022</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
            <h4 className="text-lg font-semibold text-secondary mb-4">
              Skills & Expertise
            </h4>
            <div className="space-y-4">
              {[
                { label: "Educational Technology", level: "95%" },
                { label: "Curriculum Development", level: "88%" },
                { label: "Online Teaching", level: "92%" },
                { label: "Student Assessment", level: "85%" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{s.label}</span>
                    <span className="font-medium">{s.level}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-accent rounded-full h-2"
                      style={{ width: s.level }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-semibold text-secondary">
                Personal Information
              </h4>
              <button className="text-primary hover:text-primary/80 text-sm font-medium">
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-gray-50"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-gray-50"
                  rows={4}
                />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-semibold text-secondary">
                Professional Details
              </h4>
              <button className="text-primary hover:text-primary/80 text-sm font-medium">
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position
                </label>
                <Select value={position} onValueChange={setPosition}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Administrator">Administrator</SelectItem>
                    <SelectItem value="Instructor">Instructor</SelectItem>
                    <SelectItem value="Content Manager">
                      Content Manager
                    </SelectItem>
                    <SelectItem value="Support Staff">Support Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Academic Operations">
                      Academic Operations
                    </SelectItem>
                    <SelectItem value="Curriculum Development">
                      Curriculum Development
                    </SelectItem>
                    <SelectItem value="Student Success">
                      Student Success
                    </SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee ID
                </label>
                <input
                  value="EMP-2022-001"
                  readOnly
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Join Date
                </label>
                <input
                  value="January 15, 2022"
                  readOnly
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-gray-50"
                />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
            <h4 className="text-lg font-semibold text-secondary mb-4">
              Recent Activity
            </h4>
            <div className="space-y-4">
              {[
                {
                  iconBg: "bg-green-100",
                  Icon: UserCheck,
                  title: "Profile updated",
                  desc: "Updated personal information",
                  time: "2 hours ago",
                  color: "text-green-600",
                },
                {
                  iconBg: "bg-blue-100",
                  Icon: Lock,
                  title: "Password changed",
                  desc: "Updated account security",
                  time: "1 day ago",
                  color: "text-blue-600",
                },
                {
                  iconBg: "bg-purple-100",
                  Icon: ChartLine,
                  title: "Report generated",
                  desc: "Monthly analytics report",
                  time: "3 days ago",
                  color: "text-purple-600",
                },
                {
                  iconBg: "bg-yellow-100",
                  Icon: UsersIcon,
                  title: "Team management",
                  desc: "Added new team member",
                  time: "1 week ago",
                  color: "text-yellow-600",
                },
              ].map((a, i) => (
                <div
                  key={i}
                  className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg"
                >
                  <div
                    className={`w-8 h-8 ${a.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}
                  >
                    <a.Icon className={`${a.color} w-4 h-4`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-secondary">
                      <span className="font-medium">{a.title}</span> - {a.desc}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
            <h4 className="text-lg font-semibold text-secondary mb-4">
              Connected Accounts
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Chrome className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Google Account</div>
                    <div className="text-xs text-gray-500">
                      alex.johnson@gmail.com
                    </div>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                  Connected
                </span>
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                    <Github className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">GitHub</div>
                    <div className="text-xs text-gray-500">@alexjohnson</div>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                  Connected
                </span>
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center">
                    <Linkedin className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">LinkedIn</div>
                    <div className="text-xs text-gray-500">Not connected</div>
                  </div>
                </div>
                <Button className="bg-primary text-white">Connect</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl p-6 shadow-sm border border-red-200">
        <h4 className="text-lg font-semibold text-red-700 mb-4">Danger Zone</h4>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <div className="font-medium text-secondary mb-1">
              Delete Account
            </div>
            <div className="text-sm text-gray-600">
              Permanently delete your account and all associated data
            </div>
          </div>
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            <Trash className="w-4 h-4 mr-2" /> Delete Account
          </Button>
        </div>
      </div>
    </main>
  );
}

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="text-green-600 w-4 h-4"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.08 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72l.2 1.43a2 2 0 0 1-.57 1.82l-1.27 1.27a16 16 0 0 0 6.88 6.88l1.27-1.27a2 2 0 0 1 1.82-.57l1.43.2A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
