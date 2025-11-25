"use client";

import * as React from "react";
import {
  Book,
  Users,
  Star,
  EllipsisVertical,
  ArrowUp,
  CheckCircle,
  ChartLine,
  Filter,
  LayoutGrid,
  List,
  Plus,
  Eye,
  Pencil,
  Layers,
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

type CourseItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  students: number;
  rating: number;
  duration: string;
  status: "published" | "draft";
  completion: number;
  image: string;
  instructor: string;
};

const initialCourses: CourseItem[] = [
  {
    id: "c1",
    title: "Web Development Bootcamp",
    category: "Web Development",
    description:
      "HTML, CSS, JavaScript, frameworks and deployment for modern web apps.",
    students: 1200,
    rating: 4.7,
    duration: "12h",
    status: "published",
    completion: 82,
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1470&q=80",
    instructor: "Sarah Johnson",
  },
  {
    id: "c2",
    title: "Data Science & Machine Learning",
    category: "Data Science",
    description: "Python, Pandas, NumPy, scikit-learn and TensorFlow basics.",
    students: 980,
    rating: 4.6,
    duration: "18h",
    status: "draft",
    completion: 72,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1470&q=80",
    instructor: "Michael Chen",
  },
  {
    id: "c3",
    title: "UI Design Principles",
    category: "UI/UX Design",
    description: "Color theory, typography, layout principles and design systems.",
    students: 650,
    rating: 4.8,
    duration: "9h",
    status: "published",
    completion: 91,
    image:
      "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=1470&q=80",
    instructor: "Emily Davis",
  },
];

