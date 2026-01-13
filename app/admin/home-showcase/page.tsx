"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { HomeShowcase } from "@/lib/types";

export default function HomeShowcasePage() {
  const router = useRouter();
  const [showcases, setShowcases] = useState<HomeShowcase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchShowcases();
  }, []);

  const fetchShowcases = async () => {
    try {
      const response = await fetch("/api/home-showcase");
      if (!response.ok) throw new Error("Failed to fetch showcases");
      const data = await response.json();
      setShowcases(data);
    } catch (err) {
      setError("Failed to load showcases");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this showcase item?")) return;

    try {
      const response = await fetch(`/api/home-showcase/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      setShowcases(showcases.filter((s) => s.id !== id));
    } catch (err) {
      alert("Failed to delete showcase");
      console.error(err);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      residential: "bg-slate-100 text-slate-800",
      commercial: "bg-green-100 text-green-800",
      institutional: "bg-purple-100 text-purple-800",
      industrial: "bg-orange-100 text-orange-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Home Page - Recent Work
            </h1>
            <p className="text-gray-600 mt-2">
              Manage images displayed in the Recent Work section on homepage
              (max 2 items)
            </p>
          </div>
          <Link
            href="/admin/home-showcase/new"
            className="bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-900 transition"
          >
            + Add Showcase Item
          </Link>
        </div>

        {showcases.length >= 2 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-yellow-800 text-sm">
              ⚠️ Maximum 2 showcase items reached. Delete an existing item to
              add a new one.
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {showcases.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg mb-4">No showcase items yet</p>
          <p className="text-gray-500 mb-6">
            Add items to display in the Recent Work section on homepage
          </p>
          <Link
            href="/admin/home-showcase/new"
            className="inline-block bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-900 transition"
          >
            Add First Item
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {showcases.map((showcase) => (
            <div
              key={showcase.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="relative h-64">
                <Image
                  src={showcase.image}
                  alt={showcase.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
                      showcase.category
                    )}`}
                  >
                    {showcase.category.toUpperCase()}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                    Position: {showcase.order}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {showcase.title}
                </h3>

                <div className="flex gap-2 mt-4">
                  <Link
                    href={`/admin/home-showcase/${showcase.id}/edit`}
                    className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition text-center"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(showcase.id)}
                    className="flex-1 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link
          href="/admin"
          className="text-slate-700 hover:text-slate-900 transition"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
