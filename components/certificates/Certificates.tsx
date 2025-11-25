"use client";

import * as React from "react";
import {
  Award,
  EllipsisVertical,
  Search as SearchIcon,
  Eye,
  Download,
  Share2,
  Mail,
  Ban,
  ArrowUp,
  Bolt,
  SlidersHorizontal,
  Plus,
  Clock,
  CheckCircle,
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
//

type CertificateItem = {
  id: string;
  student: string;
  email: string;
  course: string;
  courseDetail?: string;
  certificateId: string;
  status: "issued" | "pending" | "draft" | "revoked";
  issuedText: string;
  avatarUrl: string;
};

const initialCertificates: CertificateItem[] = [
  {
    id: "c1",
    student: "Sarah Johnson",
    email: "sarah.j@example.com",
    course: "Web Development",
    courseDetail: "Bootcamp",
    certificateId: "CER-2023-WEB-0012",
    status: "issued",
    issuedText: "Oct 10, 2023",
    avatarUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
  },
  {
    id: "c2",
    student: "Michael Chen",
    email: "michael.c@example.com",
    course: "Data Science",
    courseDetail: "Advanced Course",
    certificateId: "CER-2023-DS-0098",
    status: "revoked",
    issuedText: "Sep 22, 2023",
    avatarUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
  },
  {
    id: "c3",
    student: "Emma Wilson",
    email: "emma.w@example.com",
    course: "UI/UX Design",
    courseDetail: "Advanced Course",
    certificateId: "CER-2023-UI-0028",
    status: "pending",
    issuedText: "Oct 10, 2023",
    avatarUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
  },
];

export default function Certificates() {
  const [items] = React.useState<CertificateItem[]>(initialCertificates);
  const [search, setSearch] = React.useState("");
  const [courseFilter, setCourseFilter] = React.useState("All Courses");
  const [statusFilter, setStatusFilter] = React.useState("All Status");
  const [templateFilter, setTemplateFilter] = React.useState("All Templates");
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<CertificateItem | null>(null);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isCmdK = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k";
      if (isCmdK) {
        const el = document.getElementById(
          "certificate-search"
        ) as HTMLInputElement | null;
        el?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filtered = items.filter((it) => {
    const matchesSearch =
      search === "" ||
      it.student.toLowerCase().includes(search.toLowerCase()) ||
      it.course.toLowerCase().includes(search.toLowerCase());
    const matchesCourse =
      courseFilter === "All Courses" || it.course === courseFilter;
    const matchesStatus =
      statusFilter === "All Status" || it.status === statusFilter.toLowerCase();
    return matchesSearch && matchesCourse && matchesStatus;
  });

  return (
    <main className="p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-secondary mb-2">Certificates</h2>
        <p className="text-gray-600">
          Manage certificate templates, issuance, and recent activity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Issued</p>
              <p className="text-2xl font-bold text-secondary mt-1">128</p>
              <p className="text-accent text-sm mt-1">
                <ArrowUp className="inline w-3 h-3" /> +8% from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Award className="text-primary w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pending</p>
              <p className="text-2xl font-bold text-secondary mt-1">12</p>
              <p className="text-yellow-600 text-sm mt-1">Review required</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="text-yellow-600 w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Templates</p>
              <p className="text-2xl font-bold text-secondary mt-1">6</p>
              <p className="text-gray-600 text-sm mt-1">Active designs</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <SlidersHorizontal className="text-blue-600 w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Verified</p>
              <p className="text-2xl font-bold text-secondary mt-1">104</p>
              <p className="text-accent text-sm mt-1">Valid and confirmed</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="text-green-600 w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-2">
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm w-40">
                <SelectValue placeholder="All Courses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Courses">All Courses</SelectItem>
                <SelectItem value="Web Development">Web Development</SelectItem>
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
                <SelectItem value="Issued">Issued</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Revoked">Revoked</SelectItem>
              </SelectContent>
            </Select>
            <Select value={templateFilter} onValueChange={setTemplateFilter}>
              <SelectTrigger className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm w-44">
                <SelectValue placeholder="All Templates" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Templates">All Templates</SelectItem>
                <SelectItem value="Classic Gold">Classic Gold</SelectItem>
                <SelectItem value="Modern Blue">Modern Blue</SelectItem>
                <SelectItem value="Minimal">Minimal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="relative w-full md:w-80">
            <input
              id="certificate-search"
              type="text"
              placeholder="Search certificates... (Cmd+K)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filtered.map((it) => (
          <div
            key={it.id}
            className="bg-card rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-0.5"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Award className="text-purple-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary">{it.student}</h3>
                  <p className="text-sm text-gray-500">
                    {it.course} {it.courseDetail}
                  </p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1 text-gray-400 hover:text-primary rounded">
                    <EllipsisVertical className="w-5 h-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuItem
                    onClick={() => {
                      setSelected(it);
                      setPreviewOpen(true);
                    }}
                  >
                    <Eye className="w-4 h-4 mr-2" /> View Certificate
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="w-4 h-4 mr-2" /> Download PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="w-4 h-4 mr-2" /> Share Link
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Mail className="w-4 h-4 mr-2" /> Email Student
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600 focus:text-red-700">
                    <Ban className="w-4 h-4 mr-2" /> Revoke Certificate
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="mb-4">
              <div className="rounded-2xl p-6 border-4 border-yellow-400 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                <div className="text-center">
                  <p className="text-sm">CERTIFICATE OF COMPLETION</p>
                  <p className="text-lg font-semibold mt-1">{it.student}</p>
                  <p className="text-sm opacity-90">
                    {it.course} {it.courseDetail}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="font-mono text-gray-900">
                  {it.certificateId}
                </span>
                <span>•</span>
                <span>{it.issuedText}</span>
              </div>
              <div>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSelected(it);
                    setPreviewOpen(true);
                  }}
                  className="text-sm"
                >
                  <Eye className="w-4 h-4 mr-1" /> Preview
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-secondary">
            Certificate Activity
          </h3>
          <p className="text-gray-600 text-sm">
            Recent certificate issuances and updates
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
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Certificate ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issued
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((it) => (
                <tr
                  key={`row-${it.id}`}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={it.avatarUrl}
                        alt=""
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {it.student}
                        </div>
                        <div className="text-sm text-gray-500">{it.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{it.course}</div>
                    <div className="text-sm text-gray-500">
                      {it.courseDetail}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                    {it.certificateId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {it.issuedText}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {it.status === "issued" && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Issued
                      </span>
                    )}
                    {it.status === "pending" && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    )}
                    {it.status === "draft" && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        Draft
                      </span>
                    )}
                    {it.status === "revoked" && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Revoked
                      </span>
                    )}
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
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button className="text-primary hover:text-primary/80 text-sm font-medium flex items-center">
            <Award className="w-4 h-4 mr-2" /> View All Certificates
          </button>
        </div>
      </div>

      <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-secondary mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Plus className="text-white" />
            </div>
            <div className="text-left">
              <p className="font-medium text-secondary">Create Template</p>
              <p className="text-sm text-gray-600">New design</p>
            </div>
          </button>

          <button className="flex items-center space-x-3 p-4 bg-accent/5 hover:bg-accent/10 rounded-lg transition-colors">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <Bolt className="text-white" />
            </div>
            <div className="text-left">
              <p className="font-medium text-secondary">Bulk Issue</p>
              <p className="text-sm text-gray-600">Multiple certificates</p>
            </div>
          </button>

          <button className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Download className="text-white" />
            </div>
            <div className="text-left">
              <p className="font-medium text-secondary">Export Data</p>
              <p className="text-sm text-gray-600">Download reports</p>
            </div>
          </button>

          <button className="flex items-center space-x-3 p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors">
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
              <SlidersHorizontal className="text-white" />
            </div>
            <div className="text-left">
              <p className="font-medium text-secondary">Settings</p>
              <p className="text-sm text-gray-600">Configure templates</p>
            </div>
          </button>
        </div>
      </div>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Certificate Preview</DialogTitle>
            <DialogDescription>
              Preview certificate design and details
            </DialogDescription>
          </DialogHeader>
          <div className="certificate-template rounded-2xl p-8 border-8 border-yellow-400 bg-gradient-to-br from-indigo-50 to-purple-50">
            <div className="text-center">
              <div className="mb-6">
                <p className="text-2xl font-bold text-gray-800">
                  CERTIFICATE OF COMPLETION
                </p>
                <p className="text-gray-600">This certifies that</p>
              </div>
              <div className="my-6">
                <p className="text-4xl font-bold text-primary">
                  {selected?.student}
                </p>
                <p className="text-lg text-gray-600">
                  has successfully completed
                </p>
              </div>
              <div className="my-6">
                <p className="text-2xl font-semibold text-gray-800">
                  {selected?.course} {selected?.courseDetail}
                </p>
                <p className="text-gray-600">
                  with distinction and outstanding performance
                </p>
              </div>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <p className="text-sm text-gray-600">Certificate ID</p>
                  <p className="font-mono text-gray-900">
                    {selected?.certificateId}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Issued</p>
                  <p className="text-gray-900">{selected?.issuedText}</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