export default function Courses() {
  const [courses, setCourses] = React.useState<CourseItem[]>(initialCourses);
  const [search, setSearch] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState<string>("All Categories");
  const [statusFilter, setStatusFilter] = React.useState<string>("All Status");
  const [sortBy, setSortBy] = React.useState<string>("Newest");
  const [createOpen, setCreateOpen] = React.useState(false);
  const [editCourse, setEditCourse] = React.useState<CourseItem | null>(null);
  const [previewCourse, setPreviewCourse] = React.useState<CourseItem | null>(null);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  const filtered = courses
    .filter((c) =>
      search
        ? c.title.toLowerCase().includes(search.toLowerCase()) ||
          c.description.toLowerCase().includes(search.toLowerCase())
        : true
    )
    .filter((c) => (categoryFilter === "All Categories" ? true : c.category === categoryFilter))
    .filter((c) =>
      statusFilter === "All Status"
        ? true
        : statusFilter === "Published"
        ? c.status === "published"
        : c.status === "draft"
    )
    .sort((a, b) => {
      if (sortBy === "Newest") return b.id.localeCompare(a.id);
      if (sortBy === "Oldest") return a.id.localeCompare(b.id);
      if (sortBy === "Name") return a.title.localeCompare(b.title);
      if (sortBy === "Students") return b.students - a.students;
      if (sortBy === "Rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <main className="">
      <div className="p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-2">Courses</h2>
              <p className="text-gray-600">Manage and organize your learning courses</p>
            </div>
            <Button onClick={() => setCreateOpen(true)} className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Course
            </Button>
          </div>
        </div>

        <div className="bg-card rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Categories">All Categories</SelectItem>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                  <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
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
                <SelectTrigger className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm w-56">
                  <SelectValue placeholder="Sort by: Newest" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Newest">Sort by: Newest</SelectItem>
                  <SelectItem value="Oldest">Sort by: Oldest</SelectItem>
                  <SelectItem value="Name">Sort by: Name</SelectItem>
                  <SelectItem value="Students">Sort by: Students</SelectItem>
                  <SelectItem value="Rating">Sort by: Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-primary">
                <Filter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-primary">
                <LayoutGrid className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-primary">
                <List className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Courses</p>
                <p className="text-2xl font-bold text-secondary mt-1">{courses.length}</p>
                <p className="text-accent text-sm mt-1">
                  <ArrowUp className="inline w-3 h-3" /> +5% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Book className="text-primary w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Published</p>
                <p className="text-2xl font-bold text-secondary mt-1">
                  {courses.filter((c) => c.status === "published").length}
                </p>
                <p className="text-accent text-sm mt-1">
                  <CheckCircle className="inline w-3 h-3" /> good ratio
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
                <p className="text-gray-600 text-sm font-medium">Total Students</p>
                <p className="text-2xl font-bold text-secondary mt-1">
                  {courses.reduce((sum, c) => sum + c.students, 0)}
                </p>
                <p className="text-accent text-sm mt-1">
                  <ArrowUp className="inline w-3 h-3" /> +12% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Users className="text-yellow-600 w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Avg. Completion</p>
                <p className="text-2xl font-bold text-secondary mt-1">
                  {Math.round(courses.reduce((sum, c) => sum + c.completion, 0) / courses.length)}%
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
              placeholder="Search courses... (Cmd+K)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Book className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-card rounded-xl p-12 shadow-sm border border-gray-100 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Book className="text-gray-400 w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-secondary mb-2">No courses yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Create your first course to start organizing your learning content.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-white" onClick={() => setCreateOpen(true)}>
              <Plus className="w-4 h-4 mr-2" /> Create Your First Course
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filtered.map((c) => (
              <div key={c.id} className="course-card bg-card rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300">
                <div className="relative">
                  <img src={c.image} alt={c.title} className="w-full h-40 object-cover" />
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${c.status === "published" ? "bg-accent/90 text-white" : "bg-yellow-100 text-yellow-800"}`}>
                      {c.status === "published" ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">{c.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-secondary text-lg mb-1">{c.title}</h3>
                      <p className="text-gray-500 text-sm">{c.description}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-primary">
                          <EllipsisVertical className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onSelect={() => setEditCourse(c)}>
                          <Pencil className="w-4 h-4 mr-2" /> Edit Course
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => {
                            const copy: CourseItem = { ...c, id: `c${Date.now()}` };
                            setCourses((prev) => [copy, ...prev]);
                          }}
                        >
                          <Layers className="w-4 h-4 mr-2" /> Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setPreviewCourse(c)}>
                          <Eye className="w-4 h-4 mr-2" /> Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onSelect={() => setDeleteId(c.id)}>
                          <Trash className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Completion Rate</span>
                      <span>{c.completion}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{ width: `${c.completion}%` }} />
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" /> {c.students}
                      </span>
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1" /> {c.rating.toFixed(1)}
                      </span>
                      <span className="flex items-center">
                        <Book className="w-4 h-4 mr-1" /> {c.duration}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <img
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                        alt="Instructor"
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm text-gray-600">{c.instructor}</span>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="ghost" className="text-primary hover:text-primary/80 text-sm font-medium" onClick={() => setEditCourse(c)}>
                      <Pencil className="w-4 h-4 mr-1" /> Edit
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
              <DialogDescription>Add details for your course.</DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const fd = new FormData(form);
                const title = String(fd.get("title") || "");
                const category = String(fd.get("category") || "");
                const duration = String(fd.get("duration") || "");
                const status = String(fd.get("status") || "draft");
                const instructor = String(fd.get("instructor") || "");
                const image = String(fd.get("image") || initialCourses[0].image);
                const newItem: CourseItem = {
                  id: `c${Date.now()}`,
                  title,
                  category,
                  description: "",
                  students: 0,
                  rating: 0,
                  duration,
                  status: status === "published" ? "published" : "draft",
                  completion: 0,
                  image,
                  instructor,
                };
                setCourses((prev) => [newItem, ...prev]);
                setCreateOpen(false);
              }}
              className="space-y-4"
            >
              <input
                name="title"
                placeholder="Course Title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
              <select
                name="category"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              >
                <option value="">Select a category</option>
                <option value="Web Development">Web Development</option>
                <option value="Data Science">Data Science</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Business">Business</option>
              </select>
              <textarea
                name="description"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Describe course content"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="duration"
                  placeholder="e.g., 12h"
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
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="instructor"
                  placeholder="Instructor name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <input
                  name="image"
                  placeholder="Image URL"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setCreateOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
                  Create Course
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={!!editCourse} onOpenChange={(v) => !v && setEditCourse(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>Update course details.</DialogDescription>
          </DialogHeader>
          {editCourse && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget as HTMLFormElement);
                const title = String(fd.get("title") || editCourse.title);
                const category = String(fd.get("category") || editCourse.category);
                const duration = String(fd.get("duration") || editCourse.duration);
                const status = String(fd.get("status") || editCourse.status);
                setCourses((prev) =>
                  prev.map((cc) =>
                    cc.id === editCourse.id
                      ? {
                          ...cc,
                          title,
                          category,
                          duration,
                          status: status === "published" ? "published" : "draft",
                        }
                      : cc
                  )
                );
                setEditCourse(null);
              }}
              className="space-y-4"
            >
              <input name="title" defaultValue={editCourse.title} className="w-full px-3 py-2 border rounded-lg" />
              <input name="category" defaultValue={editCourse.category} className="w-full px-3 py-2 border rounded-lg" />
              <div className="grid grid-cols-2 gap-4">
                <input name="duration" defaultValue={editCourse.duration} className="w-full px-3 py-2 border rounded-lg" />
                <select name="status" defaultValue={editCourse.status} className="w-full px-3 py-2 border rounded-lg">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={() => setEditCourse(null)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
                  Save
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!previewCourse} onOpenChange={(v) => !v && setPreviewCourse(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Preview Course</DialogTitle>
            <DialogDescription>Quick overview of the course.</DialogDescription>
          </DialogHeader>
          {previewCourse && (
            <div className="space-y-2">
              <div className="font-semibold">{previewCourse.title}</div>
              <div className="text-sm text-gray-600">{previewCourse.category}</div>
              <div className="text-sm">Students: {previewCourse.students}</div>
              <div className="text-sm">Duration: {previewCourse.duration}</div>
              <div className="text-sm">Status: {previewCourse.status}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(v) => !v && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete course?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setCourses((prev) => prev.filter((c) => c.id !== deleteId));
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

