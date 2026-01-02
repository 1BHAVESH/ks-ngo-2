import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  useAddTestimonialMutation,
  useGetStatsQuery,
  useUpdateSatesMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
  useGetTestimonialQuery,
} from "@/redux/features/adminApi";

// Validation Schemas
const statsSchema = yup.object({
  Cows_Rescued: yup
    .number()
    .typeError("Must be a number")
    .required("Cows rescued is required")
    .min(0, "Must be at least 0")
    .integer("Must be a whole number"),
  Active_Volunteers: yup
    .number()
    .typeError("Must be a number")
    .required("Active volunteers is required")
    .min(0, "Must be at least 0")
    .integer("Must be a whole number"),
  Years_of_Service: yup
    .number()
    .typeError("Must be a number")
    .required("Years of service is required")
    .min(0, "Must be at least 0")
    .integer("Must be a whole number"),
  Successful_Adoptions: yup
    .number()
    .typeError("Must be a number")
    .required("Successful adoptions is required")
    .min(0, "Must be at least 0")
    .integer("Must be a whole number"),
});

const testimonialSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .trim(),
  position: yup
    .string()
    .required("Position is required")
    .min(2, "Position must be at least 2 characters")
    .max(100, "Position must not exceed 100 characters")
    .trim(),
  message: yup
    .string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must not exceed 500 characters")
    .trim(),
});

