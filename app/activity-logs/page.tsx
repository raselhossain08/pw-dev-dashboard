"use client";

import * as React from "react";
import RequireAuth from "@/components/RequireAuth";
import {
  ListOrdered,
  Bug,
  Brain,
  MessageSquare,
  Download,
  Filter,
  Clock,
  Users,
  ShieldAlert,
  ArrowUp,
  AlertTriangle,
  Bot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

type TimelineItem = {
  level: "INFO" | "SUCCESS" | "WARNING" | "ERROR";
  title: string;
  time: string;
  message: string;
  meta: string[];
};

const timeline: TimelineItem[] = [
  {
    level: "INFO",
    title: "User Registration",
    time: "2 minutes ago",
    message: "New user sarah.wilson@email.com registered successfully",
    meta: ["IP: 192.168.1.45", "Device: Chrome on Windows"],
  },
  {
    level: "SUCCESS",
    title: "Payment Processed",
    time: "15 minutes ago",
    message:
      "Payment of $325,000 processed for aircraft purchase (Cessna 172S)",
    meta: ["Transaction: TX-789456123", "Method: Bank Transfer"],
  },
  {
    level: "WARNING",
    title: "API Rate Limit",
    time: "1 hour ago",
    message:
      "API rate limit approaching for user michael.chen@flightacademy.com",
    meta: ["85% of limit used", "Endpoint: /api/v1/aircraft"],
  },
  {
    level: "ERROR",
    title: "Database Connection",
    time: "2 hours ago",
    message: "Temporary database connection failure - retrying automatically",
    meta: ["Connection timeout", "Server: db-primary-01"],
  },
  {
    level: "INFO",
    title: "Aircraft Listing",
    time: "3 hours ago",
    message: "New aircraft listing created: Beechcraft King Air 350i",
    meta: ["Price: $4,200,000", "Seller: Aviation Partners Inc."],
  },
];

export default function ActivityLogsPage() {
  const [activeTab, setActiveTab] = React.useState("Activity Timeline");
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("All Errors");
  const [aiModel, setAiModel] = React.useState("All Models");
  const [respTime, setRespTime] = React.useState("Any");
  const [chatType, setChatType] = React.useState("All Chats");
  const [timeRange, setTimeRange] = React.useState("Last 24 hours");
  const [activeFilter, setActiveFilter] = React.useState("All");
  const [errorFilter, setErrorFilter] = React.useState("All");
  const [chatFilter, setChatFilter] = React.useState("All");
  const [systemFilter, setSystemFilter] = React.useState("All");

  return (
    <RequireAuth roles={["admin", "super_admin"]}>
      <main className="pt-6">
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-secondary mb-2">
              Logs & Activity
            </h2>
            <p className="text-gray-600">
              Monitor system activity, errors, AI interactions, and chat
              conversations.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Download className="w-4 h-4 mr-2" /> Export Logs
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={() => setFilterOpen(true)}
            >
              <Filter className="w-4 h-4 mr-2" /> Filter Logs
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Total Logs Today
                </p>
                <p className="text-2xl font-bold text-secondary mt-1">2,847</p>
                <p className="text-accent text-sm mt-1">
                  <ArrowUp className="w-3 h-3 inline" /> +12% from yesterday
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <ListOrdered className="text-primary text-lg" />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Errors</p>
                <p className="text-2xl font-bold text-secondary mt-1">24</p>
                <p className="text-red-600 text-sm mt-1">
                  <AlertTriangle className="w-3 h-3 inline" /> 3 critical
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Bug className="text-red-600 text-lg" />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  AI Interactions
                </p>
                <p className="text-2xl font-bold text-secondary mt-1">1,247</p>
                <p className="text-accent text-sm mt-1">
                  <Bot className="w-3 h-3 inline" /> 45% of total
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Brain className="text-purple-600 text-lg" />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Active Chats
                </p>
                <p className="text-2xl font-bold text-secondary mt-1">47</p>
                <p className="text-accent text-sm mt-1">
                  <MessageSquare className="w-3 h-3 inline" /> 12 unread
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="text-blue-600 text-lg" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {[
              "Activity Timeline",
              "Error Logs",
              "AI Logs",
              "Chat Logs",
              "System Logs",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 font-medium text-sm ${
                  activeTab === tab
                    ? "border-b-2 border-primary text-primary"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {activeTab === "Activity Timeline" && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-secondary">
                Activity Timeline
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Time Range:</span>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-40 bg-gray-50 border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Last 24 hours">
                        Last 24 hours
                      </SelectItem>
                      <SelectItem value="Last 7 days">Last 7 days</SelectItem>
                      <SelectItem value="Last 30 days">Last 30 days</SelectItem>
                      <SelectItem value="Custom range">Custom range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                  {["All", "User", "System", "Admin"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setActiveFilter(f)}
                      className={`px-3 py-1 rounded-md text-sm transition-colors ${
                        activeFilter === f
                          ? "bg-primary text-white"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                {timeline.map((t, i) => (
                  <div
                    key={i}
                    className={`relative ${
                      i !== timeline.length - 1 ? "mb-6" : ""
                    }`}
                  >
                    <div className="flex space-x-4">
                      <div className="w-10 relative z-10">
                        <div className="absolute left-1/2 top-2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-primary bg-white"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <div className="flex items-center space-x-2">
                            <span
                              className={`text-white text-xs px-2 py-1 rounded-full ${
                                t.level === "INFO"
                                  ? "bg-[#6366F1]"
                                  : t.level === "SUCCESS"
                                  ? "bg-[#10B981]"
                                  : t.level === "WARNING"
                                  ? "bg-[#F59E0B]"
                                  : "bg-[#EF4444]"
                              }`}
                            >
                              {t.level}
                            </span>
                            <p className="font-medium text-secondary">
                              {t.title}
                            </p>
                          </div>
                          <span className="text-sm text-gray-500">
                            {t.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {t.message.includes("sarah.wilson@email.com") ? (
                            <>
                              New user{" "}
                              <span className="font-medium">
                                sarah.wilson@email.com
                              </span>{" "}
                              registered successfully
                            </>
                          ) : t.message.includes("$325,000") ? (
                            <>
                              Payment of{" "}
                              <span className="font-medium">$325,000</span>{" "}
                              processed for aircraft purchase (Cessna 172S)
                            </>
                          ) : t.message.includes("michael.chen") ? (
                            <>
                              API rate limit approaching for user{" "}
                              <span className="font-medium">
                                michael.chen@flightacademy.com
                              </span>
                            </>
                          ) : t.message.includes("Beechcraft") ? (
                            <>
                              New aircraft listing created:{" "}
                              <span className="font-medium">
                                Beechcraft King Air 350i
                              </span>
                            </>
                          ) : (
                            t.message
                          )}
                        </p>
                        <div className="text-xs text-gray-500 space-x-2">
                          {t.meta.map((m, idx) => (
                            <span
                              key={idx}
                              className={`px-2 py-1 rounded inline-block ${
                                m.includes("85%")
                                  ? "bg-yellow-100 text-yellow-800"
                                  : m.includes("timeout")
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100"
                              }`}
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "Error Logs" && (
          <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-secondary">
                Error Logs
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Severity:</span>
                  <Select value={severity} onValueChange={setSeverity}>
                    <SelectTrigger className="w-40 bg-gray-50 border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Errors">All Errors</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                  {["All", "Unresolved", "Resolved"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setErrorFilter(f)}
                      className={`px-3 py-1 rounded-md text-sm transition-colors ${
                        errorFilter === f
                          ? "bg-primary text-white"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      Time
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      Error Type
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      Message
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      Severity
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      Source
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      time: "2023-10-16 14:23:45",
                      type: "DatabaseConnectionError",
                      msg: "Connection to primary database timed out after 30 seconds",
                      extra:
                        "Failed to establish connection to mysql://db-primary:3306",
                      sev: "CRITICAL",
                      source: "api-server-02",
                      sevColor: "bg-[#EF4444]",
                      resolved: false,
                    },
                    {
                      time: "2023-10-16 13:45:12",
                      type: "PaymentGatewayError",
                      msg: "Stripe API returned 402 Payment Required for transaction",
                      extra: "Card declined: insufficient_funds",
                      sev: "HIGH",
                      source: "payment-service",
                      sevColor: "bg-[#F59E0B]",
                      resolved: false,
                    },
                    {
                      time: "2023-10-16 12:15:33",
                      type: "FileUploadError",
                      msg: "Failed to upload aircraft image: file size exceeds limit",
                      extra: "File: aircraft_photo.jpg (15.2MB), Limit: 10MB",
                      sev: "MEDIUM",
                      source: "web-server-01",
                      sevColor: "bg-[#F59E0B]",
                      resolved: true,
                    },
                  ].map((r, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-100 transition-all hover:bg-gray-50"
                    >
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {r.time}
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-medium text-secondary">{r.type}</p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm text-gray-600">{r.msg}</p>
                        <p className="text-xs text-gray-500 mt-1">{r.extra}</p>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`text-white text-xs px-2 py-1 rounded-full ${r.sevColor}`}
                        >
                          {r.sev}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {r.source}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <button className="text-primary hover:text-primary/80 text-sm">
                            View Details
                          </button>
                          {r.resolved ? (
                            <button
                              className="text-gray-400 text-sm cursor-not-allowed"
                              disabled
                            >
                              Resolved
                            </button>
                          ) : (
                            <button className="text-accent hover:text-accent/80 text-sm">
                              Resolve
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "AI Logs" && (
          <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-secondary">
                AI Interaction Logs
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">AI Model:</span>
                  <Select value={aiModel} onValueChange={setAiModel}>
                    <SelectTrigger className="w-40 bg-gray-50 border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Models">All Models</SelectItem>
                      <SelectItem value="GPT-4">GPT-4</SelectItem>
                      <SelectItem value="Claude-2">Claude-2</SelectItem>
                      <SelectItem value="Llama-2">Llama-2</SelectItem>
                      <SelectItem value="Custom Model">Custom Model</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Response Time:</span>
                  <Select value={respTime} onValueChange={setRespTime}>
                    <SelectTrigger className="w-44 bg-gray-50 border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Any">Any</SelectItem>
                      <SelectItem value="Fast (<2s)">Fast (&lt;2s)</SelectItem>
                      <SelectItem value="Medium (2-5s)">
                        Medium (2-5s)
                      </SelectItem>
                      <SelectItem value="Slow (>5s)">Slow (&gt;5s)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {[
                {
                  title: "Course Recommendation",
                  user: "student@example.com",
                  model: "GPT-4",
                  time: "1.2s",
                  input:
                    '"I\'m a private pilot with 150 hours, looking to advance my training. What commercial pilot courses would you recommend?"',
                  output:
                    '"Based on your experience, I recommend our Commercial Pilot License program and Instrument Rating course. The CPL requires 250 total hours and focuses on advanced maneuvers, while the IR enhances your instrument flying skills."',
                  tokens: "Tokens: 128/2048",
                  cost: "Cost: $0.0024",
                  status: "Success",
                  at: "2023-10-16 15:30:22",
                },
                {
                  title: "Aircraft Technical Query",
                  user: "mechanic@aviation.com",
                  model: "Claude-2",
                  time: "3.8s",
                  input:
                    '"What are the common maintenance issues for Cessna 172 aircraft with over 5,000 flight hours?"',
                  output:
                    '"For high-time Cessna 172s, common issues include engine overhaul requirements (typically needed around 2,000-hour TBO), corrosion in wing spars, landing gear maintenance, and avionics upgrades. Regular inspections should focus on these areas to ensure airworthiness."',
                  tokens: "Tokens: 96/2048",
                  cost: "Cost: $0.0018",
                  status: "Success",
                  at: "2023-10-16 14:45:15",
                },
              ].map((log, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg p-4 transition-all hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Bot className="text-purple-600 w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-secondary">
                          {log.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          User: {log.user} • Model: {log.model}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-secondary">
                        {log.time}
                      </p>
                      <p className="text-xs text-gray-600">Response time</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        User Input:
                      </p>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-800">{log.input}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        AI Response:
                      </p>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <p className="text-sm text-gray-800">{log.output}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <span>{log.tokens}</span>
                      <span>{log.cost}</span>
                      <span className="text-accent">{log.status}</span>
                    </div>
                    <span>{log.at}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Chat Logs" && (
          <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-secondary">
                Chat Logs
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Chat Type:</span>
                  <Select value={chatType} onValueChange={setChatType}>
                    <SelectTrigger className="w-48 bg-gray-50 border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Chats">All Chats</SelectItem>
                      <SelectItem value="Student Support">
                        Student Support
                      </SelectItem>
                      <SelectItem value="Sales Inquiry">
                        Sales Inquiry
                      </SelectItem>
                      <SelectItem value="Technical Support">
                        Technical Support
                      </SelectItem>
                      <SelectItem value="Aircraft Brokerage">
                        Aircraft Brokerage
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                  {["All", "Active", "Closed"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setChatFilter(f)}
                      className={`px-3 py-1 rounded-md text-sm transition-colors ${
                        chatFilter === f
                          ? "bg-primary text-white"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chat List */}
              <div className="lg:col-span-1 border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                  <h4 className="font-medium text-secondary">Recent Chats</h4>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {[
                    {
                      initials: "RS",
                      name: "Robert Smith",
                      subject: "Cessna 172 Inquiry",
                      time: "2h ago",
                      status: "Active",
                      messages: 12,
                      color: "bg-primary",
                      chip: "bg-primary/10 text-primary",
                      preview:
                        "I'm interested in the Cessna 172S. Could you provide more details about the maintenance history?",
                    },
                    {
                      initials: "EJ",
                      name: "Emma Johnson",
                      subject: "Training Program",
                      time: "1d ago",
                      status: "Closed",
                      messages: 8,
                      color: "bg-accent",
                      chip: "bg-gray-100 text-gray-600",
                      preview:
                        "I have questions about the commercial pilot program requirements and schedule.",
                    },
                    {
                      initials: "DL",
                      name: "David Lee",
                      subject: "Aircraft Maintenance",
                      time: "3d ago",
                      status: "Closed",
                      messages: 15,
                      color: "bg-purple-500",
                      chip: "bg-gray-100 text-gray-600",
                      preview:
                        "Need to schedule annual inspection for our Piper PA-28 fleet.",
                    },
                  ].map((c, i) => (
                    <div
                      key={i}
                      className="border-b border-gray-100 p-4 cursor-pointer transition-all hover:bg-primary/5"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 ${c.color} rounded-full flex items-center justify-center`}
                          >
                            <span className="text-white text-sm font-medium">
                              {c.initials}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-secondary">
                              {c.name}
                            </p>
                            <p className="text-sm text-gray-600">{c.subject}</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">{c.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {c.preview}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${c.chip}`}
                        >
                          {c.status}
                        </span>
                        <span className="text-xs text-gray-500">
                          {c.messages} messages
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Detail */}
              <div className="lg:col-span-2 border border-gray-200 rounded-lg">
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-secondary">
                        Cessna 172 Inquiry
                      </h4>
                      <p className="text-sm text-gray-600">
                        Robert Smith • robert.smith@email.com
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        Aircraft Brokerage
                      </span>
                      <span className="text-xs text-gray-500">
                        Started: 2023-10-16 14:30
                      </span>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 max-h-96 overflow-y-auto">
                  <div className="space-y-4">
                    {/* User Message */}
                    <div className="flex justify-start">
                      <div className="max-w-xs lg:max-w-md">
                        <div className="bg-[#6366F1] text-white rounded-lg p-4">
                          <p className="text-sm">
                            Hello, I&apos;m interested in the Cessna 172S listed
                            on your platform. Could you provide more details
                            about the maintenance history?
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Robert Smith • 14:30
                        </p>
                      </div>
                    </div>

                    {/* Support Reply */}
                    <div className="flex justify-end">
                      <div className="max-w-xs lg:max-w-md">
                        <div className="bg-gray-100 text-gray-800 rounded-lg p-4">
                          <p className="text-sm">
                            Hello Robert, thank you for your inquiry. The Cessna
                            172S has excellent maintenance records with all
                            annuals completed on time. Recent upgrades include
                            new tires, Garmin GTX 345 transponder, and fresh
                            interior.
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 text-right">
                          Support Agent • 14:32
                        </p>
                      </div>
                    </div>

                    {/* User Follow-up */}
                    <div className="flex justify-start">
                      <div className="max-w-xs lg:max-w-md">
                        <div className="bg-[#6366F1] text-white rounded-lg p-4">
                          <p className="text-sm">
                            Thanks for the information. Is the aircraft
                            available for a pre-purchase inspection? Also,
                            what&apos;s the engine time and when was the last
                            overhaul?
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Robert Smith • 14:35
                        </p>
                      </div>
                    </div>

                    {/* Support Reply */}
                    <div className="flex justify-end">
                      <div className="max-w-xs lg:max-w-md">
                        <div className="bg-gray-100 text-gray-800 rounded-lg p-4">
                          <p className="text-sm">
                            Yes, we can arrange a pre-purchase inspection. The
                            engine has 1,200 hours total time and was last
                            overhauled at 1,000 hours. The aircraft is currently
                            located at KAPA and available for viewing this week.
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 text-right">
                          Support Agent • 14:38
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat Info */}
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-700">Chat Duration</p>
                      <p className="text-gray-600">8 minutes</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Messages</p>
                      <p className="text-gray-600">4 total</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">
                        First Response Time
                      </p>
                      <p className="text-gray-600">2 minutes</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Satisfaction</p>
                      <p className="text-accent">Not rated</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "System Logs" && (
          <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-secondary">
                System Logs
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Component:</span>
                  <Select defaultValue="All Components">
                    <SelectTrigger className="w-48 bg-gray-50 border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Components">
                        All Components
                      </SelectItem>
                      <SelectItem value="Web Application">
                        Web Application
                      </SelectItem>
                      <SelectItem value="API Server">API Server</SelectItem>
                      <SelectItem value="Database">Database</SelectItem>
                      <SelectItem value="Payment Gateway">
                        Payment Gateway
                      </SelectItem>
                      <SelectItem value="AI Service">AI Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                  {["All", "Warnings", "Errors"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setSystemFilter(f)}
                      className={`px-3 py-1 rounded-md text-sm transition-colors ${
                        systemFilter === f
                          ? "bg-primary text-white"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Average Uptime</p>
                  <p className="text-2xl font-bold text-secondary mt-1">
                    99.97%
                  </p>
                </div>
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="text-primary w-5 h-5" />
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-secondary mt-1">
                    1,284
                  </p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="text-blue-600 w-5 h-5" />
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Security Alerts</p>
                  <p className="text-2xl font-bold text-secondary mt-1">2</p>
                </div>
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <ShieldAlert className="text-red-600 w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      Time
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      Component
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      Event
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      Level
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      Source
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      time: "2023-10-16 16:05:12",
                      component: "API Server",
                      event: "Deployment completed successfully",
                      level: "SUCCESS",
                      levelColor: "bg-[#10B981]",
                      source: "api-server-02",
                    },
                    {
                      time: "2023-10-16 15:48:03",
                      component: "Database",
                      event: "Replica lag detected: 1250ms",
                      level: "WARNING",
                      levelColor: "bg-[#F59E0B]",
                      source: "db-replica-01",
                    },
                    {
                      time: "2023-10-16 15:12:45",
                      component: "Web Application",
                      event: "Elevated 500 errors (rate: 2.1%)",
                      level: "ERROR",
                      levelColor: "bg-[#EF4444]",
                      source: "web-server-01",
                    },
                  ].map((r, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-100 transition-all hover:bg-gray-50"
                    >
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {r.time}
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-medium text-secondary">
                          {r.component}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm text-gray-600">{r.event}</p>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`text-white text-xs px-2 py-1 rounded-full ${r.levelColor}`}
                        >
                          {r.level}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {r.source}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <button className="text-primary hover:text-primary/80 text-sm">
                            View
                          </button>
                          <button className="text-accent hover:text-accent/80 text-sm">
                            Acknowledge
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Filter Logs Modal */}
        {filterOpen && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) setFilterOpen(false);
            }}
          >
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-secondary">
                  Filter Logs
                </h3>
                <button
                  onClick={() => setFilterOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl leading-none"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Log Level
                  </label>
                  <div className="space-y-2">
                    {[
                      { label: "Information", checked: true },
                      { label: "Warning", checked: true },
                      { label: "Error", checked: true },
                      { label: "Debug", checked: false },
                    ].map((l, i) => (
                      <div key={i} className="flex items-center">
                        <Checkbox
                          defaultChecked={l.checked}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {l.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Range
                  </label>
                  <Select defaultValue="Last 24 hours">
                    <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Last 24 hours">
                        Last 24 hours
                      </SelectItem>
                      <SelectItem value="Last 7 days">Last 7 days</SelectItem>
                      <SelectItem value="Last 30 days">Last 30 days</SelectItem>
                      <SelectItem value="Custom range">Custom range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Source
                  </label>
                  <Select defaultValue="All Sources">
                    <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Sources">All Sources</SelectItem>
                      <SelectItem value="Web Application">
                        Web Application
                      </SelectItem>
                      <SelectItem value="API Server">API Server</SelectItem>
                      <SelectItem value="Database">Database</SelectItem>
                      <SelectItem value="Payment Gateway">
                        Payment Gateway
                      </SelectItem>
                      <SelectItem value="AI Service">AI Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contains Text
                  </label>
                  <input
                    type="text"
                    placeholder="Search in log messages..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  onClick={() => setFilterOpen(false)}
                >
                  Reset
                </button>
                <button
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                  onClick={() => setFilterOpen(false)}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      </main>
    </RequireAuth>
  );
}
