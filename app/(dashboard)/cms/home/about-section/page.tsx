"use client";

import AppLayout from "@/components/layout/AppLayout";
import { AboutSectionEditor } from "@/components/cms/home/AboutSectionEditor";
import { Heart } from "lucide-react";

export default function AboutSectionPage() {
  return (
    <AppLayout>
      <div className="min-h-screen p-4">
        <div className="container mx-auto">
          {/* Header Section */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-linear-to-r from-blue-500 to-indigo-600 rounded-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                About Section Management
              </h1>
            </div>
            <p className="text-sm sm:text-base text-gray-600">
              Manage about section content with dynamic data and SEO
              optimization
            </p>
          </div>

          {/* About Section Editor Component */}
          <AboutSectionEditor />
        </div>
      </div>
    </AppLayout>
  );
}
