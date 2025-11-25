"use client";

import * as React from "react";
import {
  ClipboardList,
  FileText,
  Users,
  Download,
  EllipsisVertical,
  ArrowUp,
  CheckCircle,
  ChartLine,
  Search,
  Clock,
  Eye,
  Pencil,
  Layers,
  Trash,
  Percent,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type AssignmentItem = {
  id: string;
  title: string;
  description: string;
  course: string;
  status: "active" | "draft" | "completed" | "graded" | "pending";
  type: "individual" | "group" | "project" | "essay";
  weightPercent: number;
  progressScore: number;
  completedCount: number;
  attempts: number;
  dueText?: string;
};

const initialAssignments: AssignmentItem[] = [
  {
    id: "a1",
    title: "Portfolio Website Project",
    description:
      "Create a responsive portfolio website using HTML, CSS, and JavaScript.",
    course: "Web Development",
    status: "active",
    type: "individual",
    weightPercent: 30,
    progressScore: 78,
    completedCount: 89,
    attempts: 342,
    dueText: "Due: Oct 15",
  },
  {
    id: "a2",
    title: "Data Analysis Report",
    description:
      "Comprehensive report using Pandas, NumPy, and data visualization.",
    course: "Data Science",
    status: "completed",
    type: "individual",
    weightPercent: 25,
    progressScore: 65,
    completedCount: 120,
    attempts: 128,
    dueText: "Submitted",
  },
  {
    id: "a3",
    title: "Mobile App UX Case Study",
    description:
      "Design and prototype a mobile app interface with research documentation.",
    course: "UI/UX Design",
    status: "active",
    type: "individual",
    weightPercent: 20,
    progressScore: 82,
    completedCount: 215,
    attempts: 215,
    dueText: "Due: Oct 22",
  },
];

export default function Assignments() {
  const [items, setItems] =
    React.useState<AssignmentItem[]>(initialAssignments);
  const [search, setSearch] = React.useState("");
  const [courseFilter, setCourseFilter] = React.useState<string>("All Courses");
  const [statusFilter, setStatusFilter] = React.useState<string>("All Status");
  const [typeFilter, setTypeFilter] = React.useState<string>("All Types");
  const [sortBy, setSortBy] = React.useState<string>("Newest");
  const [createOpen, setCreateOpen] = React.useState(false);
  const [editItem, setEditItem] = React.useState<AssignmentItem | null>(null);
  const [previewItem, setPreviewItem] = React.useState<AssignmentItem | null>(
    null
  );
  const [analyticsItem, setAnalyticsItem] =
    React.useState<AssignmentItem | null>(null);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const [createPreset, setCreatePreset] = React.useState<{
    type?: AssignmentItem["type"];
  } | null>(null);
  const searchRef = React.useRef<HTMLInputElement>(null);

  const filtered = items
    .filter((a) =>
      search
        ? a.title.toLowerCase().includes(search.toLowerCase()) ||
          a.description.toLowerCase().includes(search.toLowerCase())
        : true
    )
    .filter((a) =>
      courseFilter === "All Courses" ? true : a.course === courseFilter
    )
    .filter((a) =>
      statusFilter === "All Status"
        ? true
        : a.status === statusFilter.toLowerCase()
    )
    .filter((a) =>
      typeFilter === "All Types" ? true : a.type === typeFilter.toLowerCase()
    )
    .sort((a, b) => {
      if (sortBy === "Newest") return b.id.localeCompare(a.id);
      if (sortBy === "Completion") return b.progressScore - a.progressScore;
      if (sortBy === "Name") return a.title.localeCompare(b.title);
      return 0;
    });

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="">
      <div className="p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-2">
                Assignments
              </h2>
              <p className="text-gray-600">
                Create, manage, and grade student assignments
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="ghost" className="text-gray-600">
                <Download className="w-4 h-4 mr-2" /> Export
              </Button>
              <Button
                onClick={() => setCreateOpen(true)}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <ClipboardList className="w-4 h-4 mr-2" /> Create Assignment
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search assignments... (Cmd+K)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              ref={searchRef}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Total Assignments
                </p>
                <p className="text-2xl font-bold text-secondary mt-1">
                  {items.length}
                </p>
                <p className="text-accent text-sm mt-1">
                  <ArrowUp className="inline w-3 h-3" /> +12% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <ClipboardList className="text-primary w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Completed</p>
                <p className="text-2xl font-bold text-secondary mt-1">
                  {items.reduce((sum, a) => sum + a.completedCount, 0)}
                </p>
                <p className="text-accent text-sm mt-1">
                  <CheckCircle className="inline w-3 h-3" /> good progress
                </p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-accent w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Avg. Score</p>
                <p className="text-2xl font-bold text-secondary mt-1">
                  {Math.round(
                    items.reduce((sum, a) => sum + a.progressScore, 0) /
                      Math.max(1, items.length)
                  )}
                  %
                </p>
                <p className="text-accent text-sm mt-1">
                  <ChartLine className="inline w-3 h-3" /> +4% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <ChartLine className="text-purple-600 w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Active</p>
                <p className="text-2xl font-bold text-secondary mt-1">
                  {items.filter((a) => a.status === "active").length}
                </p>
                <p className="text-accent text-sm mt-1">
                  <ArrowUp className="inline w-3 h-3" /> steady flow
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="text-yellow-600 w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-2">
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm w-48">
                  <SelectValue placeholder="All Courses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Courses">All Courses</SelectItem>
                  <SelectItem value="Web Development">
                    Web Development
                  </SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Digital Marketing">
                    Digital Marketing
                  </SelectItem>
                  <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm w-40">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Status">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Graded">Graded</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm w-40">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Types">All Types</SelectItem>
                  <SelectItem value="Individual">Individual</SelectItem>
                  <SelectItem value="Group">Group</SelectItem>
                  <SelectItem value="Project">Project</SelectItem>
                  <SelectItem value="Essay">Essay</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm w-56">
                  <SelectValue placeholder="Sort by: Newest" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Newest">Sort by: Newest</SelectItem>
                  <SelectItem value="Completion">
                    Sort by: Completion
                  </SelectItem>
                  <SelectItem value="Name">Sort by: Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-primary"
              >
                <Download className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filtered.map((a) => (
            <div
              key={a.id}
              className="assignment-card bg-card rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary">{a.title}</h3>
                    <p className="text-sm text-gray-500">{a.course} Course</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-primary rounded"
                    >
                      <EllipsisVertical className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onSelect={() => setEditItem(a)}>
                      <Pencil className="w-4 h-4 mr-2" /> Edit Assignment
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => {
                        const copy: AssignmentItem = {
                          ...a,
                          id: `a${Date.now()}`,
                        };
                        setItems((prev) => [copy, ...prev]);
                      }}
                    >
                      <Layers className="w-4 h-4 mr-2" /> Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setPreviewItem(a)}>
                      <Eye className="w-4 h-4 mr-2" /> Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setAnalyticsItem(a)}>
                      <ChartLine className="w-4 h-4 mr-2" /> Analytics
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onSelect={() => setDeleteId(a.id)}
                    >
                      <Trash className="w-4 h-4 mr-2" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <p className="text-gray-600 text-sm mb-4">{a.description}</p>

              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />{" "}
                    {a.type[0].toUpperCase() + a.type.slice(1)}
                  </span>
                  <span className="flex items-center">
                    <Percent className="w-3 h-3 mr-1" /> {a.weightPercent}% of
                    grade
                  </span>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    a.status === "active"
                      ? "bg-accent/10 text-accent"
                      : a.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : a.status === "graded"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {a.status[0].toUpperCase() + a.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-secondary mb-2">
                    {a.progressScore}%
                  </div>
                  <div className="text-sm text-gray-600">Avg. Score</div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${a.progressScore}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary mb-2">
                    {a.completedCount}
                  </div>
                  <div className="text-sm text-gray-600">Completed</div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full"
                      style={{ width: "85%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary mb-2">
                    {a.attempts}
                  </div>
                  <div className="text-sm text-gray-600">Attempts</div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gray-400 h-2 rounded-full"
                      style={{ width: "65%" }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
                <div className="text-primary font-medium">
                  {a.dueText || ""}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    <Download className="w-4 h-4 mr-1" /> Resources
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-secondary mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              className="flex items-center space-x-3 p-4 bg-primary/5 hover:bg-primary/10 rounded-lg"
              onClick={() => {
                setCreatePreset({ type: "individual" });
                setCreateOpen(true);
              }}
            >
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <ClipboardList className="text-white w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-medium text-secondary">Create Assignment</p>
                <p className="text-sm text-gray-600">New task</p>
              </div>
            </Button>
            <Button className="flex items-center space-x-3 p-4 bg-accent/5 hover:bg-accent/10 rounded-lg">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <CheckCircle className="text-white w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-medium text-secondary">Grade Submissions</p>
                <p className="text-sm text-gray-600">23 pending</p>
              </div>
            </Button>
            <Button className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Download className="text-white w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-medium text-secondary">Export Grades</p>
                <p className="text-sm text-gray-600">Download reports</p>
              </div>
            </Button>
            <Button className="flex items-center space-x-3 p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Clock className="text-white w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-medium text-secondary">Set Reminders</p>
                <p className="text-sm text-gray-600">Due dates</p>
              </div>
            </Button>
          </div>
        </div>

        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Assignment</DialogTitle>
              <DialogDescription>Set up assignment details.</DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget as HTMLFormElement);
                const title = String(fd.get("title") || "");
                const description = String(fd.get("description") || "");
                const course = String(fd.get("course") || "");
                const type = String(fd.get("type") || "individual");
                const status = String(fd.get("status") || "draft");
                const weightPercent = Number(fd.get("weight") || 0);
                const newItem: AssignmentItem = {
                  id: `a${Date.now()}`,
                  title,
                  description,
                  course,
                  status: status.toLowerCase() as AssignmentItem["status"],
                  type: type.toLowerCase() as AssignmentItem["type"],
                  weightPercent,
                  progressScore: 0,
                  completedCount: 0,
                  attempts: 0,
                  dueText: "",
                };
                setItems((prev) => [newItem, ...prev]);
                setCreateOpen(false);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assignment Title
                  </label>
                  <input
                    name="title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Enter assignment title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course
                  </label>
                  <select
                    name="course"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  >
                    <option value="">Select a course</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Describe the assignment"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    name="type"
                    defaultValue={createPreset?.type}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  >
                    <option value="individual">Individual</option>
                    <option value="group">Group</option>
                    <option value="project">Project</option>
                    <option value="essay">Essay</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="graded">Graded</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weight (%)
                  </label>
                  <input
                    name="weight"
                    type="number"
                    min={0}
                    max={100}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="20"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setCreateOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  Create Assignment
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={!!editItem} onOpenChange={(v) => !v && setEditItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Assignment</DialogTitle>
              <DialogDescription>Update assignment details.</DialogDescription>
            </DialogHeader>
            {editItem && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget as HTMLFormElement);
                  const title = String(fd.get("title") || editItem.title);
                  const description = String(
                    fd.get("description") || editItem.description
                  );
                  const status = String(fd.get("status") || editItem.status);
                  const weightPercent = Number(
                    fd.get("weight") || editItem.weightPercent
                  );
                  setItems((prev) =>
                    prev.map((aa) =>
                      aa.id === editItem.id
                        ? {
                            ...aa,
                            title,
                            description,
                            status: status as AssignmentItem["status"],
                            weightPercent,
                          }
                        : aa
                    )
                  );
                  setEditItem(null);
                }}
                className="space-y-4"
              >
                <input
                  name="title"
                  defaultValue={editItem.title}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <textarea
                  name="description"
                  defaultValue={editItem.description}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <div className="grid grid-cols-2 gap-4">
                  <select
                    name="status"
                    defaultValue={editItem.status}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="graded">Graded</option>
                  </select>
                  <input
                    name="weight"
                    type="number"
                    defaultValue={editItem.weightPercent}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setEditItem(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    Save
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>

        <Dialog
          open={!!previewItem}
          onOpenChange={(v) => !v && setPreviewItem(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Preview Assignment</DialogTitle>
              <DialogDescription>Quick overview.</DialogDescription>
            </DialogHeader>
            {previewItem && (
              <div className="space-y-2">
                <div className="font-semibold">{previewItem.title}</div>
                <div className="text-sm text-gray-600">
                  {previewItem.course}
                </div>
                <div className="text-sm">Type: {previewItem.type}</div>
                <div className="text-sm">
                  Weight: {previewItem.weightPercent}%
                </div>
                <div className="text-sm">Status: {previewItem.status}</div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Dialog
          open={!!analyticsItem}
          onOpenChange={(v) => !v && setAnalyticsItem(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assignment Analytics</DialogTitle>
              <DialogDescription>Performance summary.</DialogDescription>
            </DialogHeader>
            {analyticsItem && (
              <div className="space-y-2 text-sm">
                <div>Avg. Score: {analyticsItem.progressScore}%</div>
                <div>Completed: {analyticsItem.completedCount}</div>
                <div>Attempts: {analyticsItem.attempts}</div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <AlertDialog
          open={!!deleteId}
          onOpenChange={(v) => !v && setDeleteId(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete assignment?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setItems((prev) => prev.filter((a) => a.id !== deleteId));
                  setDeleteId(null);
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="bg-card rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8 mt-8">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-secondary">
              Recent Assignment Submissions
            </h3>
            <p className="text-gray-600 text-sm">
              Latest student submissions and grades
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assignment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                        alt=""
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          Sarah Johnson
                        </div>
                        <div className="text-sm text-gray-500">
                          sarah.j@example.com
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      Portfolio Website Project
                    </div>
                    <div className="text-sm text-gray-500">Web Development</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2 hours ago
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Pending Review
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    -
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary hover:text-primary/80 mr-3">
                      Grade
                    </button>
                    <button className="text-gray-600 hover:text-primary">
                      Download
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                        alt=""
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          Michael Chen
                        </div>
                        <div className="text-sm text-gray-500">
                          michael.c@example.com
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      Data Analysis Report
                    </div>
                    <div className="text-sm text-gray-500">Data Science</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    5 hours ago
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Graded
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    85%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary hover:text-primary/80 mr-3">
                      View
                    </button>
                    <button className="text-gray-600 hover:text-primary">
                      Download
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg"
                        alt=""
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          Emma Wilson
                        </div>
                        <div className="text-sm text-gray-500">
                          emma.w@example.com
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      UI Design Case Study
                    </div>
                    <div className="text-sm text-gray-500">UI/UX Design</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    1 day ago
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Pending Review
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    -
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary hover:text-primary/80 mr-3">
                      Grade
                    </button>
                    <button className="text-gray-600 hover:text-primary">
                      Download
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <button className="text-primary hover:text-primary/80 text-sm font-medium flex items-center">
              <ClipboardList className="w-4 h-4 mr-2" /> View All Submissions
            </button>
          </div>
        </div>

        {/* Grading Progress Section */}
        <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-secondary mb-4">
            Grading Progress
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary mb-2">23</div>
              <div className="text-sm text-gray-600">Pending Grading</div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: "35%" }}
                />
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary mb-2">42</div>
              <div className="text-sm text-gray-600">In Progress</div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: "65%" }}
                />
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary mb-2">89</div>
              <div className="text-sm text-gray-600">Completed</div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-accent h-2 rounded-full"
                  style={{ width: "85%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
