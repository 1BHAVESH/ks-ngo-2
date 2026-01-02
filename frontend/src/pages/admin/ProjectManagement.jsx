import React, { useState } from "react";
import CowForm from "@/components/admin/ProjectForm";
import {
  useDeleteCowMutation,
  useGetCowsQuery,
  useToggleCowMutation,
} from "@/redux/features/adminApi";

import { Switch } from "@/components/ui/switch";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/";

export default function ProjectManagement() {
  const { data, isLoading, refetch } = useGetCowsQuery();
  const [deleteCow] = useDeleteCowMutation();
  const [updateCowStatus] = useToggleCowMutation();

  const [open, setOpen] = useState(false);
  const [selectedCow, setSelectedCow] = useState(null);

  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  if (isLoading) return <h1 className="text-white">Loading...</h1>;

  const cows = data?.data || [];

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this cow?")) return;

    try {
      await deleteCow(id).unwrap();
      refetch();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const sortedCows = [...cows].sort((a, b) => {
    if (!sortField) return 0;

    let valA = a[sortField];
    let valB = b[sortField];

    if (typeof valA === "string") {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    }

    if (sortOrder === "asc") {
      return valA > valB ? 1 : -1;
    } else {
      return valA < valB ? 1 : -1;
    }
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Cow Management</h1>

          <button
            onClick={() => {
              setSelectedCow(null);
              setOpen(true);
            }}
            className="bg-green-600 px-4 py-2 rounded text-white cursor-pointer"
          >
            + Add Cow
          </button>
        </div>

        {/* FORM */}
        <CowForm
          open={open}
          onOpenChange={setOpen}
          cow={selectedCow}
          length={cows.length}
        />

        {/* TABLE */}
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden mt-6">
          <table className="w-full">
            <thead className="bg-gray-700 border-b border-gray-600">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                  Image
                </th>
                <th
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-200 cursor-pointer"
                  onClick={() => handleSort("title")}
                >
                  Name{" "}
                  {sortField === "title" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>

                <th
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-200 cursor-pointer"
                  onClick={() => handleSort("isActive")}
                >
                  Active{" "}
                  {sortField === "isActive" &&
                    (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-700">
              {sortedCows.map((cow) => (
                <tr
                  key={cow._id}
                  className={`hover:bg-gray-700 ${
                    !cow.isActive ? "opacity-60" : ""
                  }`}
                >
                  {/* IMAGE */}
                  <td className="px-6 py-4">
                    <img
                      src={`${API_URL}${cow.image}`}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>

                  {/* NAME */}
                  <td className="px-6 py-4 text-white font-medium">
                    {cow.title}
                  </td>

                  {/* SHADCN SWITCH */}
                  <td className="px-6 py-4">
                    <Switch
                      className="cursor-pointer data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                      checked={cow.isActive}
                      disabled={
                        cow.isActive &&
                        cows.filter((c) => c.isActive).length === 1
                      }
                      onCheckedChange={async () => {
                        try {
                          await updateCowStatus(cow._id).unwrap();
                          refetch();
                        } catch (err) {
                          alert("Failed to update status");
                        }
                      }}
                    />
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4 space-x-3">
                    <button
                      className="bg-blue-600 px-3 py-1 rounded text-white cursor-pointer"
                      onClick={() => {
                        setSelectedCow(cow);
                        setOpen(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="bg-red-600 px-3 py-1 rounded text-white cursor-pointer"
                      onClick={() => handleDelete(cow._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
