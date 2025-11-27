"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/context/ToastContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/cms/ImageUpload";
import { topBarApi } from "@/services/cms.service";
import type { TopBar } from "@/types/cms";

interface TopBarEditDialogProps {
  topBar: TopBar;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TopBarEditDialog({
  topBar,
  open,
  onOpenChange,
}: TopBarEditDialogProps) {
  const queryClient = useQueryClient();
  const { push } = useToast();
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});
  const [selectedLanguage, setSelectedLanguage] = useState(
    topBar.languages[0]?.code || ""
  );

  // News icon upload mutation
  const newsIconMutation = useMutation({
    mutationFn: async (file: File) => {
      return topBarApi.uploadNewsIcon(topBar._id!, file, (progress) => {
        setUploadProgress((prev) => ({
          ...prev,
          newsIcon: progress,
        }));
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["top-bar"] });
      push({ message: "News icon uploaded successfully", type: "success" });
      setUploadProgress((prev) => {
        const newProgress = { ...prev };
        delete newProgress.newsIcon;
        return newProgress;
      });
    },
    onError: (error: Error) => {
      push({
        message: `Failed to upload news icon: ${error.message}`,
        type: "error",
      });
    },
  });

  // Language flag upload mutation
  const flagMutation = useMutation({
    mutationFn: async ({
      file,
      languageCode,
    }: {
      file: File;
      languageCode: string;
    }) => {
      return topBarApi.uploadLanguageFlag(
        topBar._id!,
        languageCode,
        file,
        (progress) => {
          setUploadProgress((prev) => ({
            ...prev,
            [`flag-${languageCode}`]: progress,
          }));
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["top-bar"] });
      push({ message: "Language flag uploaded successfully", type: "success" });
      setUploadProgress((prev) => {
        const newProgress = { ...prev };
        Object.keys(newProgress)
          .filter((key) => key.startsWith("flag-"))
          .forEach((key) => delete newProgress[key]);
        return newProgress;
      });
    },
    onError: (error: Error) => {
      push({
        message: `Failed to upload flag: ${error.message}`,
        type: "error",
      });
    },
  });

  const currentLanguage = topBar.languages.find(
    (lang) => lang.code === selectedLanguage
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Top Bar</DialogTitle>
          <DialogDescription>
            Update top bar images and configuration
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="news" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="languages">Languages</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="news" className="space-y-6 mt-6">
            {/* News Icon */}
            <div className="space-y-3">
              <Label>News Icon</Label>
              <ImageUpload
                value={topBar.news.icon}
                onChange={(file) => newsIconMutation.mutate(file)}
                disabled={newsIconMutation.isPending}
                showProgress={newsIconMutation.isPending}
                progress={uploadProgress.newsIcon || 0}
                className="max-w-sm"
              />
              {topBar.news.icon && (
                <p className="text-xs text-gray-500 truncate">
                  Current: {topBar.news.icon}
                </p>
              )}
            </div>

            {/* News Text (Read-only) */}
            <div className="space-y-2">
              <Label>News Text</Label>
              <Input value={topBar.news.text} disabled className="bg-gray-50" />
            </div>

            {/* News Badge (Read-only) */}
            <div className="space-y-2">
              <Label>News Badge</Label>
              <Input
                value={topBar.news.badge}
                disabled
                className="bg-gray-50"
              />
            </div>
          </TabsContent>

          <TabsContent value="languages" className="space-y-6 mt-6">
            {/* Language Selector */}
            <div className="space-y-2">
              <Label>Select Language</Label>
              <Select
                value={selectedLanguage}
                onValueChange={setSelectedLanguage}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  {topBar.languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name} ({lang.code.toUpperCase()})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {currentLanguage && (
              <>
                {/* Language Flag Upload */}
                <div className="space-y-3">
                  <Label>
                    {currentLanguage.name} Flag (
                    {currentLanguage.code.toUpperCase()})
                  </Label>
                  <ImageUpload
                    value={currentLanguage.flag}
                    onChange={(file) =>
                      flagMutation.mutate({
                        file,
                        languageCode: currentLanguage.code,
                      })
                    }
                    disabled={flagMutation.isPending}
                    showProgress={flagMutation.isPending}
                    progress={
                      uploadProgress[`flag-${currentLanguage.code}`] || 0
                    }
                    className="max-w-sm"
                  />
                  {currentLanguage.flag && (
                    <p className="text-xs text-gray-500 truncate">
                      Current: {currentLanguage.flag}
                    </p>
                  )}
                </div>

                {/* Language Name (Read-only) */}
                <div className="space-y-2">
                  <Label>Language Name</Label>
                  <Input
                    value={currentLanguage.name}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
              </>
            )}

            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Total Languages: {topBar.languages.length}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium">Status</p>
                  <p className="text-sm text-gray-500">
                    {topBar.isActive ? "Active" : "Inactive"}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium">Currencies</p>
                  <p className="text-sm text-gray-500">
                    {topBar.currencies.length} currencies
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium mb-2">Social Links</p>
                <div className="space-y-1 text-sm text-gray-600">
                  {topBar.socialLinks.map((link, index) => (
                    <p key={index}>
                      {link.platform}: {link.href}
                    </p>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> Full configuration editing will be
                  available in a future update. Use this dialog to update images
                  only.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
