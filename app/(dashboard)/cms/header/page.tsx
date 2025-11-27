"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { headerNavigationApi, topBarApi } from "@/services/cms.service";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/context/ToastContext";
import { HeaderEditDialog } from "@/components/cms/HeaderEditDialog";
import { TopBarEditDialog } from "@/components/cms/TopBarEditDialog";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  Upload,
  Eye,
  CheckCircle,
  Image as ImageIcon,
  Menu,
  User,
  Search,
  ShoppingCart,
  Bell,
  Globe,
  DollarSign,
} from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import type { HeaderNavigation, TopBar } from "@/types/cms";

export default function HeaderCMSPage() {
  const { push } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"navigation" | "topbar">(
    "navigation"
  );

  // Header Navigation State
  const [selectedHeader, setSelectedHeader] = useState<HeaderNavigation | null>(
    null
  );
  const [isHeaderDialogOpen, setIsHeaderDialogOpen] = useState(false);
  const [isHeaderDeleteDialogOpen, setIsHeaderDeleteDialogOpen] =
    useState(false);
  const [headerToDelete, setHeaderToDelete] = useState<string | null>(null);

  // Top Bar State
  const [selectedTopBar, setSelectedTopBar] = useState<TopBar | null>(null);
  const [isTopBarDialogOpen, setIsTopBarDialogOpen] = useState(false);
  const [isTopBarDeleteDialogOpen, setIsTopBarDeleteDialogOpen] =
    useState(false);
  const [topBarToDelete, setTopBarToDelete] = useState<string | null>(null);

  // Header Navigation Queries
  const { data: headers, isLoading: headersLoading } = useQuery({
    queryKey: ["headers"],
    queryFn: headerNavigationApi.getAll,
  });

  const { data: activeHeader } = useQuery({
    queryKey: ["activeHeader"],
    queryFn: headerNavigationApi.getActive,
  });

  // Top Bar Queries
  const { data: topBars, isLoading: topBarsLoading } = useQuery({
    queryKey: ["topBars"],
    queryFn: topBarApi.getAll,
  });

  const { data: activeTopBar } = useQuery({
    queryKey: ["activeTopBar"],
    queryFn: topBarApi.getActive,
  });

  // Header Navigation Mutations
  const createHeaderMutation = useMutation({
    mutationFn: headerNavigationApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["headers"] });
      push({ message: "Header created successfully", type: "success" });
      setIsHeaderDialogOpen(false);
      setSelectedHeader(null);
    },
    onError: () => {
      push({ message: "Failed to create header", type: "error" });
    },
  });

  const updateHeaderMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<HeaderNavigation>;
    }) => headerNavigationApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["headers"] });
      queryClient.invalidateQueries({ queryKey: ["activeHeader"] });
      push({ message: "Header updated successfully", type: "success" });
      setIsHeaderDialogOpen(false);
      setSelectedHeader(null);
    },
    onError: () => {
      push({ message: "Failed to update header", type: "error" });
    },
  });

  const deleteHeaderMutation = useMutation({
    mutationFn: headerNavigationApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["headers"] });
      push({ message: "Header deleted successfully", type: "success" });
      setIsHeaderDeleteDialogOpen(false);
      setHeaderToDelete(null);
    },
    onError: () => {
      push({ message: "Failed to delete header", type: "error" });
    },
  });

  const activateHeaderMutation = useMutation({
    mutationFn: headerNavigationApi.setActive,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["headers"] });
      queryClient.invalidateQueries({ queryKey: ["activeHeader"] });
      push({ message: "Header activated successfully", type: "success" });
    },
    onError: () => {
      push({ message: "Failed to activate header", type: "error" });
    },
  });

  // Top Bar Mutations
  const createTopBarMutation = useMutation({
    mutationFn: topBarApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topBars"] });
      push({ message: "Top bar created successfully", type: "success" });
      setIsTopBarDialogOpen(false);
      setSelectedTopBar(null);
    },
    onError: () => {
      push({ message: "Failed to create top bar", type: "error" });
    },
  });

  const updateTopBarMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TopBar> }) =>
      topBarApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topBars"] });
      queryClient.invalidateQueries({ queryKey: ["activeTopBar"] });
      push({ message: "Top bar updated successfully", type: "success" });
      setIsTopBarDialogOpen(false);
      setSelectedTopBar(null);
    },
    onError: () => {
      push({ message: "Failed to update top bar", type: "error" });
    },
  });

  const deleteTopBarMutation = useMutation({
    mutationFn: topBarApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topBars"] });
      push({ message: "Top bar deleted successfully", type: "success" });
      setIsTopBarDeleteDialogOpen(false);
      setTopBarToDelete(null);
    },
    onError: () => {
      push({ message: "Failed to delete top bar", type: "error" });
    },
  });

  const activateTopBarMutation = useMutation({
    mutationFn: topBarApi.setActive,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topBars"] });
      queryClient.invalidateQueries({ queryKey: ["activeTopBar"] });
      push({ message: "Top bar activated successfully", type: "success" });
    },
    onError: () => {
      push({ message: "Failed to activate top bar", type: "error" });
    },
  });

  // Handle Header Actions
  const handleCreateHeader = () => {
    setSelectedHeader(null);
    createHeaderMutation.mutate(undefined as any);
  };

  const handleEditHeader = (header: HeaderNavigation) => {
    setSelectedHeader(header);
    setIsHeaderDialogOpen(true);
  };

  const handleDeleteHeader = (id: string) => {
    setHeaderToDelete(id);
    setIsHeaderDeleteDialogOpen(true);
  };

  const confirmDeleteHeader = () => {
    if (headerToDelete) {
      deleteHeaderMutation.mutate(headerToDelete);
    }
  };

  const handleActivateHeader = (id: string) => {
    activateHeaderMutation.mutate(id);
  };

  // Handle Top Bar Actions
  const handleCreateTopBar = () => {
    setSelectedTopBar(null);
    createTopBarMutation.mutate(undefined as any);
  };

  const handleEditTopBar = (topBar: TopBar) => {
    setSelectedTopBar(topBar);
    setIsTopBarDialogOpen(true);
  };

  const handleDeleteTopBar = (id: string) => {
    setTopBarToDelete(id);
    setIsTopBarDeleteDialogOpen(true);
  };

  const confirmDeleteTopBar = () => {
    if (topBarToDelete) {
      deleteTopBarMutation.mutate(topBarToDelete);
    }
  };

  const handleActivateTopBar = (id: string) => {
    activateTopBarMutation.mutate(id);
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Header CMS Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage header navigation and top bar configurations
          </p>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as "navigation" | "topbar")}
      >
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="navigation" className="flex items-center gap-2">
            <Menu className="h-4 w-4" />
            Header Navigation
          </TabsTrigger>
          <TabsTrigger value="topbar" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Top Bar
          </TabsTrigger>
        </TabsList>

        {/* Header Navigation Tab */}
        <TabsContent value="navigation" className="space-y-6">
          {/* Active Header Preview */}
          {activeHeader && (
            <Card className="border-green-200 bg-green-50/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <CardTitle>Active Header Navigation</CardTitle>
                  </div>
                  <Eye className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardDescription>
                  Currently displayed on the website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white">
                    <ImageIcon className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Logo</p>
                      <p className="text-xs text-muted-foreground">
                        {activeHeader.logo.alt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white">
                    <Menu className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium">Menu Items</p>
                      <p className="text-xs text-muted-foreground">
                        {activeHeader.navigation.menuItems.length} items
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white">
                    <ShoppingCart className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">Cart</p>
                      <p className="text-xs text-muted-foreground">
                        {activeHeader.cart.items.length} items
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white">
                    <User className="h-8 w-8 text-orange-600" />
                    <div>
                      <p className="text-sm font-medium">User Menu</p>
                      <p className="text-xs text-muted-foreground">
                        {activeHeader.userMenu.menuItems.length} items
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Create Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleCreateHeader}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create New Header
            </Button>
          </div>

          {/* Headers List */}
          <div className="grid gap-4">
            {headersLoading ? (
              <Card>
                <CardContent className="py-8">
                  <p className="text-center text-muted-foreground">
                    Loading headers...
                  </p>
                </CardContent>
              </Card>
            ) : headers && headers.length > 0 ? (
              headers.map((header: HeaderNavigation) => (
                <Card
                  key={header._id}
                  className={header.isActive ? "border-green-500" : ""}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {header.isActive && (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          )}
                          Header Navigation - {header._id}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          Created:{" "}
                          {new Date(header.createdAt!).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {!header.isActive && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleActivateHeader(header._id!)}
                            disabled={activateHeaderMutation.isPending}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Set Active
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedHeader(header);
                            setIsHeaderDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        {!header.isActive && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteHeader(header._id!)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Menu Items</p>
                        <p className="text-muted-foreground">
                          {header.navigation.menuItems.length}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">CTA Text</p>
                        <p className="text-muted-foreground">
                          {header.cta.text}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Cart Items</p>
                        <p className="text-muted-foreground">
                          {header.cart.items.length}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Search Results</p>
                        <p className="text-muted-foreground">
                          {header.search.mockResults.length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-8">
                  <p className="text-center text-muted-foreground">
                    No headers found. Create your first header navigation.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Top Bar Tab */}
        <TabsContent value="topbar" className="space-y-6">
          {/* Active Top Bar Preview */}
          {activeTopBar && (
            <Card className="border-green-200 bg-green-50/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <CardTitle>Active Top Bar</CardTitle>
                  </div>
                  <Eye className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardDescription>
                  Currently displayed on the website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white">
                    <Globe className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Languages</p>
                      <p className="text-xs text-muted-foreground">
                        {activeTopBar.languages.length} languages
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white">
                    <DollarSign className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">Currencies</p>
                      <p className="text-xs text-muted-foreground">
                        {activeTopBar.currencies.length} currencies
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white">
                    <Bell className="h-8 w-8 text-orange-600" />
                    <div>
                      <p className="text-sm font-medium">News</p>
                      <p className="text-xs text-muted-foreground">
                        {activeTopBar.news.badge}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white">
                    <User className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium">Social Links</p>
                      <p className="text-xs text-muted-foreground">
                        {activeTopBar.socialLinks.length} links
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Create Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleCreateTopBar}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create New Top Bar
            </Button>
          </div>

          {/* Top Bars List */}
          <div className="grid gap-4">
            {topBarsLoading ? (
              <Card>
                <CardContent className="py-8">
                  <p className="text-center text-muted-foreground">
                    Loading top bars...
                  </p>
                </CardContent>
              </Card>
            ) : topBars && topBars.length > 0 ? (
              topBars.map((topBar: TopBar) => (
                <Card
                  key={topBar._id}
                  className={topBar.isActive ? "border-green-500" : ""}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {topBar.isActive && (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          )}
                          Top Bar - {topBar._id}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          Created:{" "}
                          {new Date(topBar.createdAt!).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {!topBar.isActive && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleActivateTopBar(topBar._id!)}
                            disabled={activateTopBarMutation.isPending}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Set Active
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedTopBar(topBar);
                            setIsTopBarDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        {!topBar.isActive && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteTopBar(topBar._id!)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Languages</p>
                        <p className="text-muted-foreground">
                          {topBar.languages.length}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Currencies</p>
                        <p className="text-muted-foreground">
                          {topBar.currencies.length}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">News Badge</p>
                        <p className="text-muted-foreground">
                          {topBar.news.badge}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Social Links</p>
                        <p className="text-muted-foreground">
                          {topBar.socialLinks.length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-8">
                  <p className="text-center text-muted-foreground">
                    No top bars found. Create your first top bar.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      {selectedHeader && (
        <HeaderEditDialog
          header={selectedHeader}
          open={isHeaderDialogOpen}
          onOpenChange={setIsHeaderDialogOpen}
        />
      )}
      {selectedTopBar && (
        <TopBarEditDialog
          topBar={selectedTopBar}
          open={isTopBarDialogOpen}
          onOpenChange={setIsTopBarDialogOpen}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isHeaderDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Header</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this header? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setIsHeaderDeleteDialogOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteHeader}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isTopBarDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Top Bar</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this top bar? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setIsTopBarDeleteDialogOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteTopBar}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
