"use client";

import * as React from "react";
import Image from "next/image";
import {
  Search as SearchIcon,
  Filter,
  ArrowUpDown,
  EllipsisVertical,
  Store,
  Tag,
  ShoppingCart,
  BadgePercent,
  Star,
  Eye,
  Edit,
  Trash,
  Plus,
  Box,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ProductStatus = "active" | "draft" | "out-of-stock" | "low-stock";

type ProductItem = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: "Course" | "E-book" | "Merchandise" | "Bundle";
  status: ProductStatus;
  rating: number;
  sales?: number;
  imageUrl?: string;
};

type OrderStatus = "processing" | "completed" | "pending" | "cancelled";

type OrderItem = {
  id: string;
  customer: string;
  date: string;
  amount: string;
  status: OrderStatus;
};

const initialProducts: ProductItem[] = [
  {
    id: "p1",
    title: "Advanced Python Programming",
    description: "Master advanced Python concepts and applications",
    price: 89.99,
    category: "Course",
    status: "active",
    rating: 5,
    sales: 1204,
    imageUrl:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p2",
    title: "JavaScript Patterns E-book",
    description: "Common patterns and best practices for modern JS",
    price: 24.99,
    category: "E-book",
    status: "draft",
    rating: 4,
    sales: 342,
    imageUrl:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p3",
    title: "Personal Wings Hoodie",
    description: "Comfortable hoodie with embroidered logo",
    price: 49.99,
    category: "Merchandise",
    status: "low-stock",
    rating: 4,
    sales: 87,
    imageUrl:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p4",
    title: "Data Science Bootcamp",
    description: "From fundamentals to real projects",
    price: 199.0,
    category: "Course",
    status: "out-of-stock",
    rating: 5,
    sales: 980,
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
  },
];

const initialOrders: OrderItem[] = [
  { id: "#ORD-7842", customer: "Sarah Johnson", date: "Nov 12, 2025", amount: "$299.00", status: "processing" },
  { id: "#ORD-7841", customer: "Michael Chen", date: "Nov 12, 2025", amount: "$89.99", status: "completed" },
  { id: "#ORD-7835", customer: "Emma Wilson", date: "Nov 11, 2025", amount: "$24.99", status: "pending" },
  { id: "#ORD-7804", customer: "David Brown", date: "Nov 09, 2025", amount: "$49.99", status: "cancelled" },
];

