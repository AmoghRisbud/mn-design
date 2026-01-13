"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { HomeShowcase } from "@/lib/types";

export default function EditShowcasePage() {
  const router = useRouter();
  const params = useParams();
  const showcaseId = params.id as string;

  const [showcase, setShowcase] = useState<HomeShowcase | null>(null);
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (showcaseId) {
      fetchShowcase();
    }
  }, [showcaseId]);

  const fetchShowcase = async () => {
    try {
      const response = await fetch("/api/home-showcase");
      if (!response.ok) throw new Error("Failed to fetch showcases");
      const data: HomeShowcase[] = await response.json();
      const found = data.find((s) => s.id === showcaseId);

      if (!found) {
        setError("Showcase not found");
        return;
      }

      setShowcase(found);
      setFormData({
        title: found.title,
        category: found.category,
        order: found.order,
      });
      setImagePreview(found.image);
    } catch (err) {
      setError("Failed to load showcase");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
    setUploading(true);

    try {
      let imageUrl = showcase?.image;

      // Upload new image if selected
      if (imageFile) {
        imageUrl = await uploadToCloudinary(imageFile);
      }

      // Update showcase item
      const response = await fetch(`/api/home-showcase/${showcaseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          image: imageUrl,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update showcase");
      }

      router.push("/admin/home-showcase");
    } catch (err: any) {
      setError(err.message || "Failed to update showcase");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error && !showcase) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
        <Link
          href="/admin/home-showcase"
          className="text-slate-700 hover:text-slate-900 mt-4 inline-block"
        >
          ← Back to Showcases
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Showcase Item</h1>
        <p className="text-gray-600 mt-2">
          Update the showcase item for homepage
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
              Image {imageFile ? "*" : "(Leave empty to keep current)"}
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
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            disabled={uploading}
            className="flex-1 bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? "Updating..." : "Update Showcase Item"}
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
