"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function NewShowcasePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    category: "residential" as
      | "residential"
      | "commercial"
      | "institutional"
      | "industrial",
    order: 1,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    return data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!imageFile) {
      setError("Please select an image");
      return;
    }

    setUploading(true);

    try {
      // Upload image to Cloudinary
      const imageUrl = await uploadToCloudinary(imageFile);

      // Create showcase item
      const response = await fetch("/api/home-showcase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          image: imageUrl,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create showcase");
      }

      router.push("/admin/home-showcase");
    } catch (err: any) {
      setError(err.message || "Failed to create showcase");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Add Home Showcase Item
        </h1>
        <p className="text-gray-600 mt-2">
          Add an image to display in the Recent Work section on homepage
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <div className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image *
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-slate-50 file:text-slate-700
                hover:file:bg-slate-100"
              required
            />
            {imagePreview && (
              <div className="mt-4 relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent"
              placeholder="e.g., Modern Villa"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value as any })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent"
              required
            >
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="institutional">Institutional</option>
              <option value="industrial">Industrial</option>
            </select>
          </div>

          {/* Order */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Position *
            </label>
            <select
              value={formData.order}
              onChange={(e) =>
                setFormData({ ...formData, order: parseInt(e.target.value) })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent"
              required
            >
              <option value={1}>Position 1 (Left/First)</option>
              <option value={2}>Position 2 (Right/Second)</option>
            </select>
            <p className="text-sm text-gray-500 mt-1">
              Choose which position to display this item
            </p>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            disabled={uploading}
            className="flex-1 bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? "Creating..." : "Create Showcase Item"}
          </button>
          <Link
            href="/admin/home-showcase"
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-center"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