const HomePage = () => {
  const [openSection, setOpenSection] = useState(null);
  const [editingTestimonialId, setEditingTestimonialId] = useState(null);

  // API Hooks
  const { data: statsData, isLoading: statsLoading, refetch: refetchStats } = useGetStatsQuery();
  const { data: testimonialData, isLoading: testimonialLoading, refetch: refetchTestimonials } = useGetTestimonialQuery();
  
  const [updateStats, { isLoading: updateStatsLoading }] = useUpdateSatesMutation();
  const [addTestimonial, { isLoading: addTestimonialLoading }] = useAddTestimonialMutation();
  const [updateTestimonial, { isLoading: updateTestimonialLoading }] = useUpdateTestimonialMutation();
  const [deleteTestimonial, { isLoading: deleteTestimonialLoading }] = useDeleteTestimonialMutation();

  // Form Hook with dynamic resolver
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(openSection === "stats" ? statsSchema : testimonialSchema),
    mode: "onChange", // Validates on change
  });

  // Local State
  const [stats, setStats] = useState({
    Cows_Rescued: 0,
    Active_Volunteers: 0,
    Years_of_Service: 0,
    Successful_Adoptions: 0,
  });
  const [testimonials, setTestimonials] = useState([]);

  // Sync stats data from API to local state
  useEffect(() => {
    if (statsData) {
      setStats({
        Cows_Rescued: statsData.Cows_Rescued || 0,
        Active_Volunteers: statsData.Active_Volunteers || 0,
        Years_of_Service: statsData.Years_of_Service || 0,
        Successful_Adoptions: statsData.Successful_Adoptions || 0,
      });
    }
  }, [statsData]);

  // Sync testimonials data from API to local state
  useEffect(() => {
    if (testimonialData) {
      setTestimonials(testimonialData.testimonials || testimonialData || []);
    }
  }, [testimonialData]);

  // Open Modal Handler
  const handleOpenModal = (section, testimonial = null) => {
    setOpenSection(section);

    if (section === "stats") {
      reset(stats);
    }

    if (section === "testimonials") {
      if (testimonial) {
        const testimonialId = testimonial._id || testimonial.id;
        reset({
          name: testimonial.name,
          position: testimonial.position,
          message: testimonial.message,
        });
        setEditingTestimonialId(testimonialId);
      } else {
        reset({ name: "", position: "", message: "" });
        setEditingTestimonialId(null);
      }
    }
  };

  // Close Modal Handler
  const handleCloseModal = () => {
    setOpenSection(null);
    reset();
    setEditingTestimonialId(null);
  };

  // Form Submit Handler
  const onSubmit = async (formData) => {
    try {
      if (openSection === "stats") {
        const updatedStats = {
          Cows_Rescued: +formData.Cows_Rescued,
          Active_Volunteers: +formData.Active_Volunteers,
          Years_of_Service: +formData.Years_of_Service,
          Successful_Adoptions: +formData.Successful_Adoptions,
        };

        await updateStats(updatedStats).unwrap();
        setStats(updatedStats);
        refetchStats();
      }

      if (openSection === "testimonials") {
        const testimonialData = {
          name: formData.name.trim(),
          position: formData.position.trim(),
          message: formData.message.trim(),
        };

        if (editingTestimonialId) {
          await updateTestimonial({
            id: editingTestimonialId,
            testimonialData,
          }).unwrap();
        } else {
          await addTestimonial(testimonialData).unwrap();
        }
        
        refetchTestimonials();
      }

      handleCloseModal();
    } catch (error) {
      console.error("Failed to update:", error);
      alert("Failed to save changes. Please try again.");
    }
  };

  // Delete Testimonial Handler
  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) {
      return;
    }

    try {
      await deleteTestimonial(id).unwrap();
      refetchTestimonials();
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
      alert("Failed to delete testimonial. Please try again.");
    }
  };

  // Combined Loading State
  const isLoading = statsLoading || testimonialLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-3 sm:p-4 md:p-6 space-y-6 sm:space-y-8">
      {/* --------- STATS SECTION --------- */}
      <div className="bg-gray-800 rounded-xl p-4 sm:p-6 shadow-xl border border-gray-700">
        <SectionHeader
          title="📊 Statistics Section"
          onClick={() => handleOpenModal("stats")}
        />

        {/* Desktop Table */}
        <DesktopTable
          headers={[
            "🐄 Cows Rescued",
            "🙋 Active Volunteers",
            "📅 Years of Service",
            "🏠 Successful Adoptions",
          ]}
        >
          <tr className="hover:bg-gray-750 transition">
            {Object.values(stats).map((v, i) => (
              <td
                key={i}
                className="border border-gray-600 p-3 sm:p-4 text-center text-lg sm:text-xl font-bold text-blue-400"
              >
                {v}
              </td>
            ))}
          </tr>
        </DesktopTable>

        {/* Mobile Cards */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          {[
            {
              label: "Cows Rescued",
              value: stats.Cows_Rescued,
              icon: "🐄",
              color: "yellow",
            },
            {
              label: "Active Volunteers",
              value: stats.Active_Volunteers,
              icon: "🙋",
              color: "blue",
            },
            {
              label: "Years of Service",
              value: stats.Years_of_Service,
              icon: "📅",
              color: "green",
            },
            {
              label: "Successful Adoptions",
              value: stats.Successful_Adoptions,
              icon: "🏠",
              color: "purple",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`bg-gray-900 rounded-lg p-4 border-2 border-${stat.color}-500/30 hover:border-${stat.color}-500 transition`}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className={`text-2xl font-bold text-${stat.color}-400 mb-1`}>
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* --------- TESTIMONIALS SECTION --------- */}
      <div className="bg-gray-800 rounded-xl p-4 sm:p-6 shadow-xl border border-gray-700">
        {testimonialData?.testimonials?.length > 2 ? "" : (
          <SectionHeader
            title="💬 Testimonials"
            onClick={() => handleOpenModal("testimonials")}
            btnText="➕ Add New"
          />
        )}

        {testimonials.length === 0 ? (
          <div className="text-center py-12 bg-gray-900 rounded-lg">
            <div className="text-5xl mb-4">💬</div>
            <p className="text-gray-400 text-lg">No testimonials yet</p>
            <button
              onClick={() => handleOpenModal("testimonials")}
              className="mt-4 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            >
              Add First Testimonial
            </button>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <DesktopTable headers={["Name", "Position", "Message", "Actions"]}>
              {testimonials.map((t) => {
                const testimonialId = t._id || t.id;
                
                return (
                  <tr key={testimonialId} className="hover:bg-gray-750 transition">
                    <td className="border border-gray-600 p-3 font-semibold text-gray-200">
                      {t.name}
                    </td>
                    <td className="border border-gray-600 p-3 text-gray-400">
                      {t.position}
                    </td>
                    <td className="border border-gray-600 p-3 text-gray-300 max-w-md">
                      <div className="line-clamp-2">{t.message}</div>
                    </td>
                    <td className="border border-gray-600 p-3">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleOpenModal("testimonials", t)}
                          className="bg-yellow-600 cursor-pointer hover:bg-yellow-700 text-white px-3 py-1.5 rounded text-sm transition"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTestimonial(testimonialId)}
                          disabled={deleteTestimonialLoading}
                          className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm transition disabled:opacity-50"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </DesktopTable>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {testimonials.map((t) => {
                const testimonialId = t._id || t.id;
                
                return (
                  <div
                    key={testimonialId}
                    className="bg-gray-900 rounded-lg p-4 border border-gray-700 hover:border-blue-500 transition shadow-lg"
                  >
                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-white mb-1">
                        {t.name}
                      </h3>
                      <p className="text-sm text-gray-400">{t.position}</p>
                    </div>

                    <p className="text-gray-300 text-sm mb-4 line-clamp-3 bg-gray-800 p-3 rounded">
                      "{t.message}"
                    </p>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenModal("testimonials", t)}
                        className="flex-1 cursor-pointer bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm transition"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTestimonial(testimonialId)}
                        disabled={deleteTestimonialLoading}
                        className="flex-1 cursor-pointer bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition disabled:opacity-50"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* --------- MODAL --------- */}
      {openSection && (
        <Modal onClose={handleCloseModal}>
          {openSection === "stats" && (
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                📊 Edit Statistics
              </h3>

              {[
                { name: "Cows_Rescued", label: "🐄 Cows Rescued" },
                { name: "Active_Volunteers", label: "🙋 Active Volunteers" },
                { name: "Years_of_Service", label: "📅 Years of Service" },
                {
                  name: "Successful_Adoptions",
                  label: "🏠 Successful Adoptions",
                },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {field.label}
                  </label>
                  <input
                    type="number"
                    {...register(field.name)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                      errors[field.name] ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter number"
                  />
                  {errors[field.name] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[field.name]?.message}
                    </p>
                  )}
                </div>
              ))}

              <button
                onClick={handleSubmit(onSubmit)}
                disabled={updateStatsLoading}
                className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updateStatsLoading ? "Saving..." : "💾 Save Statistics"}
              </button>
            </div>
          )}

          {openSection === "testimonials" && (
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                {editingTestimonialId ? "✏️ Edit" : "➕ Add"} Testimonial
              </h3>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  👤 Name
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  💼 Position
                </label>
                <input
                  type="text"
                  {...register("position")}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    errors.position ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter position/role"
                />
                {errors.position && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.position?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  💬 Message
                </label>
                <textarea
                  {...register("message")}
                  rows="4"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter testimonial message"
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.message?.message}
                  </p>
                )}
              </div>

              <button
                onClick={handleSubmit(onSubmit)}
                disabled={addTestimonialLoading || updateTestimonialLoading}
                className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addTestimonialLoading || updateTestimonialLoading
                  ? "Saving..."
                  : editingTestimonialId
                  ? "💾 Update Testimonial"
                  : "➕ Add Testimonial"}
              </button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default HomePage;

// ========== REUSABLE COMPONENTS ==========

const SectionHeader = ({ title, onClick, btnText = "✏️ Update" }) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
      {title}
    </h2>
    <button
      onClick={onClick}
      className="w-full cursor-pointer sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold transition shadow-lg hover:shadow-xl"
    >
      {btnText}
    </button>
  </div>
);

const DesktopTable = ({ headers, children }) => (
  <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg">
    <table className="w-full border-collapse bg-gray-900 text-white">
      <thead className="bg-gray-700">
        <tr>
          {headers.map((h) => (
            <th
              key={h}
              className="border border-gray-600 p-3 sm:p-4 text-left font-semibold text-sm sm:text-base"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  </div>
);

const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50 overflow-y-auto">
    <div className="bg-white w-full max-w-lg p-4 sm:p-6 rounded-xl shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
      {children}

      <button
        onClick={onClose}
        className="mt-6 w-full cursor-pointer bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition"
      >
        ✖️ Close
      </button>
    </div>
  </div>
);