export default function Shop() {
  const [products, setProducts] = React.useState<ProductItem[]>(initialProducts);
  const [orders] = React.useState<OrderItem[]>(initialOrders);
  const [search, setSearch] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("All Products");
  const [sortBy, setSortBy] = React.useState("Sort by: Newest");
  const [createOpen, setCreateOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("Products");

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const el = document.getElementById("shop-search") as HTMLInputElement | null;
        el?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const filtered = products
    .filter((p) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      const matchesCat =
        categoryFilter === "All Products" ||
        (categoryFilter === "Courses" && p.category === "Course") ||
        (categoryFilter === "E-books" && p.category === "E-book") ||
        (categoryFilter === "Merchandise" && p.category === "Merchandise");
      return matchesSearch && matchesCat;
    })
    .sort((a, b) => {
      if (sortBy.includes("Newest")) return a.id < b.id ? 1 : -1;
      if (sortBy.includes("Oldest")) return a.id > b.id ? 1 : -1;
      if (sortBy.includes("Price: High")) return b.price - a.price;
      if (sortBy.includes("Price: Low")) return a.price - b.price;
      if (sortBy.includes("Rating")) return b.rating - a.rating;
      return 0;
    });

  const statusBadge = (s: ProductStatus) =>
    s === "active"
      ? "bg-green-100 text-green-700"
      : s === "draft"
      ? "bg-gray-100 text-gray-700"
      : s === "out-of-stock"
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700";

  const orderBadge = (s: OrderStatus) =>
    s === "processing"
      ? "bg-blue-100 text-blue-700"
      : s === "completed"
      ? "bg-green-100 text-green-700"
      : s === "pending"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <main className="p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-secondary mb-2">Products</h2>
          <p className="text-gray-600">Manage your educational products, courses, and merchandise</p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Product
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-xl p-1 shadow-sm border border-gray-100 mb-8 inline-flex">
        {["Products", "Categories", "Orders", "Discounts & Coupons"].map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === t ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Products</p>
              <p className="text-2xl font-bold text-secondary mt-1">{products.filter((p) => p.status === "active").length}</p>
              <p className="text-accent text-sm mt-1">+5 this week</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Store className="text-primary w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Draft Products</p>
              <p className="text-2xl font-bold text-secondary mt-1">{products.filter((p) => p.status === "draft").length}</p>
              <p className="text-gray-500 text-sm mt-1">Review pending</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Tag className="text-gray-600 w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Out of Stock</p>
              <p className="text-2xl font-bold text-secondary mt-1">{products.filter((p) => p.status === "out-of-stock").length}</p>
              <p className="text-red-500 text-sm mt-1">Restock needed</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="text-red-600 w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Low Stock Items</p>
              <p className="text-2xl font-bold text-secondary mt-1">{products.filter((p) => p.status === "low-stock").length}</p>
              <p className="text-red-500 text-sm mt-1">Needs attention</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Box className="text-red-600 w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-2">
            {["All Products", "Courses", "E-books", "Merchandise"].map((label) => (
              <Button
                key={label}
                variant={categoryFilter === label ? "default" : "secondary"}
                className={categoryFilter === label ? "" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
                onClick={() => setCategoryFilter(label)}
              >
                {label}
              </Button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="pl-10 w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sort by: Newest">Sort by: Newest</SelectItem>
                  <SelectItem value="Sort by: Oldest">Sort by: Oldest</SelectItem>
                  <SelectItem value="Sort by: Price: High">Sort by: Price: High</SelectItem>
                  <SelectItem value="Sort by: Price: Low">Sort by: Price: Low</SelectItem>
                  <SelectItem value="Sort by: Rating">Sort by: Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex items-center mt-4">
          <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              id="shop-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search... (Cmd+K)"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {filtered.map((p) => (
          <div key={p.id} className="bg-card rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="relative mb-4">
              {p.imageUrl && (
                <Image
                  src={p.imageUrl}
                  alt={p.title}
                  width={600}
                  height={160}
                  className="w-full h-40 object-cover rounded-lg"
                  unoptimized
                />
              )}
              <span className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs ${statusBadge(p.status)}`}>
                {p.status === "out-of-stock" ? "Out of Stock" : p.status === "low-stock" ? "Low Stock" : p.status.charAt(0).toUpperCase() + p.status.slice(1)}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="absolute top-2 right-2 bg-white/80">
                    <EllipsisVertical className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="w-4 h-4 mr-2" /> View
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="w-4 h-4 mr-2" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Trash className="w-4 h-4 mr-2" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mb-4">
              <h4 className="font-semibold text-secondary mb-1">{p.title}</h4>
              <p className="text-gray-600 text-sm mb-2">{p.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-secondary">${p.price.toFixed(2)}</span>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < p.rating ? "text-yellow-500" : "text-gray-300"}`} fill={i < p.rating ? "currentColor" : "none"} />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Button variant="outline" className="border-gray-300">Details</Button>
              <Button className="bg-primary text-white">Add to Cart</Button>
            </div>
          </div>
        ))}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-4 shadow-sm border border-dashed border-primary/30 flex flex-col items-center justify-center text-center cursor-pointer">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
            <Plus className="text-primary text-xl" />
          </div>
          <h4 className="font-semibold text-secondary mb-2">Add New Product</h4>
          <p className="text-gray-600 text-sm">Create a new course, e-book, or merchandise</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-secondary mb-4">Sales Performance</h3>
          <div className="h-48 bg-gray-50 border border-gray-100 rounded-lg" />
        </div>
        <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-secondary mb-4">Top Selling Products</h3>
          <div className="h-48 bg-gray-50 border border-gray-100 rounded-lg" />
        </div>
      </div>

      <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-secondary">Recent Orders</h3>
          <button className="text-primary hover:text-primary/80 text-sm font-medium">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 text-sm border-b">
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-gray-100">
                  <td className="py-3 font-medium text-primary">{o.id}</td>
                  <td className="py-3">{o.customer}</td>
                  <td className="py-3">{o.date}</td>
                  <td className="py-3">{o.amount}</td>
                  <td className="py-3">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${orderBadge(o.status)}`}>
                      {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3">
                    <button className="text-primary hover:text-primary/80">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>Enter product details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                id="product-name"
                type="text"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Enter product name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                id="product-desc"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                rows={3}
                placeholder="Product description"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  id="product-price"
                  type="number"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <Select defaultValue="Course">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Course">Online Course</SelectItem>
                    <SelectItem value="E-book">E-book</SelectItem>
                    <SelectItem value="Merchandise">Merchandise</SelectItem>
                    <SelectItem value="Bundle">Bundle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <Select defaultValue="active">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                    <SelectItem value="low-stock">Low Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <Select defaultValue="5">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <p className="text-gray-500 text-sm">Drag and drop cover image here or click to upload</p>
              <Button variant="outline" className="mt-2 border-gray-300">Select File</Button>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" className="border-gray-300" onClick={() => setCreateOpen(false)}>Cancel</Button>
              <Button
                onClick={() => {
                  const nameEl = document.getElementById("product-name") as HTMLInputElement | null;
                  const descEl = document.getElementById("product-desc") as HTMLTextAreaElement | null;
                  const priceEl = document.getElementById("product-price") as HTMLInputElement | null;
                  const name = nameEl?.value.trim() || "New Product";
                  const desc = descEl?.value.trim() || "Draft product created";
                  const price = parseFloat(priceEl?.value || "0");
                  const newItem: ProductItem = {
                    id: Math.random().toString(36).slice(2),
                    title: name,
                    description: desc,
                    price: isNaN(price) ? 0 : price,
                    category: "Course",
                    status: "draft",
                    rating: 4,
                  };
                  setProducts([newItem, ...products]);
                  setCreateOpen(false);
                }}
              >
                Create
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
