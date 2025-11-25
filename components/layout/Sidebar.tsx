"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Book,
  Layers,
  PlayCircle,
  CircleHelp,
  ListTodo,
  BadgeCheck,
  Users,
  Users2,
  CreditCard,
  UserPlus,
  MessageSquare,
  Bot,
  Headset,
  FileText,
  Image as ImageIcon,
  ShieldCheck,
  Plug,
  Settings,
  History,
  LayoutDashboard,
  ShoppingCart,
  Package,
  Tag,
  Plane,
  BarChart3,
  GraduationCap,
  User,
} from "lucide-react";
import { motion } from "framer-motion";

const navItems = {
  learningManagement: [
    { icon: Book, label: "Courses", href: "/courses" },
    { icon: Layers, label: "Modules", href: "/modules" },
    { icon: PlayCircle, label: "Lessons", href: "/lessons" },
    { icon: CircleHelp, label: "Quiz & Exams", href: "/quiz-exams" },
    { icon: ListTodo, label: "Assignments", href: "/assignments" },
    { icon: BadgeCheck, label: "Certificates", href: "/certificates" },
    {
      icon: GraduationCap,
      label: "Training Programs",
      href: "/training-programs",
    },
  ],
  userManagement: [
    { icon: Users, label: "Students", href: "/students" },
    { icon: Users2, label: "Instructors", href: "/instructors" },
    { icon: User, label: "Users", href: "/users" },
    { icon: CreditCard, label: "Payments", href: "/payments" },
    { icon: UserPlus, label: "Enrollments", href: "/enrollments" },
  ],
  ecommerce: [
    { icon: ShoppingCart, label: "Shop", href: "/shop" },
    { icon: Package, label: "Orders", href: "/orders" },
    { icon: Tag, label: "Categories", href: "/categories" },
    { icon: Tag, label: "Discounts", href: "/discounts" },
  ],
  communication: [
    { icon: MessageSquare, label: "Live Chat", href: "/live-chat" },
    { icon: Bot, label: "AI Agents", href: "/ai-agents" },
    { icon: Headset, label: "Support Tickets", href: "/support-tickets" },
  ],
  contentMedia: [
    { icon: FileText, label: "CMS", href: "/cms" },
    { icon: ImageIcon, label: "Media Library", href: "/media-library" },
  ],
  business: [
    { icon: Plane, label: "Aircraft Brokerage", href: "/aircraft-brokerage" },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
  ],
  system: [
    { icon: Plug, label: "Integrations", href: "/integrations" },
    { icon: Settings, label: "My Settings", href: "/my-settings" },
    { icon: History, label: "Activity Logs", href: "/activity-logs" },
    { icon: User, label: "Profile", href: "/profile" },
  ],
};

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.aside
      className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 bg-sidebar text-white overflow-y-auto"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <nav className="p-6">
        <div className="space-y-2">
          <div className="mb-6">
            <Link
              href="/"
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                pathname === "/"
                  ? "bg-primary shadow-lg shadow-primary/20"
                  : "bg-primary/80 hover:bg-primary/90"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="font-medium">Dashboard</span>
            </Link>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider px-4 py-2">
              Learning Management
            </div>
            {navItems.learningManagement.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-sidebar-foreground/70 hover:text-white hover:bg-primary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="space-y-1 mt-6">
            <div className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider px-4 py-2">
              User Management
            </div>
            {navItems.userManagement.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-sidebar-foreground/70 hover:text-white hover:bg-primary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="space-y-1 mt-6">
            <div className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider px-4 py-2">
              E-Commerce
            </div>
            {navItems.ecommerce.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-sidebar-foreground/70 hover:text-white hover:bg-primary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="space-y-1 mt-6">
            <div className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider px-4 py-2">
              Communication
            </div>
            {navItems.communication.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-sidebar-foreground/70 hover:text-white hover:bg-primary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="space-y-1 mt-6">
            <div className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider px-4 py-2">
              Content & Media
            </div>
            {navItems.contentMedia.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-sidebar-foreground/70 hover:text-white hover:bg-primary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="space-y-1 mt-6">
            <div className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider px-4 py-2">
              Business
            </div>
            {navItems.business.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-sidebar-foreground/70 hover:text-white hover:bg-primary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="space-y-1 mt-6">
            <div className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider px-4 py-2">
              System
            </div>
            {navItems.system.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-sidebar-foreground/70 hover:text-white hover:bg-primary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </motion.aside>
  );
}

export function SidebarMobile() {
  const pathname = usePathname();

  return (
    <div className="bg-sidebar text-white h-full">
      <motion.nav
        className="p-6"
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <div className="space-y-2">
          <div className="mb-6">
            <Link
              href="/"
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                pathname === "/"
                  ? "bg-primary shadow-lg shadow-primary/20"
                  : "bg-primary/80 hover:bg-primary/90"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="font-medium">Dashboard</span>
            </Link>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider px-4 py-2">
              Learning Management
            </div>
            {navItems.learningManagement.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-sidebar-foreground/70 hover:text-white hover:bg-primary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="space-y-1 mt-6">
            <div className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider px-4 py-2">
              User Management
            </div>
            {navItems.userManagement.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-sidebar-foreground/70 hover:text-white hover:bg-primary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="space-y-1 mt-6">
            <div className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider px-4 py-2">
              E-Commerce
            </div>
            {navItems.ecommerce.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-sidebar-foreground/70 hover:text-white hover:bg-primary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="space-y-1 mt-6">
            <div className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider px-4 py-2">
              Communication
            </div>
            {navItems.communication.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-sidebar-foreground/70 hover:text-white hover:bg-primary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="space-y-1 mt-6">
            <div className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider px-4 py-2">
              Content & Media
            </div>
            {navItems.contentMedia.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-sidebar-foreground/70 hover:text-white hover:bg-primary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="space-y-1 mt-6">
            <div className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider px-4 py-2">
              Business
            </div>
            {navItems.business.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-sidebar-foreground/70 hover:text-white hover:bg-primary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="space-y-1 mt-6 pb-6">
            <div className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider px-4 py-2">
              System
            </div>
            {navItems.system.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-sidebar-foreground/70 hover:text-white hover:bg-primary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </motion.nav>
    </div>
  );
}
