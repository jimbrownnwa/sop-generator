"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ProcessCategory } from "@/types";

const categories: ProcessCategory[] = [
  "Sales",
  "Operations",
  "Finance",
  "Customer Service",
  "HR",
  "Marketing",
  "Product Development",
  "Other",
];

export default function NewProcess() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    owner: "",
    category: "Operations" as ProcessCategory,
    scope_start: "",
    scope_end: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create new process
    const process = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      owner: formData.owner,
      category: formData.category,
      status: "in_progress" as const,
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    // Store in localStorage
    const processes = JSON.parse(localStorage.getItem("processes") || "[]");
    processes.push(process);
    localStorage.setItem("processes", JSON.stringify(processes));

    // Navigate to interview
    router.push(`/process/${process.id}/interview`);
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">New Process</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Let's start by gathering some basic information about the process
            you want to document.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-2"
            >
              Process Name *
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g., Artist Booking Process"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-2"
            >
              Description *
            </label>
            <textarea
              id="description"
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Briefly describe what this process accomplishes"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800"
            />
          </div>

          <div>
            <label
              htmlFor="owner"
              className="block text-sm font-medium mb-2"
            >
              Process Owner *
            </label>
            <input
              type="text"
              id="owner"
              required
              value={formData.owner}
              onChange={(e) =>
                setFormData({ ...formData, owner: e.target.value })
              }
              placeholder="Who is responsible for this process?"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium mb-2"
            >
              Category *
            </label>
            <select
              id="category"
              required
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value as ProcessCategory,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="scope_start"
                className="block text-sm font-medium mb-2"
              >
                Process Starts When...
              </label>
              <input
                type="text"
                id="scope_start"
                value={formData.scope_start}
                onChange={(e) =>
                  setFormData({ ...formData, scope_start: e.target.value })
                }
                placeholder="e.g., Lead submits inquiry"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800"
              />
            </div>

            <div>
              <label
                htmlFor="scope_end"
                className="block text-sm font-medium mb-2"
              >
                Process Ends When...
              </label>
              <input
                type="text"
                id="scope_end"
                value={formData.scope_end}
                onChange={(e) =>
                  setFormData({ ...formData, scope_end: e.target.value })
                }
                placeholder="e.g., Artist is confirmed"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
            >
              Start Interview
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
