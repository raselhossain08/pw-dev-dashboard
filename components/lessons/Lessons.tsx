"use client";

import * as React from "react";
import {
  PlayCircle,
  FileText,
  GripVertical,
  Eye,
  Clock,
  EllipsisVertical,
  ArrowUp,
  CheckCircle,
  ChartLine,
  Filter,
  Download,
  Plus,
  Pencil,
  Layers,
  Trash,
  CircleHelp,
  ListTodo,
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

type LessonItem = {
  id: string;
  position: number;
  title: string;
  course: string;
  module: string;
  type: "video" | "text" | "quiz" | "assignment";
  duration: string;
  views: number;
  status: "published" | "draft";
  completion: number;
  thumbnail?: string;
  allowDownloads?: boolean;
  hasVideo?: boolean;
  videoName?: string;
};

const initialLessons: LessonItem[] = [
  {
    id: "l1",
    position: 1,
    title: "Introduction to HTML",
    course: "Web Development",
    module: "HTML & CSS Fundamentals",
    type: "video",
    duration: "15m",
    views: 1247,
    status: "published",
    completion: 78,
    thumbnail:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "l2",
    position: 2,
    title: "CSS Styling Basics",
    course: "Web Development",
    module: "HTML & CSS Fundamentals",
    type: "video",
    duration: "22m",
    views: 1089,
    status: "published",
    completion: 85,
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "l3",
    position: 3,
    title: "HTML Semantic Elements",
    course: "Web Development",
    module: "HTML & CSS Fundamentals",
    type: "text",
    duration: "12m",
    views: 956,
    status: "draft",
    completion: 0,
  },
];

export default function Lessons() {
  const [lessons, setLessons] = React.useState<LessonItem[]>(initialLessons);
  const [search, setSearch] = React.useState("");
  const [courseFilter, setCourseFilter] = React.useState<string>("All Courses");
  const [moduleFilter, setModuleFilter] = React.useState<string>("All Modules");
  const [typeFilter, setTypeFilter] = React.useState<string>("All Types");
  const [sortBy, setSortBy] = React.useState<string>("Position");
  const [createOpen, setCreateOpen] = React.useState(false);
  const [editLesson, setEditLesson] = React.useState<LessonItem | null>(null);
  const [previewLesson, setPreviewLesson] = React.useState<LessonItem | null>(
    null
  );
  const [analyticsLesson, setAnalyticsLesson] =
    React.useState<LessonItem | null>(null);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const [draggedId, setDraggedId] = React.useState<string | null>(null);
  const [dragOverId, setDragOverId] = React.useState<string | null>(null);
  const [createPreset, setCreatePreset] = React.useState<{
    type?: LessonItem["type"];
  } | null>(null);
  const searchRef = React.useRef<HTMLInputElement>(null);

  const filtered = lessons
    .filter((l) =>
      search
        ? l.title.toLowerCase().includes(search.toLowerCase()) ||
          l.module.toLowerCase().includes(search.toLowerCase())
        : true
    )
    .filter((l) =>
      courseFilter === "All Courses" ? true : l.course === courseFilter
    )
    .filter((l) =>
      moduleFilter === "All Modules" ? true : l.module === moduleFilter
    )
    .filter((l) =>
      typeFilter === "All Types" ? true : l.type === typeFilter.toLowerCase()
    )
    .sort((a, b) => {
      if (sortBy === "Position") return a.position - b.position;
      if (sortBy === "Newest") return b.id.localeCompare(a.id);
      if (sortBy === "Duration")
        return parseInt(b.duration) - parseInt(a.duration);
      if (sortBy === "Completion") return b.completion - a.completion;
      return 0;
    });

  function onDrop(targetId: string) {
    if (!draggedId || draggedId === targetId) return;
    const order = [...lessons];
    const from = order.findIndex((l) => l.id === draggedId);
    const to = order.findIndex((l) => l.id === targetId);
    const [moved] = order.splice(from, 1);
    order.splice(to, 0, moved);
    order.forEach((l, i) => (l.position = i + 1));
    setLessons(order);
  }

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
                Lessons
              </h2>
              <p className="text-gray-600">
                Manage and organize your lesson content
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="ghost" className="text-gray-600">
                <Download className="w-4 h-4 mr-2" /> Bulk Actions
              </Button>
              <Button
                onClick={() => setCreateOpen(true)}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" /> Create Lesson
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search lessons... (Cmd+K)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              ref={searchRef}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <PlayCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Total Lessons
                </p>
                <p className="text-2xl font-bold text-secondary mt-1">
                  {lessons.length}
                </p>
                <p className="text-accent text-sm mt-1">
                  <ArrowUp className="inline w-3 h-3" /> +12% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <PlayCircle className="text-primary w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Video Lessons
                </p>
                <p className="text-2xl font-bold text-secondary mt-1">
                  {lessons.filter((l) => l.type === "video").length}
                </p>
                <p className="text-accent text-sm mt-1">
                  <CheckCircle className="inline w-3 h-3" /> good ratio
                </p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <PlayCircle className="text-accent w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Avg. Duration
                </p>
                <p className="text-2xl font-bold text-secondary mt-1">
                  {Math.round(
                    lessons.reduce((sum, l) => sum + parseInt(l.duration), 0) /
                      Math.max(1, lessons.length)
                  )}
                  m
                </p>
                <p className="text-accent text-sm mt-1">
                  <Clock className="inline w-3 h-3" /> optimal length
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="text-yellow-600 w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Completion Rate
                </p>
                <p className="text-2xl font-bold text-secondary mt-1">
                  {Math.round(
                    lessons.reduce((sum, l) => sum + l.completion, 0) /
                      Math.max(1, lessons.length)
                  )}
                  %
                </p>
                <p className="text-accent text-sm mt-1">
                  <ArrowUp className="inline w-3 h-3" /> +8% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <ChartLine className="text-purple-600 w-6 h-6" />
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
              <Select value={moduleFilter} onValueChange={setModuleFilter}>
                <SelectTrigger className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm w-60">
                  <SelectValue placeholder="All Modules" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Modules">All Modules</SelectItem>
                  <SelectItem value="HTML & CSS Fundamentals">
                    HTML & CSS Fundamentals
                  </SelectItem>
                  <SelectItem value="JavaScript Basics">
                    JavaScript Basics
                  </SelectItem>
                  <SelectItem value="React Framework">
                    React Framework
                  </SelectItem>
                  <SelectItem value="Node.js Backend">
                    Node.js Backend
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm w-40">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Types">All Types</SelectItem>
                  <SelectItem value="Video">Video</SelectItem>
                  <SelectItem value="Text">Text</SelectItem>
                  <SelectItem value="Quiz">Quiz</SelectItem>
                  <SelectItem value="Assignment">Assignment</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm w-56">
                  <SelectValue placeholder="Sort by: Position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Position">Sort by: Position</SelectItem>
                  <SelectItem value="Newest">Sort by: Newest</SelectItem>
                  <SelectItem value="Duration">Sort by: Duration</SelectItem>
                  <SelectItem value="Completion">
                    Sort by: Completion
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-primary"
              >
                <Filter className="w-5 h-5" />
              </Button>
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

        <div className="bg-card rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-secondary">
              Web Development Course Lessons
            </h3>
            <p className="text-gray-600 text-sm">
              HTML & CSS Fundamentals Module
            </p>
          </div>

          {filtered.map((l) => (
            <div
              key={l.id}
              className={`lesson-item border-b border-gray-100 last:border-b-0 ${
                dragOverId === l.id
                  ? "bg-primary/5 border-2 border-dashed border-primary"
                  : ""
              }`}
              draggable
              onDragStart={() => setDraggedId(l.id)}
              onDragEnd={() => {
                setDraggedId(null);
                setDragOverId(null);
              }}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={() => setDragOverId(l.id)}
              onDragLeave={() => setDragOverId(null)}
              onDrop={() => {
                setDragOverId(null);
                onDrop(l.id);
              }}
            >
              <div className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:text-primary"
                      >
                        <GripVertical className="w-4 h-4" />
                      </Button>
                      <span className="text-sm font-medium w-6 text-center">
                        {l.position}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      {l.type === "video" ? (
                        <div className="relative w-20 h-12 bg-gray-200 rounded-lg overflow-hidden">
                          <img
                            src={l.thumbnail}
                            alt="Lesson thumbnail"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <PlayCircle className="text-white w-4 h-4" />
                          </div>
                          <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                            {l.duration}
                          </span>
                        </div>
                      ) : l.type === "text" ? (
                        <div className="w-20 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <FileText className="text-gray-400 w-5 h-5" />
                        </div>
                      ) : l.type === "quiz" ? (
                        <div className="w-20 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                          <CircleHelp className="text-blue-600 w-5 h-5" />
                        </div>
                      ) : (
                        <div className="w-20 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                          <ListTodo className="text-yellow-600 w-5 h-5" />
                        </div>
                      )}

                      <div>
                        <h4 className="font-medium text-secondary">
                          {l.title}
                        </h4>
                        <p className="text-sm text-gray-600">{l.module}</p>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                          <span className="flex items-center">
                            {l.type === "text" ? (
                              <FileText className="w-3 h-3 mr-1" />
                            ) : l.type === "quiz" ? (
                              <CircleHelp className="w-3 h-3 mr-1" />
                            ) : l.type === "assignment" ? (
                              <ListTodo className="w-3 h-3 mr-1" />
                            ) : (
                              <PlayCircle className="w-3 h-3 mr-1" />
                            )}
                            {l.type[0].toUpperCase() + l.type.slice(1)}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" /> {l.duration}
                          </span>
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" /> {l.views} views
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          l.status === "published"
                            ? "bg-accent/10 text-accent"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {l.status === "published" ? "Published" : "Draft"}
                      </span>
                      <div className="w-20">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>{l.completion}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`${
                              l.status === "published"
                                ? "bg-accent"
                                : "bg-gray-300"
                            } h-1.5 rounded-full`}
                            style={{ width: `${l.completion}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-primary"
                        >
                          <EllipsisVertical className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onSelect={() => setEditLesson(l)}>
                          <Pencil className="w-4 h-4 mr-2" /> Edit Lesson
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => {
                            const copy: LessonItem = {
                              ...l,
                              id: `l${Date.now()}`,
                            };
                            setLessons((prev) => [copy, ...prev]);
                          }}
                        >
                          <Layers className="w-4 h-4 mr-2" /> Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setPreviewLesson(l)}>
                          <Eye className="w-4 h-4 mr-2" /> Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => setAnalyticsLesson(l)}
                        >
                          <ChartLine className="w-4 h-4 mr-2" /> Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onSelect={() => setDeleteId(l.id)}
                        >
                          <Trash className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
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
                setCreatePreset({ type: "video" });
                setCreateOpen(true);
              }}
            >
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <PlayCircle className="text-white w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-medium text-secondary">Upload Video</p>
                <p className="text-sm text-gray-600">Add video content</p>
              </div>
            </Button>
            <Button
              className="flex items-center space-x-3 p-4 bg-accent/5 hover:bg-accent/10 rounded-lg"
              onClick={() => {
                setCreatePreset({ type: "text" });
                setCreateOpen(true);
              }}
            >
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <FileText className="text-white w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-medium text-secondary">Create Text Lesson</p>
                <p className="text-sm text-gray-600">Add written content</p>
              </div>
            </Button>
            <Button
              className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg"
              onClick={() => {
                setCreatePreset({ type: "quiz" });
                setCreateOpen(true);
              }}
            >
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <CircleHelp className="text-white w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-medium text-secondary">Add Quiz</p>
                <p className="text-sm text-gray-600">Create assessment</p>
              </div>
            </Button>
            <Button
              className="flex items-center space-x-3 p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg"
              onClick={() => {
                setCreatePreset({ type: "assignment" });
                setCreateOpen(true);
              }}
            >
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <ListTodo className="text-white w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-medium text-secondary">Create Assignment</p>
                <p className="text-sm text-gray-600">Add practical task</p>
              </div>
            </Button>
          </div>
        </div>

        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Lesson</DialogTitle>
              <DialogDescription>
                Add details for your lesson.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const fd = new FormData(form);
                const title = String(fd.get("title") || "");
                const course = String(fd.get("course") || "");
                const moduleName = String(fd.get("module") || "");
                const type = String(fd.get("type") || "video");
                const duration = String(fd.get("duration") || "0m");
                const status = String(fd.get("status") || "draft");
                const allowDownloads = Boolean(fd.get("allowDownloads"));
                const videoFile = fd.get("videoFile");
                const videoName =
                  typeof videoFile === "object" &&
                  videoFile &&
                  "name" in videoFile
                    ? (videoFile as File).name
                    : "";
                const newItem: LessonItem = {
                  id: `l${Date.now()}`,
                  position: lessons.length + 1,
                  title,
                  course,
                  module: moduleName,
                  type: (
                    type as LessonItem["type"]
                  ).toLowerCase() as LessonItem["type"],
                  duration,
                  views: 0,
                  status: status === "published" ? "published" : "draft",
                  completion: 0,
                  allowDownloads,
                  hasVideo: !!videoName,
                  videoName,
                };
                setLessons((prev) => [newItem, ...prev]);
                setCreateOpen(false);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lesson Title
                  </label>
                  <input
                    name="title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Enter lesson title"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Module
                  </label>
                  <select
                    name="module"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  >
                    <option value="">Select a module</option>
                    <option value="HTML & CSS Fundamentals">
                      HTML & CSS Fundamentals
                    </option>
                    <option value="JavaScript Basics">JavaScript Basics</option>
                    <option value="React Framework">React Framework</option>
                    <option value="Node.js Backend">Node.js Backend</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lesson Type
                  </label>
                  <select
                    name="type"
                    defaultValue={createPreset?.type}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  >
                    <option value="video">Video</option>
                    <option value="text">Text</option>
                    <option value="quiz">Quiz</option>
                    <option value="assignment">Assignment</option>
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
                  placeholder="Describe lesson content"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video Upload
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/80">
                        <span>Upload a video</span>
                        <input
                          name="videoFile"
                          type="file"
                          className="sr-only"
                          accept="video/*"
                        />
                      </label>
                      <span className="pl-1">or drag and drop</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      MP4, MOV up to 500MB
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <input
                    name="duration"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g., 15m"
                  />
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
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center">
                <input
                  name="allowDownloads"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Allow downloading of resources
                </label>
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
                  Create Lesson
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog
          open={!!editLesson}
          onOpenChange={(v) => !v && setEditLesson(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Lesson</DialogTitle>
              <DialogDescription>Update lesson details.</DialogDescription>
            </DialogHeader>
            {editLesson && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget as HTMLFormElement);
                  const title = String(fd.get("title") || editLesson.title);
                  const moduleName = String(
                    fd.get("module") || editLesson.module
                  );
                  const duration = String(
                    fd.get("duration") || editLesson.duration
                  );
                  const status = String(fd.get("status") || editLesson.status);
                  setLessons((prev) =>
                    prev.map((ll) =>
                      ll.id === editLesson.id
                        ? {
                            ...ll,
                            title,
                            module: moduleName,
                            duration,
                            status:
                              status === "published" ? "published" : "draft",
                          }
                        : ll
                    )
                  );
                  setEditLesson(null);
                }}
                className="space-y-4"
              >
                <input
                  name="title"
                  defaultValue={editLesson.title}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <input
                  name="module"
                  defaultValue={editLesson.module}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="duration"
                    defaultValue={editLesson.duration}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                  <select
                    name="status"
                    defaultValue={editLesson.status}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setEditLesson(null)}
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
          open={!!previewLesson}
          onOpenChange={(v) => !v && setPreviewLesson(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Preview Lesson</DialogTitle>
              <DialogDescription>
                Quick overview of the lesson.
              </DialogDescription>
            </DialogHeader>
            {previewLesson && (
              <div className="space-y-2">
                <div className="font-semibold">{previewLesson.title}</div>
                <div className="text-sm text-gray-600">
                  {previewLesson.module}
                </div>
                <div className="text-sm">Type: {previewLesson.type}</div>
                <div className="text-sm">
                  Duration: {previewLesson.duration}
                </div>
                <div className="text-sm">Status: {previewLesson.status}</div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Dialog
          open={!!analyticsLesson}
          onOpenChange={(v) => !v && setAnalyticsLesson(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Lesson Analytics</DialogTitle>
              <DialogDescription>
                Summary of performance metrics.
              </DialogDescription>
            </DialogHeader>
            {analyticsLesson && (
              <div className="space-y-2 text-sm">
                <div>Views: {analyticsLesson.views}</div>
                <div>Completion: {analyticsLesson.completion}%</div>
                <div>Duration: {analyticsLesson.duration}</div>
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
              <AlertDialogTitle>Delete lesson?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setLessons((prev) => prev.filter((l) => l.id !== deleteId));
                  setDeleteId(null);
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </main>
  );
}
