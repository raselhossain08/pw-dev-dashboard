"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
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
import { ImageUpload } from "@/components/cms/ImageUpload";
import { headerNavigationApi } from "@/services/cms.service";
import type { HeaderNavigation } from "@/types/cms";

interface HeaderEditDialogProps {
  header: HeaderNavigation;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HeaderEditDialog({
  header,
  open,
  onOpenChange,
}: HeaderEditDialogProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});

  // Logo upload mutation
  const logoMutation = useMutation({
    mutationFn: async ({
      file,
      type,
    }: {
      file: File;
      type: "dark" | "light";
    }) => {
      return headerNavigationApi.uploadLogo(
        header._id!,
        file,
        type,
        (progress) => {
          setUploadProgress((prev) => ({
            ...prev,
            [`logo-${type}`]: progress,
          }));
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["header-navigation"] });
      toast({ title: "Success", description: "Logo uploaded successfully" });
      setUploadProgress((prev) => {
        const newProgress = { ...prev };
        delete newProgress["logo-dark"];
        delete newProgress["logo-light"];
        return newProgress;
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to upload logo: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // User avatar upload mutation
  const avatarMutation = useMutation({
    mutationFn: async (file: File) => {
      return headerNavigationApi.uploadAvatar(header._id!, file, (progress) => {
        setUploadProgress((prev) => ({
          ...prev,
          avatar: progress,
        }));
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["header-navigation"] });
      toast({ title: "Success", description: "Avatar uploaded successfully" });
      setUploadProgress((prev) => {
        const newProgress = { ...prev };
        delete newProgress.avatar;
        return newProgress;
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to upload avatar: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Header Navigation</DialogTitle>
          <DialogDescription>
            Update header images and configuration
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="logos" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="logos">Logos</TabsTrigger>
            <TabsTrigger value="user">User Menu</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="logos" className="space-y-6 mt-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Dark Logo */}
              <div className="space-y-3">
                <Label>Dark Logo</Label>
                <ImageUpload
                  value={header.logo.dark}
                  onChange={(file) =>
                    logoMutation.mutate({ file, type: "dark" })
                  }
                  disabled={logoMutation.isPending}
                  showProgress={logoMutation.isPending}
                  progress={uploadProgress["logo-dark"] || 0}
                />
                {header.logo.dark && (
                  <p className="text-xs text-gray-500 truncate">
                    Current: {header.logo.dark}
                  </p>
                )}
              </div>

              {/* Light Logo */}
              <div className="space-y-3">
                <Label>Light Logo</Label>
                <ImageUpload
                  value={header.logo.light}
                  onChange={(file) =>
                    logoMutation.mutate({ file, type: "light" })
                  }
                  disabled={logoMutation.isPending}
                  showProgress={logoMutation.isPending}
                  progress={uploadProgress["logo-light"] || 0}
                />
                {header.logo.light && (
                  <p className="text-xs text-gray-500 truncate">
                    Current: {header.logo.light}
                  </p>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="user" className="space-y-6 mt-6">
            {/* User Avatar */}
            <div className="space-y-3">
              <Label>User Avatar</Label>
              <ImageUpload
                value={header.userMenu.profile.avatar}
                onChange={(file) => avatarMutation.mutate(file)}
                disabled={avatarMutation.isPending}
                showProgress={avatarMutation.isPending}
                progress={uploadProgress.avatar || 0}
                className="max-w-sm"
              />
              {header.userMenu.profile.avatar && (
                <p className="text-xs text-gray-500 truncate">
                  Current: {header.userMenu.profile.avatar}
                </p>
              )}
            </div>

            {/* User Info (Read-only for now) */}
            <div className="space-y-4 pt-4 border-t">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={header.userMenu.profile.name}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    value={header.userMenu.profile.email}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Status</p>
                  <p className="text-sm text-gray-500">
                    {header.isActive ? "Active" : "Inactive"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">Menu Items</p>
                  <p className="text-sm text-gray-500">
                    {header.navigation.menuItems.length} items
                  </p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> Full menu editing will be available in
                  a future update. Use this dialog to update images only.
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
