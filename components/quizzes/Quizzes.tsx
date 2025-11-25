"use client";

import * as React from "react";
import {
  FileQuestion,
  ClipboardList,
  BarChart3,
  Download,
  EllipsisVertical,
  ArrowUp,
  Flag,
  Search,
  Clock,
  Eye,
  ChartLine,
  Pencil,
  Layers,
  Trash,
  Code,
  Database,
  Paintbrush,
  Grid2x2,
  List,
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

type QuizItem = {
  id: string;
  title: string;
  description: string;
  course: string;
  type: "quiz" | "exam" | "practice" | "assignment";
  status: "active" | "draft" | "completed" | "scheduled";
  difficulty: "easy" | "medium" | "hard";
  questions: number;
  averageScore: number;
  attempts: number;
  scheduleText?: string;
  timeText?: string;
  iconVariant?: "code" | "database" | "paint";
};

const initialQuizzes: QuizItem[] = [
  {
    id: "q1",
    title: "HTML & CSS Fundamentals Quiz",
    description:
      "Test your knowledge of HTML structure and CSS styling fundamentals.",
    course: "Web Development",
    type: "quiz",
    status: "active",
    difficulty: "medium",
    questions: 15,
    averageScore: 78,
    attempts: 342,
    scheduleText: "Due: Oct 15",
    timeText: "30 min",
    iconVariant: "code",
  },
  {
    id: "q2",
    title: "Data Analysis Final Exam",
    description:
      "Comprehensive exam covering Pandas, NumPy, and data visualization techniques.",
    course: "Data Science",
    type: "exam",
    status: "scheduled",
    difficulty: "hard",
    questions: 45,
    averageScore: 65,
    attempts: 128,
    scheduleText: "Starts: Nov 1",
    timeText: "2 hours",
    iconVariant: "database",
  },
  {
    id: "q3",
    title: "UI Design Principles Quiz",
    description:
      "Test your understanding of color theory, typography, and layout principles.",
    course: "UI/UX Design",
    type: "quiz",
    status: "active",
    difficulty: "medium",
    questions: 20,
    averageScore: 82,
    attempts: 215,
    scheduleText: "Due: Oct 22",
    timeText: "45 min",
    iconVariant: "paint",
  },
];

export default function Quizzes() {
  const [items, setItems] = React.useState<QuizItem[]>(initialQuizzes);
  const [search, setSearch] = React.useState("");
  const [courseFilter, setCourseFilter] = React.useState<string>("All Courses");
  const [typeFilter, setTypeFilter] = React.useState<string>("All Types");
  const [statusFilter, setStatusFilter] = React.useState<string>("All Status");
  const [sortBy, setSortBy] = React.useState<string>("Newest");
  const [createOpen, setCreateOpen] = React.useState(false);
  const [editItem, setEditItem] = React.useState<QuizItem | null>(null);
  const [previewItem, setPreviewItem] = React.useState<QuizItem | null>(null);
  const [analyticsItem, setAnalyticsItem] = React.useState<QuizItem | null>(
    null
  );
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const [createPreset, setCreatePreset] = React.useState<{
    type?: QuizItem["type"];
  } | null>(null);
  const searchRef = React.useRef<HTMLInputElement>(null);

  const filtered = items
    .filter((q) =>
      search
        ? q.title.toLowerCase().includes(search.toLowerCase()) ||
          q.description.toLowerCase().includes(search.toLowerCase())
        : true
    )
    .filter((q) =>
      courseFilter === "All Courses" ? true : q.course === courseFilter
    )
    .filter((q) =>
      typeFilter === "All Types" ? true : q.type === typeFilter.toLowerCase()
    )
    .filter((q) =>
      statusFilter === "All Status"
        ? true
        : q.status === statusFilter.toLowerCase()
    )
    .sort((a, b) => {
      if (sortBy === "Newest") return b.id.localeCompare(a.id);
      if (sortBy === "Attempts") return b.attempts - a.attempts;
      if (sortBy === "Score") return b.averageScore - a.averageScore;
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
                Quiz & Exams
              </h2>
              <p className="text-gray-600">
                Create and manage assessments, quizzes, and exams
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="ghost" className="text-gray-600">
                <Download className="w-4 h-4 mr-2" /> Export Results
              </Button>
              <Button
                onClick={() => setCreateOpen(true)}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <FileQuestion className="w-4 h-4 mr-2" /> Create Quiz
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search quizzes... (Cmd+K)"
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
                  Total Quizzes
                </p>
                <p className="text-2xl font-bold text-secondary mt-1">
                  {items.length}
                </p>
                <p className="text-accent text-sm mt-1">
                  <ArrowUp className="inline w-3 h-3" /> +12% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileQuestion className="text-primary w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Active Attempts
                </p>
                <p className="text-2xl font-bold text-secondary mt-1">
                  {items
                    .filter((i) => i.status === "active")
                    .reduce((sum, i) => sum + i.attempts, 0)}
                </p>
                <p className="text-accent text-sm mt-1">
                  <ArrowUp className="inline w-3 h-3" /> students active
                </p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Clock className="text-accent w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Avg. Score</p>
                <p className="text-2xl font-bold text-secondary mt-1">
                  {Math.round(
                    items.reduce((sum, i) => sum + i.averageScore, 0) /
                      Math.max(1, items.length)
                  )}
                  %
                </p>
                <p className="text-accent text-sm mt-1">
                  <BarChart3 className="inline w-3 h-3" /> trending up
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-yellow-600 w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Completion Rate
                </p>
                <p className="text-2xl font-bold text-secondary mt-1">89%</p>
                <p className="text-accent text-sm mt-1">
                  <ArrowUp className="inline w-3 h-3" /> +8% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Flag className="text-purple-600 w-6 h-6" />
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
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm w-40">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Types">All Types</SelectItem>
                  <SelectItem value="Quiz">Quiz</SelectItem>
                  <SelectItem value="Exam">Exam</SelectItem>
                  <SelectItem value="Practice">Practice Test</SelectItem>
                  <SelectItem value="Assignment">Assignment</SelectItem>
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
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm w-56">
                  <SelectValue placeholder="Sort by: Newest" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Newest">Sort by: Newest</SelectItem>
                  <SelectItem value="Attempts">Sort by: Attempts</SelectItem>
                  <SelectItem value="Score">Sort by: Score</SelectItem>
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
                <BarChart3 className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-primary"
              >
                <Download className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-primary"
              >
                <Grid2x2 className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-primary"
              >
                <List className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filtered.map((q) => (
            <div
              key={q.id}
              className="quiz-card bg-card rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      q.iconVariant === "code"
                        ? "bg-primary/10"
                        : q.iconVariant === "database"
                        ? "bg-blue-100"
                        : q.iconVariant === "paint"
                        ? "bg-purple-100"
                        : "bg-primary/10"
                    }`}
                  >
                    {q.iconVariant === "code" ? (
                      <Code className="text-primary" />
                    ) : q.iconVariant === "database" ? (
                      <Database className="text-blue-600" />
                    ) : q.iconVariant === "paint" ? (
                      <Paintbrush className="text-purple-600" />
                    ) : (
                      <FileQuestion className="text-primary" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary">{q.title}</h3>
                    <p className="text-sm text-gray-500">{q.course} Course</p>
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
                    <DropdownMenuItem onSelect={() => setEditItem(q)}>
                      <Pencil className="w-4 h-4 mr-2" /> Edit Quiz
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => {
                        const copy: QuizItem = { ...q, id: `q${Date.now()}` };
                        setItems((prev) => [copy, ...prev]);
                      }}
                    >
                      <Layers className="w-4 h-4 mr-2" /> Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setPreviewItem(q)}>
                      <Eye className="w-4 h-4 mr-2" /> Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setAnalyticsItem(q)}>
                      <ChartLine className="w-4 h-4 mr-2" /> Analytics
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onSelect={() => setDeleteId(q.id)}
                    >
                      <Trash className="w-4 h-4 mr-2" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <p className="text-gray-600 text-sm mb-4">{q.description}</p>

              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <FileQuestion className="w-3 h-3 mr-1" /> {q.questions}{" "}
                    Questions
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" /> {q.timeText}
                  </span>
                  <span className="flex items-center">
                    <Eye className="w-3 h-3 mr-1" /> {q.attempts} Attempts
                  </span>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    q.status === "active"
                      ? "bg-accent/10 text-accent"
                      : q.status === "scheduled"
                      ? "bg-yellow-100 text-yellow-800"
                      : q.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {q.status[0].toUpperCase() + q.status.slice(1)}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Average Score</span>
                  <span>{q.averageScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${
                      q.status === "active"
                        ? "bg-accent"
                        : q.status === "scheduled"
                        ? "bg-yellow-500"
                        : "bg-gray-400"
                    } h-2 rounded-full`}
                    style={{ width: `${q.averageScore}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <span
                    className={`${
                      q.difficulty === "easy"
                        ? "bg-green-500"
                        : q.difficulty === "medium"
                        ? "bg-yellow-500"
                        : "bg-red-600"
                    } text-white text-xs font-medium px-2 py-1 rounded-full`}
                  >
                    {q.difficulty[0].toUpperCase() + q.difficulty.slice(1)}
                  </span>
                  <span>{q.attempts} Attempts</span>
                </div>
                <div className="text-primary font-medium">
                  {q.scheduleText || ""}
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
                setCreatePreset({ type: "quiz" });
                setCreateOpen(true);
              }}
            >
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <FileQuestion className="text-white w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-medium text-secondary">Create Quiz</p>
                <p className="text-sm text-gray-600">Start a new assessment</p>
              </div>
            </Button>
            <Button className="flex items-center space-x-3 p-4 bg-accent/5 hover:bg-accent/10 rounded-lg">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <ClipboardList className="text-white w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-medium text-secondary">Manage Questions</p>
                <p className="text-sm text-gray-600">Configure question bank</p>
              </div>
            </Button>
            <Button className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-white w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-medium text-secondary">View Analytics</p>
                <p className="text-sm text-gray-600">Performance insights</p>
              </div>
            </Button>
            <Button className="flex items-center space-x-3 p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Download className="text-white w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-medium text-secondary">Export Results</p>
                <p className="text-sm text-gray-600">Download reports</p>
              </div>
            </Button>
          </div>
        </div>

        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Quiz</DialogTitle>
              <DialogDescription>
                Configure your assessment details.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget as HTMLFormElement);
                const title = String(fd.get("title") || "");
                const description = String(fd.get("description") || "");
                const course = String(fd.get("course") || "");
                const type = String(fd.get("type") || "quiz");
                const status = String(fd.get("status") || "draft");
                const difficulty = String(
                  fd.get("difficulty") || "medium"
                ).toLowerCase() as QuizItem["difficulty"];
                const questions = Number(fd.get("questions") || 1);
                const averageScore = Number(fd.get("passing") || 0);
                const newItem: QuizItem = {
                  id: `q${Date.now()}`,
                  title,
                  description,
                  course,
                  type: type.toLowerCase() as QuizItem["type"],
                  status: status.toLowerCase() as QuizItem["status"],
                  difficulty,
                  questions,
                  averageScore,
                  attempts: 0,
                  scheduleText: "",
                };
                setItems((prev) => [newItem, ...prev]);
                setCreateOpen(false);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quiz Title
                  </label>
                  <input
                    name="title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Enter quiz title"
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
                  placeholder="Describe the assessment"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time Limit (mins)
                  </label>
                  <input
                    name="time"
                    type="number"
                    min={1}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Questions
                  </label>
                  <input
                    name="questions"
                    type="number"
                    min={1}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Passing Score (%)
                  </label>
                  <input
                    name="passing"
                    type="number"
                    min={0}
                    max={100}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="70"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quiz Type
                  </label>
                  <select
                    name="type"
                    defaultValue={createPreset?.type}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  >
                    <option value="quiz">Quiz</option>
                    <option value="exam">Exam</option>
                    <option value="practice">Practice Test</option>
                    <option value="assignment">Assignment</option>
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
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <select
                  name="difficulty"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
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
                  Create Quiz
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={!!editItem} onOpenChange={(v) => !v && setEditItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Quiz</DialogTitle>
              <DialogDescription>Update assessment details.</DialogDescription>
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
                  const averageScore = Number(
                    fd.get("averageScore") || editItem.averageScore
                  );
                  setItems((prev) =>
                    prev.map((qq) =>
                      qq.id === editItem.id
                        ? {
                            ...qq,
                            title,
                            description,
                            status: status as QuizItem["status"],
                            averageScore,
                          }
                        : qq
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
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                  </select>
                  <input
                    name="averageScore"
                    type="number"
                    defaultValue={editItem.averageScore}
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
              <DialogTitle>Preview Assessment</DialogTitle>
              <DialogDescription>
                Quick overview of the assessment.
              </DialogDescription>
            </DialogHeader>
            {previewItem && (
              <div className="space-y-2">
                <div className="font-semibold">{previewItem.title}</div>
                <div className="text-sm text-gray-600">
                  {previewItem.course}
                </div>
                <div className="text-sm">Type: {previewItem.type}</div>
                <div className="text-sm">
                  Questions: {previewItem.questions}
                </div>
                <div className="text-sm">
                  Average Score: {previewItem.averageScore}%
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
              <DialogTitle>Assessment Analytics</DialogTitle>
              <DialogDescription>
                Summary of performance metrics.
              </DialogDescription>
            </DialogHeader>
            {analyticsItem && (
              <div className="space-y-2 text-sm">
                <div>Attempts: {analyticsItem.attempts}</div>
                <div>Average Score: {analyticsItem.averageScore}%</div>
                <div>Questions: {analyticsItem.questions}</div>
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
              <AlertDialogTitle>Delete assessment?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setItems((prev) => prev.filter((q) => q.id !== deleteId));
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
              Recent Quiz Results
            </h3>
            <p className="text-gray-600 text-sm">
              Latest student submissions and scores
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
                    Quiz
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time Spent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
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
                      HTML & CSS Fundamentals Quiz
                    </div>
                    <div className="text-sm text-gray-500">Web Development</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">85%</div>
                    <div className="text-sm text-gray-500">17/20 correct</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    24m 32s
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Oct 12, 2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary hover:text-primary/80 mr-3">
                      Review
                    </button>
                    <button className="text-gray-600 hover:text-primary">
                      Details
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
                      UI Design Principles Quiz
                    </div>
                    <div className="text-sm text-gray-500">UI/UX Design</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">78%</div>
                    <div className="text-sm text-gray-500">15/20 correct</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    38m 15s
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Oct 11, 2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary hover:text-primary/80 mr-3">
                      Review
                    </button>
                    <button className="text-gray-600 hover:text-primary">
                      Details
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
