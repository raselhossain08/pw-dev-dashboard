"use client";

import * as React from "react";
import {
  Plus,
  CalendarCheck,
  Clock,
  Plane,
  UserCheck,
  Search as SearchIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
/* removed unused dropdown menu imports */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProgramStatus = "active" | "upcoming" | "completed" | "draft";

type ProgramItem = {
  id: string;
  name: string;
  code: string;
  type:
    | "Private Pilot"
    | "Commercial Pilot"
    | "Instrument Rating"
    | "Type Rating"
    | "Recurrent Training";
  status: ProgramStatus;
  duration: string;
  sessions: number;
  instructor: string;
  aircraft: string;
  nextSession?: string;
  price?: string;
  desc?: string;
  flightHours?: number;
  students?: number;
  startsOn?: string;
  instructorCount?: number;
};

type ModuleItem = { n: number; t: string; d: string };
type ScheduleSlot = {
  tag: string;
  time: string;
  title: string;
  student: string;
  instructor: string;
  aircraft?: string;
  simulator?: string;
};
type AircraftField = {
  label: string;
  value: string;
  accent?: boolean;
  warn?: boolean;
};
type AircraftModel = {
  name: string;
  subtitle: string;
  status: string;
  fields: AircraftField[];
};

const initialPrograms: ProgramItem[] = [
  {
    id: "ppl",
    name: "Private Pilot License (PPL)",
    code: "PPL-2023",
    type: "Private Pilot",
    status: "active",
    duration: "12 weeks",
    sessions: 24,
    instructor: "Capt. A. Sharma",
    aircraft: "Cessna 172",
    nextSession: "Nov 16, 10:00 AM",
    price: "$8,500",
    desc: "Basic flight training for private aircraft operation",
    flightHours: 40,
    students: 24,
    startsOn: "Oct 15, 2023",
    instructorCount: 3,
  },
  {
    id: "cpl",
    name: "Commercial Pilot License (CPL)",
    code: "CPL-2025",
    type: "Commercial Pilot",
    status: "upcoming",
    duration: "16 weeks",
    sessions: 32,
    instructor: "Capt. R. Singh",
    aircraft: "Beechcraft Baron",
    nextSession: "Dec 02, 9:30 AM",
    price: "$25,000",
    desc: "Advanced training for commercial aircraft operation",
    flightHours: 250,
    students: 18,
    startsOn: "Nov 1, 2023",
    instructorCount: 5,
  },
  {
    id: "ir",
    name: "Instrument Rating",
    code: "IR-2025",
    type: "Instrument Rating",
    status: "draft",
    duration: "8 weeks",
    sessions: 18,
    instructor: "Capt. S. Khan",
    aircraft: "Piper Arrow",
    price: "$6,500",
    desc: "IFR training and procedures",
    flightHours: 60,
    students: 8,
    startsOn: "Dec 5, 2023",
    instructorCount: 2,
  },
];

export default function TrainingPrograms() {
  const [createOpen, setCreateOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("Programs List");
  const [typeFilter, setTypeFilter] = React.useState("All Programs");
  const [statusFilter, setStatusFilter] = React.useState("All Status");
  const [search, setSearch] = React.useState("");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [monthState, setMonthState] = React.useState({ index: 9, year: 2023 });
  const events: Record<number, { label: string; color: string }[]> =
    React.useMemo(
      () => ({
        11: [
          { label: "PPL Ground School", color: "bg-primary/10 text-primary" },
        ],
        12: [{ label: "Flight Session", color: "bg-accent/10 text-accent" }],
        15: [{ label: "CPL Theory", color: "bg-purple-100 text-purple-600" }],
        16: [
          { label: "PPL Flight Test", color: "bg-primary text-white" },
          { label: "B737 Simulator", color: "bg-primary text-white" },
        ],
      }),
      []
    );
  const [selectedDay, setSelectedDay] = React.useState<number | null>(16);

  const [selectedProgramId, setSelectedProgramId] = React.useState<
    string | null
  >(initialPrograms[0].id);
  const selectedProgram = React.useMemo(
    () =>
      initialPrograms.find((p) => p.id === selectedProgramId) ||
      initialPrograms[0],
    [selectedProgramId]
  );

  const [modules, setModules] = React.useState<ModuleItem[]>([
    {
      n: 1,
      t: "Aerodynamics & Principles of Flight",
      d: "10 lessons • 15 hours",
    },
    { n: 2, t: "Aircraft Systems & Instruments", d: "8 lessons • 12 hours" },
    { n: 3, t: "Meteorology & Weather Planning", d: "6 lessons • 10 hours" },
  ]);

  const [scheduleSlots, setScheduleSlots] = React.useState<ScheduleSlot[]>([
    {
      tag: "PPL",
      time: "9:00 AM - 11:00 AM",
      title: "Private Pilot Flight Test",
      student: "John Smith",
      instructor: "M. Johnson",
      aircraft: "C172",
    },
    {
      tag: "Type Rating",
      time: "2:00 PM - 5:00 PM",
      title: "B737 Simulator Session",
      student: "Sarah Wilson",
      instructor: "R. Davis",
      simulator: "B737NG",
    },
  ]);

  const [aircraftModels, setAircraftModels] = React.useState<AircraftModel[]>([
    {
      name: "Cessna 172",
      subtitle: "Single-engine, fixed-wing",
      status: "Active",
      fields: [
        { label: "Registration", value: "N172SA" },
        { label: "Year", value: "2018" },
        { label: "Engine", value: "Lycoming IO-360" },
        { label: "Status", value: "Available", accent: true },
      ],
    },
    {
      name: "Piper PA-28",
      subtitle: "Single-engine, low-wing",
      status: "Active",
      fields: [
        { label: "Registration", value: "N281PB" },
        { label: "Year", value: "2015" },
        { label: "Engine", value: "Lycoming O-320" },
        { label: "Status", value: "Maintenance", warn: true },
      ],
    },
    {
      name: "Boeing 737 Simulator",
      subtitle: "Full-flight simulator",
      status: "Active",
      fields: [
        { label: "Model", value: "B737-800NG" },
        { label: "Manufacturer", value: "CAE" },
        { label: "Level", value: "D" },
        { label: "Status", value: "Available", accent: true },
      ],
    },
  ]);

  const addModule = () => {
    const next = modules.length + 1;
    setModules((m) => [
      ...m,
      { n: next, t: `New Module ${next}`, d: "0 lessons • 0 hours" },
    ]);
  };

  const addScheduleSlot = () => {
    setScheduleSlots((s) => [
      ...s,
      {
        tag: "PPL",
        time: "1:00 PM - 2:00 PM",
        title: "Ground Briefing",
        student: "New Student",
        instructor: "TBD",
        aircraft: "C172",
      },
    ]);
  };

  const addAircraft = () => {
    setAircraftModels((a) => [
      ...a,
      {
        name: "New Aircraft",
        subtitle: "Model TBD",
        status: "Active",
        fields: [
          { label: "Registration", value: "N000XX" },
          { label: "Year", value: "2020" },
          { label: "Engine", value: "TBD" },
          { label: "Status", value: "Available", accent: true },
        ],
      },
    ]);
  };

  const handleViewDetails = (id: string) => {
    setSelectedProgramId(id);
    setActiveTab("Programs List");
    const el = document.getElementById("training-details");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  React.useEffect(() => {
    const id =
      activeTab === "Programs List"
        ? "programs-list"
        : activeTab === "Schedule Editor"
        ? "schedule-editor"
        : activeTab === "Aircraft Models"
        ? "aircraft-models"
        : null;
    if (id) {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [activeTab]);

  const filtered = initialPrograms.filter((p) => {
    const matchesType =
      typeFilter === "All Programs" ||
      p.type === (typeFilter as ProgramItem["type"]);
    const matchesStatus =
      statusFilter === "All Status" ||
      p.status === (statusFilter as ProgramStatus);
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.code.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  /* removed unused statusChip */

  const typeChip = (t: ProgramItem["type"]) =>
    t === "Private Pilot"
      ? "bg-primary/10 text-primary"
      : t === "Commercial Pilot"
      ? "bg-accent/10 text-accent"
      : t === "Type Rating"
      ? "bg-purple-100 text-purple-600"
      : "bg-gray-100 text-gray-700";

  return (
    <main className="p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-secondary mb-2">
            Training Programs
          </h2>
          <p className="text-gray-600">
            Manage aviation training programs, schedules, and aircraft models.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> Create Program
          </Button>
        </div>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        id="stats-section"
      >
        <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Active Programs
              </p>
              <p className="text-2xl font-bold text-secondary mt-1">
                {initialPrograms.filter((p) => p.status === "active").length}
              </p>
              <p className="text-accent text-sm mt-1">+3 this month</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <CalendarCheck className="text-primary w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Upcoming Sessions
              </p>
              <p className="text-2xl font-bold text-secondary mt-1">47</p>
              <p className="text-accent text-sm mt-1">Next 30 days</p>
            </div>
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <Plane className="text-accent w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Aircraft Models
              </p>
              <p className="text-2xl font-bold text-secondary mt-1">12</p>
              <p className="text-accent text-sm mt-1">All operational</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Plane className="text-purple-600 w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Instructors</p>
              <p className="text-2xl font-bold text-secondary mt-1">18</p>
              <p className="text-accent text-sm mt-1">15 available</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <UserCheck className="text-yellow-600 w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {[
            "Programs List",
            "Schedule Editor",
            "Aircraft Models",
            "Instructors",
            "Reports",
          ].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`py-4 px-1 font-medium text-sm ${
                activeTab === t
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t}
            </button>
          ))}
        </nav>
      </div>

      <div className="mb-8" id="programs-list">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-secondary">
            Training Programs
          </h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Filter:</span>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-gray-50 border border-gray-200 rounded-lg w-56">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Programs">All Programs</SelectItem>
                  <SelectItem value="Private Pilot">Private Pilot</SelectItem>
                  <SelectItem value="Commercial Pilot">
                    Commercial Pilot
                  </SelectItem>
                  <SelectItem value="Instrument Rating">
                    Instrument Rating
                  </SelectItem>
                  <SelectItem value="Type Rating">Type Ratings</SelectItem>
                  <SelectItem value="Recurrent Training">
                    Recurrent Training
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Status:</span>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-gray-50 border border-gray-200 rounded-lg w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Status">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Search programs..."
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="training-card bg-card rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${typeChip(
                      p.type
                    )}`}
                  >
                    {p.type === "Type Rating"
                      ? "Type Rating"
                      : p.type.includes("Private")
                      ? "Private"
                      : p.type.includes("Commercial")
                      ? "Commercial"
                      : p.type}
                  </span>
                  <h4 className="font-semibold text-secondary mt-2">
                    {p.name}
                  </h4>
                  <p className="text-sm text-gray-600">{p.desc}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-secondary">{p.price}</p>
                  <p className="text-sm text-gray-600">Full course</p>
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">
                    {p.type === "Private Pilot"
                      ? "6-8 months"
                      : p.type === "Commercial Pilot"
                      ? "12-18 months"
                      : "3-4 months"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {p.type === "Type Rating"
                      ? "Simulator Hours"
                      : "Flight Hours"}
                  </span>
                  <span className="font-medium">
                    {p.flightHours}{" "}
                    {p.type === "Type Rating" ? "hours" : "minimum"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Students</span>
                  <span className="font-medium text-accent">
                    {p.students} enrolled
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Starts: {p.startsOn}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <UserCheck className="w-4 h-4" />
                  <span>{p.instructorCount} instructors</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  className="flex-1"
                  onClick={() => handleViewDetails(p.id)}
                >
                  View Details
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-gray-300 text-gray-700"
                  onClick={() => handleViewDetails(p.id)}
                >
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
        <h3 className="text-xl font-semibold text-secondary mb-6">
          Training Program Details
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-secondary mb-4">
                  Basic Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Program Name
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedProgram.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Program Code
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedProgram.code}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
                    {selectedProgram.desc}
                  </textarea>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-secondary mb-4">
                  Requirements & Prerequisites
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Minimum age: 17 years
                    </span>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Medical certificate: Class 3
                    </span>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      High school diploma or equivalent
                    </span>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      English language proficiency
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-secondary mb-4">
                  Curriculum & Modules
                </h4>
                <div className="space-y-3">
                  {modules.map((m) => (
                    <div
                      key={m.n}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <span className="text-primary font-medium">
                            {m.n}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-secondary">{m.t}</p>
                          <p className="text-sm text-gray-600">{m.d}</p>
                        </div>
                      </div>
                      <Button variant="ghost" className="text-gray-400">
                        •••
                      </Button>
                    </div>
                  ))}
                  <button
                    className="w-full border-2 border-dashed border-gray-300 rounded-lg py-3 text-gray-500"
                    onClick={addModule}
                  >
                    Add New Module
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-secondary mb-4">
                Pricing & Duration
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Fee
                  </label>
                  <input
                    type="text"
                    defaultValue="$8,500"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    defaultValue="6-8 months"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Flight Hours Required
                  </label>
                  <input
                    type="text"
                    defaultValue="40"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-secondary mb-4">
                Status & Visibility
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Program Status
                  </label>
                  <Select defaultValue="Active">
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Upcoming">Upcoming</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Visibility
                  </label>
                  <Select defaultValue="Public">
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Public">Public</SelectItem>
                      <SelectItem value="Private">Private</SelectItem>
                      <SelectItem value="Hidden">Hidden</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                    defaultChecked
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Featured program
                  </span>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-secondary mb-4">
                Associated Aircraft
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Plane className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">Cessna 172</span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    Primary
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Plane className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">Piper PA-28</span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    Secondary
                  </span>
                </div>
                <button className="w-full text-sm text-primary mt-2">
                  Add Aircraft
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="bg-card rounded-xl p-6 shadow-sm border border-gray-100 mb-8"
        id="schedule-editor"
      >
        <h3 className="text-xl font-semibold text-secondary mb-6">
          Schedule Editor
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-medium text-secondary">
                {months[monthState.index]} {monthState.year}
              </h4>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  className="p-2"
                  onClick={() =>
                    setMonthState((m) => ({
                      index: m.index === 0 ? 11 : m.index - 1,
                      year: m.index === 0 ? m.year - 1 : m.year,
                    }))
                  }
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  className="p-2"
                  onClick={() =>
                    setMonthState((m) => ({
                      index: m.index === 11 ? 0 : m.index + 1,
                      year: m.index === 11 ? m.year + 1 : m.year,
                    }))
                  }
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => {
                    const d = new Date();
                    setMonthState({
                      index: d.getMonth(),
                      year: d.getFullYear(),
                    });
                    setSelectedDay(d.getDate());
                  }}
                >
                  Today
                </Button>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div
                    key={d}
                    className="p-3 text-center text-sm font-medium text-gray-600"
                  >
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7">
                {Array.from({ length: 31 }).map((_, i) => (
                  <div
                    key={i + 1}
                    className={`p-3 ${
                      i % 7 !== 6 ? "border-r" : ""
                    } border-b border-gray-200 h-24 ${
                      selectedDay === i + 1 ? "bg-primary text-white" : ""
                    }`}
                    onClick={() => setSelectedDay(i + 1)}
                  >
                    <div
                      className={`text-sm ${
                        selectedDay === i + 1 ? "text-white" : "text-gray-400"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <div className="mt-1 space-y-1">
                      {(events[i + 1] ?? []).map((e, idx) => (
                        <div
                          key={idx}
                          className={`${e.color} text-xs p-1 rounded`}
                        >
                          {e.label}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={`pad-${i}`}
                    className={`p-3 ${i !== 2 ? "border-r" : ""} h-24`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-secondary mb-4">
              {months[monthState.index]} {selectedDay}, {monthState.year}
            </h4>
            <div className="space-y-4">
              {scheduleSlots.map((s, idx) => (
                <div
                  key={idx}
                  className="schedule-slot border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span
                      className={`${
                        s.tag === "Type Rating"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-primary/10 text-primary"
                      } text-xs px-2 py-1 rounded-full`}
                    >
                      {s.tag}
                    </span>
                    <span className="text-xs text-gray-500">{s.time}</span>
                  </div>
                  <p className="font-medium text-secondary">{s.title}</p>
                  <p className="text-sm text-gray-600 mb-2">
                    Student: {s.student}
                  </p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Instructor: {s.instructor}</span>
                    <span>
                      {s.aircraft
                        ? `Aircraft: ${s.aircraft}`
                        : `Simulator: ${s.simulator}`}
                    </span>
                  </div>
                </div>
              ))}
              <button
                className="w-full border-2 border-dashed border-gray-300 rounded-lg py-3 text-gray-500"
                onClick={addScheduleSlot}
              >
                Add Schedule Slot
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="bg-card rounded-xl p-6 shadow-sm border border-gray-100"
        id="aircraft-models"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-secondary">
            Aircraft Models
          </h3>
          <Button onClick={addAircraft}>
            <Plus className="w-4 h-4 mr-2" /> Add Aircraft
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aircraftModels.map((a, idx) => (
            <div
              key={idx}
              className="aircraft-model border border-gray-200 rounded-lg p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-secondary">{a.name}</h4>
                  <p className="text-sm text-gray-600">{a.subtitle}</p>
                </div>
                <span className="bg-accent/10 text-accent text-xs px-2 py-1 rounded-full">
                  {a.status}
                </span>
              </div>
              <div className="space-y-3 mb-4">
                {a.fields.map((f, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-600">{f.label}</span>
                    <span
                      className={`font-medium ${
                        f.accent
                          ? "text-accent"
                          : f.warn
                          ? "text-yellow-600"
                          : ""
                      }`}
                    >
                      {f.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <Button className="flex-1">View Details</Button>
                <Button variant="outline" className="flex-1">
                  Maintenance
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Training Program</DialogTitle>
            <DialogDescription>Enter program information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Program Name
              </label>
              <input
                id="program-name"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Enter program name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Program Type
              </label>
              <Select defaultValue="Private Pilot">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Private Pilot">Private Pilot</SelectItem>
                  <SelectItem value="Commercial Pilot">
                    Commercial Pilot
                  </SelectItem>
                  <SelectItem value="Instrument Rating">
                    Instrument Rating
                  </SelectItem>
                  <SelectItem value="Type Rating">Type Rating</SelectItem>
                  <SelectItem value="Recurrent Training">
                    Recurrent Training
                  </SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <input
                  id="program-duration"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="e.g., 12 weeks"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sessions
                </label>
                <input
                  id="program-sessions"
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="e.g., 24"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                className="border-gray-300"
                onClick={() => setCreateOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setCreateOpen(false)}>Create</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
