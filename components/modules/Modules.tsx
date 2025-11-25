"use client";

import * as React from "react";
import {
  Layers,
  PlayCircle,
  Clock,
  EllipsisVertical,
  ArrowUp,
  CheckCircle,
  ChartLine,
  Paintbrush,
  Database,
  Share2,
  Pencil,
  Download,
  Filter,
  Plus,
  Eye,
  Trash,
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

type ModuleItem = {
  id: string;
  title: string;
  course: string;
  lessons: number;
  duration: string;
  status: "published" | "draft";
  completion: number;
  icon: React.ReactNode;
  accentClass: string;
  badgeClass: string;
};

const initialModules: ModuleItem[] = [
  {
    id: "m1",
    title: "HTML & CSS Fundamentals",
    course: "Web Development",
    lessons: 8,
    duration: "2h 15m",
    status: "published",
    completion: 85,
    icon: <Layers className="text-primary" />,
    accentClass: "bg-primary/10",
    badgeClass: "bg-accent/10 text-accent",
  },
  {
    id: "m2",
    title: "Data Analysis with Python",
    course: "Data Science",
    lessons: 12,
    duration: "4h 30m",
    status: "draft",
    completion: 72,
    icon: <Database className="text-blue-600" />,
    accentClass: "bg-blue-100",
    badgeClass: "bg-yellow-100 text-yellow-800",
  },
  {
    id: "m3",
    title: "UI Design Principles",
    course: "UI/UX Design",
    lessons: 10,
    duration: "3h 45m",
    status: "published",
    completion: 91,
    icon: <Paintbrush className="text-purple-600" />,
    accentClass: "bg-purple-100",
    badgeClass: "bg-accent/10 text-accent",
  },
];

export default function Modules() {
  const [modules, setModules] = React.useState<ModuleItem[]>(initialModules);
  const [search, setSearch] = React.useState("");
  const [courseFilter, setCourseFilter] = React.useState<string>("All Courses");
  const [statusFilter, setStatusFilter] = React.useState<string>("All Status");
  const [sortBy, setSortBy] = React.useState<string>("Newest");
  const [createOpen, setCreateOpen] = React.useState(false);
  const [editModule, setEditModule] = React.useState<ModuleItem | null>(null);
  const [previewModule, setPreviewModule] = React.useState<ModuleItem | null>(
    null
  );
  const [analyticsModule, setAnalyticsModule] =
    React.useState<ModuleItem | null>(null);
  const [shareModule, setShareModule] = React.useState<ModuleItem | null>(null);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  const filtered = modules
    .filter((m) =>
      search
        ? m.title.toLowerCase().includes(search.toLowerCase()) ||
          m.course.toLowerCase().includes(search.toLowerCase())
        : true
    )
    .filter((m) =>
      courseFilter === "All Courses" ? true : m.course === courseFilter
    )
    .filter((m) =>
      statusFilter === "All Status"
        ? true
        : statusFilter === "Published"
        ? m.status === "published"
        : m.status === "draft"
    )
    .sort((a, b) => {
      if (sortBy === "Newest") return b.id.localeCompare(a.id);
      if (sortBy === "Oldest") return a.id.localeCompare(b.id);
      if (sortBy === "Name") return a.title.localeCompare(b.title);
      if (sortBy === "Lessons Count") return b.lessons - a.lessons;
      return 0;
    });

  const [draggedId, setDraggedId] = React.useState<string | null>(null);

  function onDrop(targetId: string) {
    if (!draggedId || draggedId === targetId) return;
    const order = [...modules];
    const from = order.findIndex((m) => m.id === draggedId);
    const to = order.findIndex((m) => m.id === targetId);
    const [moved] = order.splice(from, 1);
    order.splice(to, 0, moved);
    setModules(order);
  }

  return (
    <main className="">
      <div className="p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-2">
                Modules
              </h2>
              <p className="text-gray-600">
                Manage and organize your course modules
              </p>
            </div>
            <Button
              onClick={() => setCreateOpen(true)}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Module
            </Button>
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
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm w-48">
                  <SelectValue placeholder="Sort by: Newest" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Newest">Sort by: Newest</SelectItem>
                  <SelectItem value="Oldest">Sort by: Oldest</SelectItem>
                  <SelectItem value="Name">Sort by: Name</SelectItem>
                  <SelectItem value="Lessons Count">
                    Sort by: Lessons Count
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Total Modules
                </p>
                <p className="text-2xl font-bold text-secondary mt-1">
                  {modules.length}
                </p>
                <p className="text-accent text-sm mt-1">
                  <ArrowUp className="inline w-3 h-3" /> +5% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Layers className="text-primary w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Published</p>
                <p className="text-2xl font-bold text-secondary mt-1">
                  {modules.filter((m) => m.status === "published").length}
                </p>
                <p className="text-accent text-sm mt-1">
                  <CheckCircle className="inline w-3 h-3" /> 85.7% published
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
                <p className="text-gray-600 text-sm font-medium">
                  Total Lessons
                </p>
                <p className="text-2xl font-bold text-secondary mt-1">
                  {modules.reduce((sum, m) => sum + m.lessons, 0)}
                </p>
                <p className="text-accent text-sm mt-1">
                  <ArrowUp className="inline w-3 h-3" /> +12% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <PlayCircle className="text-yellow-600 w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Avg. Completion
                </p>
                <p className="text-2xl font-bold text-secondary mt-1">
                  {Math.round(
                    modules.reduce((sum, m) => sum + m.completion, 0) /
                      modules.length
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
          <div className="relative">
            <input
              type="text"
              placeholder="Search modules... (Cmd+K)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <PlayCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-card rounded-xl p-12 shadow-sm border border-gray-100 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Layers className="text-gray-400 w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-secondary mb-2">
              No modules yet
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Create your first module to start organizing your course content
              and lessons.
            </p>
            <Button
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={() => setCreateOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" /> Create Your First Module
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filtered.map((m) => (
              <div
                key={m.id}
                className="module-card bg-card rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300"
                draggable
                onDragStart={() => setDraggedId(m.id)}
                onDragEnd={() => setDraggedId(null)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDrop(m.id)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-10 h-10 ${m.accentClass} rounded-lg flex items-center justify-center`}
                    >
                      {m.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary">
                        {m.title}
                      </h3>
                      <p className="text-sm text-gray-500">{m.course}</p>
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
                      <DropdownMenuItem onSelect={() => setEditModule(m)}>
                        <Pencil className="w-4 h-4 mr-2" /> Edit Module
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => {
                          const copy = { ...m, id: `m${Date.now()}` };
                          setModules((prev) => [copy, ...prev]);
                        }}
                      >
                        <Layers className="w-4 h-4 mr-2" /> Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setPreviewModule(m)}>
                        <Eye className="w-4 h-4 mr-2" /> Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onSelect={() => setDeleteId(m.id)}
                      >
                        <Trash className="w-4 h-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  {m.status === "published"
                    ? "Learn and explore module content."
                    : "This module is in draft and not yet visible."}
                </p>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <PlayCircle className="w-4 h-4 mr-1" /> {m.lessons}{" "}
                      Lessons
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" /> {m.duration}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${m.badgeClass}`}
                  >
                    {m.status === "published" ? "Published" : "Draft"}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Completion Rate</span>
                    <span>{m.completion}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full"
                      style={{ width: `${m.completion}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="ghost"
                    className="text-primary hover:text-primary/80 text-sm font-medium"
                    onClick={() => setEditModule(m)}
                  >
                    <Pencil className="w-4 h-4 mr-1" /> Edit
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-gray-600 hover:text-primary text-sm font-medium"
                    onClick={() => setAnalyticsModule(m)}
                  >
                    <ChartLine className="w-4 h-4 mr-1" /> Analytics
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-gray-600 hover:text-primary text-sm font-medium"
                    onClick={() => setShareModule(m)}
                  >
                    <Share2 className="w-4 h-4 mr-1" /> Share
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Module</DialogTitle>
              <DialogDescription>
                Add details for your module.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const fd = new FormData(form);
                const title = String(fd.get("title") || "");
                const course = String(fd.get("course") || "");
                const duration = String(fd.get("duration") || "");
                const status = String(fd.get("status") || "draft");
                const newItem: ModuleItem = {
                  id: `m${Date.now()}`,
                  title,
                  course,
                  duration,
                  lessons: 0,
                  status: status === "published" ? "published" : "draft",
                  completion: 0,
                  icon: <Layers className="text-primary" />,
                  accentClass: "bg-primary/10",
                  badgeClass:
                    status === "published"
                      ? "bg-accent/10 text-accent"
                      : "bg-yellow-100 text-yellow-800",
                };
                setModules((prev) => [newItem, ...prev]);
                setCreateOpen(false);
              }}
              className="space-y-4"
            >
              <input
                name="title"
                placeholder="Module Title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
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
              <textarea
                name="description"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Describe what students will learn"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="duration"
                  placeholder="e.g., 2h 30m"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <select
                  name="status"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
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
                  Create Module
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {/* Edit Dialog */}
      <Dialog
        open={!!editModule}
        onOpenChange={(v) => !v && setEditModule(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Module</DialogTitle>
            <DialogDescription>Update module details.</DialogDescription>
          </DialogHeader>
          {editModule && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget as HTMLFormElement);
                const title = String(fd.get("title") || editModule.title);
                const course = String(fd.get("course") || editModule.course);
                const duration = String(
                  fd.get("duration") || editModule.duration
                );
                const status = String(fd.get("status") || editModule.status);
                setModules((prev) =>
                  prev.map((mm) =>
                    mm.id === editModule.id
                      ? {
                          ...mm,
                          title,
                          course,
                          duration,
                          status:
                            status === "published" ? "published" : "draft",
                        }
                      : mm
                  )
                );
                setEditModule(null);
              }}
              className="space-y-4"
            >
              <input
                name="title"
                defaultValue={editModule.title}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                name="course"
                defaultValue={editModule.course}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="duration"
                  defaultValue={editModule.duration}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <select
                  name="status"
                  defaultValue={editModule.status}
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
                  onClick={() => setEditModule(null)}
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

      {/* Preview Dialog */}
      <Dialog
        open={!!previewModule}
        onOpenChange={(v) => !v && setPreviewModule(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Preview Module</DialogTitle>
            <DialogDescription>Quick overview of the module.</DialogDescription>
          </DialogHeader>
          {previewModule && (
            <div className="space-y-2">
              <div className="font-semibold">{previewModule.title}</div>
              <div className="text-sm text-gray-600">
                {previewModule.course}
              </div>
              <div className="text-sm">Lessons: {previewModule.lessons}</div>
              <div className="text-sm">Duration: {previewModule.duration}</div>
              <div className="text-sm">Status: {previewModule.status}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Analytics Dialog */}
      <Dialog
        open={!!analyticsModule}
        onOpenChange={(v) => !v && setAnalyticsModule(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Module Analytics</DialogTitle>
            <DialogDescription>
              Summary of performance metrics.
            </DialogDescription>
          </DialogHeader>
          {analyticsModule && (
            <div className="space-y-2 text-sm">
              <div>Completion: {analyticsModule.completion}%</div>
              <div>Lessons: {analyticsModule.lessons}</div>
              <div>Duration: {analyticsModule.duration}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog
        open={!!shareModule}
        onOpenChange={(v) => !v && setShareModule(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Module</DialogTitle>
            <DialogDescription>
              Copy link to share with others.
            </DialogDescription>
          </DialogHeader>
          {shareModule && (
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={`https://example.com/modules/${shareModule.id}`}
                className="flex-1 px-3 py-2 border rounded-lg"
              />
              <Button
                onClick={() =>
                  navigator.clipboard.writeText(
                    `https://example.com/modules/${shareModule.id}`
                  )
                }
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Copy
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(v) => !v && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete module?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setModules((prev) => prev.filter((m) => m.id !== deleteId));
                setDeleteId(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
