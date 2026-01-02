import {
  useExcelImportDonationsMutation,
  useGetDonateQuery,
} from "@/redux/features/adminApi";
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002";

const AdminDonation = () => {
  const [excelImportDonations] = useExcelImportDonationsMutation();

  // UI States
  const [searchTerm, setSearchTerm] = useState("");
  const [methodFilter, setMethodFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);

  // New state for column sorting
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc"); // 'asc' or 'desc'

  // Fetch data with backend pagination and filters
  const { data, isLoading, refetch } = useGetDonateQuery({
    page,
    limit: pageSize,
    search: searchTerm,
    paymentMethod: methodFilter,
    sortBy: sortBy,
  });

  const donations = data?.record || [];
  const totalCount = data?.count || 0;
  const totalPages = data?.totalPages || 1;
  const currentPage = data?.current_page || 1;
  const paginationArray = data?.pagination || [];

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [searchTerm, methodFilter, sortBy, pageSize]);

  // Handle column header click for sorting
  const handleSort = (column) => {
    if (sortColumn === column) {
      // Toggle direction if same column
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // New column, start with ascending
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Sort the donations array based on selected column
  const getSortedDonations = () => {
    if (!sortColumn) return donations;

    const sorted = [...donations].sort((a, b) => {
      let aVal, bVal;

      switch (sortColumn) {
        case "donorName":
          aVal = a.donorName?.toLowerCase() || "";
          bVal = b.donorName?.toLowerCase() || "";
          break;
        case "email":
          aVal = a.email?.toLowerCase() || "";
          bVal = b.email?.toLowerCase() || "";
          break;
        case "phone":
          aVal = a.phone || "";
          bVal = b.phone || "";
          break;
        case "amount":
          aVal = a.amount || 0;
          bVal = b.amount || 0;
          break;
        case "paymentMethod":
          aVal = a.paymentMethod?.toLowerCase() || "";
          bVal = b.paymentMethod?.toLowerCase() || "";
          break;
        case "date":
          aVal = new Date(a.createdAt).getTime();
          bVal = new Date(b.createdAt).getTime();
          break;
        default:
          return 0;
      }

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  };

  const sortedDonations = getSortedDonations();

  // Render sort icon
  const SortIcon = ({ column }) => {
    if (sortColumn !== column) {
      return <span className="text-gray-500 ml-1">⇅</span>;
    }
    return (
      <span className="text-green-400 ml-1">
        {sortDirection === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  // Excel Export (exports all filtered data)
  const handleExportExcel = () => {
    if (!donations.length) return;

    const excelData = donations.map((d) => ({
      Donor: d.donorName,
      Email: d.email,
      Phone: d.phone,
      Amount: d.amount,
      Method: d.paymentMethod,
      Photo: d.paymentScreenshot,
      Date: new Date(d.createdAt).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Donations");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(fileData, `donations_${Date.now()}.xlsx`);
  };

  const handleExcelUpload = async () => {
    if (!file) return setMessage("Please select an Excel (.xlsx) file first");

    try {
      setUploading(true);
      setMessage("");
 
      const formData = new FormData();
      formData.append("excelFile", file);

      const res = await excelImportDonations(formData).unwrap();

      setMessage(res.message || "Upload Success 🎉");
      toast.success(res.message || "Upload Success 🎉");
      refetch();
      
      setTimeout(() => {
        setShowImportModal(false);
        setFile(null);
        setMessage("");
      }, 2000);
    } catch (err) {
      console.log(err);
      
      toast.error(err?.data?.message || "Upload failed");
      
      if (err?.data?.download) {
        setMessage("Some rows had errors. Download error file 👇");
        window.open(err.data.download, "_blank");
      } else {
        setMessage(err?.data?.message || "Upload failed ❌");
      }
    } finally {
      setUploading(false);
    }
  };

  const handleCloseModal = () => {
    setShowImportModal(false);
    setFile(null);
    setMessage("");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading donations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 min-h-screen bg-gray-900">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-400">
            Donation Submissions
          </h2>
          <p className="text-gray-400 mt-1">
            Total Donations: {totalCount} | Page: {currentPage} of {totalPages}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => setShowImportModal(true)}
            className="bg-blue-600 cursor-pointer hover:bg-blue-500 text-white px-4 py-2 rounded shadow transition"
          >
            📥 Import Excel
          </button>

          <button
            onClick={handleExportExcel}
            className="bg-green-600 cursor-pointer hover:bg-green-500 text-white px-4 py-2 rounded shadow transition"
          >
            📊 Export Excel
          </button>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-gray-800 p-3 sm:p-4 rounded-xl border border-gray-700 mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="🔍 Search name / email / phone..."
          className="px-3 py-2 rounded bg-gray-900 text-gray-200 border border-gray-700 outline-none focus:border-green-500 transition"
        />

        <select
          value={methodFilter}
          onChange={(e) => setMethodFilter(e.target.value)}
          className="px-3 py-2 rounded bg-gray-900 text-gray-200 border border-gray-700 focus:border-green-500 transition"
        >
          <option value="">💳 All Payment Methods</option>
          <option value="UPI">UPI</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Cash">Cash</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 rounded bg-gray-900 text-gray-200 border border-gray-700 focus:border-green-500 transition"
        >
          <option value="">🔄 Sort By</option>
          <option value="amount-asc">Amount Low → High</option>
          <option value="amount-desc">Amount High → Low</option>
          <option value="date-asc">Oldest First</option>
          <option value="date-desc">Newest First</option>
        </select>

        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="px-3 py-2 rounded bg-gray-900 text-gray-200 border border-gray-700 focus:border-green-500 transition"
        >
          <option value={5}>📄 5 / Page</option>
          <option value={10}>📄 10 / Page</option>
          <option value={20}>📄 20 / Page</option>
          <option value={50}>📄 50 / Page</option>
        </select>
      </div>

      {/* RESULTS COUNT */}
      <div className="text-gray-400 mb-4 text-xs sm:text-sm px-1">
        Showing{" "}
        <span className="text-green-400 font-semibold">
          {donations.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}-{Math.min(currentPage * pageSize, totalCount)}
        </span>{" "}
        of{" "}
        <span className="text-green-400 font-semibold">
          {totalCount}
        </span>{" "}
        donations
      </div>

      {/* DESKTOP TABLE WITH SORTABLE HEADERS */}
      <div className="hidden lg:block overflow-x-auto bg-gray-800 rounded-xl border border-gray-700 shadow-xl">
        <table className="w-full text-left text-gray-300">
          <thead className="bg-gray-700 text-gray-200 uppercase text-xs sm:text-sm">
            <tr>
              <th 
                className="px-3 sm:px-4 py-3 cursor-pointer hover:bg-gray-600 transition select-none"
                onClick={() => handleSort("donorName")}
              >
                <div className="flex items-center">
                  Donor Name
                  <SortIcon column="donorName" />
                </div>
              </th>
              <th 
                className="px-3 sm:px-4 py-3 cursor-pointer hover:bg-gray-600 transition select-none"
                onClick={() => handleSort("email")}
              >
                <div className="flex items-center">
                  Email
                  <SortIcon column="email" />
                </div>
              </th>
              <th 
                className="px-3 sm:px-4 py-3 cursor-pointer hover:bg-gray-600 transition select-none"
                onClick={() => handleSort("phone")}
              >
                <div className="flex items-center">
                  Phone
                  <SortIcon column="phone" />
                </div>
              </th>
              <th 
                className="px-3 sm:px-4 py-3 cursor-pointer hover:bg-gray-600 transition select-none"
                onClick={() => handleSort("amount")}
              >
                <div className="flex items-center">
                  Amount
                  <SortIcon column="amount" />
                </div>
              </th>
              <th 
                className="px-3 sm:px-4 py-3 cursor-pointer hover:bg-gray-600 transition select-none"
                onClick={() => handleSort("paymentMethod")}
              >
                <div className="flex items-center">
                  Payment Method
                  <SortIcon column="paymentMethod" />
                </div>
              </th>
              <th 
                className="px-3 sm:px-4 py-3 cursor-pointer hover:bg-gray-600 transition select-none"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center">
                  Date
                  <SortIcon column="date" />
                </div>
              </th>
              <th className="px-3 sm:px-4 py-3">Photo</th>
            </tr>
          </thead>
          <tbody>
            {sortedDonations.length > 0 ? (
              sortedDonations.map((donation) => (
                <tr
                  key={donation._id}
                  className="border-b border-gray-700 hover:bg-gray-750 transition"
                >
                  <td className="px-3 sm:px-4 py-3 font-medium">
                    {donation.donorName}
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-sm">
                    {donation.email}
                  </td>
                  <td className="px-3 sm:px-4 py-3">{donation.phone}</td>
                  <td className="px-3 sm:px-4 py-3 text-green-400 font-semibold">
                    ₹{donation.amount.toLocaleString()}
                  </td>
                  <td className="px-3 sm:px-4 py-3">
                    <span className="px-2 py-1 bg-blue-900 text-blue-200 rounded text-xs whitespace-nowrap">
                      {donation.paymentMethod}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm">
                    {new Date(donation.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-3 sm:px-4 py-3">
                    {donation.paymentScreenshot ? (
                      <button
                        onClick={() => setSelectedImage(donation.paymentScreenshot)}
                        className="text-green-400 cursor-pointer hover:text-green-300 underline text-sm"
                      >
                        View
                      </button>
                    ) : (
                      <span className="text-gray-500 text-sm">N/A</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                  No donations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="lg:hidden space-y-3 sm:space-y-4">
        {sortedDonations.length > 0 ? (
          sortedDonations.map((donation) => (
            <div
              key={donation._id}
              className="bg-gray-800 p-3 sm:p-4 rounded-xl border border-gray-700 space-y-3 shadow-lg hover:border-green-500 transition"
            >
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-green-400 truncate">
                    {donation.donorName}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 truncate">
                    {donation.email}
                  </p>
                </div>
                <span className="text-lg sm:text-xl font-bold text-green-400 whitespace-nowrap">
                  ₹{donation.amount.toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                <div className="bg-gray-900 p-2 rounded">
                  <span className="text-gray-500 block mb-1">📞 Phone</span>
                  <p className="text-gray-300 font-medium">{donation.phone}</p>
                </div>
                <div className="bg-gray-900 p-2 rounded">
                  <span className="text-gray-500 block mb-1">💳 Method</span>
                  <span className="inline-block px-2 py-1 bg-blue-900 text-blue-200 rounded text-xs">
                    {donation.paymentMethod}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                <span className="text-xs text-gray-500">
                  📅{" "}
                  {new Date(donation.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                {donation.paymentScreenshot ? (
                  <button
                    onClick={() => setSelectedImage(donation.paymentScreenshot)}
                    className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded text-xs sm:text-sm transition"
                  >
                    📄 View Receipt
                  </button>
                ) : (
                  <span className="text-gray-500 text-xs sm:text-sm">
                    No Receipt
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-700 text-center">
            <div className="text-4xl sm:text-5xl mb-3">📭</div>
            <p className="text-gray-500 text-sm sm:text-base">
              No donations found
            </p>
            <p className="text-gray-600 text-xs sm:text-sm mt-2">
              Try adjusting your filters
            </p>
          </div>
        )}
      </div>

      {/* PAGINATION */}
      {donations.length > 0 && totalPages > 0 && (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-gray-400 text-sm">
            Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalCount)} of {totalCount} donations
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 cursor-pointer bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="hidden sm:inline">⬅ Previous</span>
              <span className="sm:hidden">⬅</span>
            </button>

            <div className="flex items-center gap-1">
              {paginationArray.map((pageNum, idx) => {
                if (totalPages > 7) {
                  if (pageNum === 1) {
                    return (
                      <button
                        key={`page-${pageNum}`}
                        onClick={() => setPage(pageNum)}
                        className={`px-3 py-2 cursor-pointer rounded-lg transition-colors ${
                          currentPage === pageNum
                            ? "bg-green-500 text-white font-semibold"
                            : "bg-gray-700 hover:bg-gray-600 text-white"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                  
                  if (pageNum === totalPages) {
                    return (
                      <React.Fragment key={`page-${pageNum}`}>
                        {paginationArray[idx - 1] !== pageNum - 1 && (
                          <span className="px-2 text-gray-500">...</span>
                        )}
                        <button
                          onClick={() => setPage(pageNum)}
                          className={`px-3 py-2 cursor-pointer rounded-lg transition-colors ${
                            currentPage === pageNum
                              ? "bg-green-500 text-white font-semibold"
                              : "bg-gray-700 hover:bg-gray-600 text-white"
                          }`}
                        >
                          {pageNum}
                        </button>
                      </React.Fragment>
                    );
                  }
                  
                  if (Math.abs(pageNum - currentPage) <= 1) {
                    return (
                      <React.Fragment key={`page-${pageNum}`}>
                        {idx > 0 && paginationArray[idx - 1] !== pageNum - 1 && pageNum !== 2 && (
                          <span className="px-2 text-gray-500">...</span>
                        )}
                        <button
                          onClick={() => setPage(pageNum)}
                          className={`px-3 py-2 cursor-pointer rounded-lg transition-colors ${
                            currentPage === pageNum
                              ? "bg-green-500 text-white font-semibold"
                              : "bg-gray-700 hover:bg-gray-600 text-white"
                          }`}
                        >
                          {pageNum}
                        </button>
                      </React.Fragment>
                    );
                  }
                  
                  return null;
                }
                
                return (
                  <button
                    key={`page-${pageNum}`}
                    onClick={() => setPage(pageNum)}
                    className={`px-3 py-2 cursor-pointer rounded-lg transition-colors ${
                      currentPage === pageNum
                        ? "bg-green-500 text-white font-semibold"
                        : "bg-gray-700 hover:bg-gray-600 text-white"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 cursor-pointer bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="hidden sm:inline">Next ➡</span>
              <span className="sm:hidden">➡</span>
            </button>
          </div>
        </div>
      )}

      {/* IMPORT EXCEL MODAL */}
      {showImportModal && (
        <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-green-400">
                📥 Import Excel File
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white text-2xl font-bold transition"
              >
                ✕
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-medium mb-3">
                Select Excel File (.xlsx)
              </label>
              
              <div className="relative">
                <input
                  type="file"
                  accept=".xlsx"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full px-4 py-3 bg-gray-900 text-gray-300 border-2 border-gray-700 rounded-lg outline-none focus:border-blue-500 transition file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer hover:file:bg-blue-500"
                />
              </div>

              {file && (
                <div className="mt-3 p-3 bg-gray-900 rounded-lg border border-gray-700">
                  <p className="text-sm text-gray-400">
                    <span className="text-green-400 font-medium">Selected:</span>{" "}
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Size: {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              )}
            </div>

            {message && (
              <div className={`mb-4 p-3 rounded-lg border ${
                message.includes("Success") || message.includes("🎉")
                  ? "bg-green-900/30 border-green-700 text-green-400"
                  : message.includes("failed") || message.includes("❌")
                  ? "bg-red-900/30 border-red-700 text-red-400"
                  : "bg-yellow-900/30 border-yellow-700 text-yellow-400"
              }`}>
                <p className="text-sm">{message}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleCloseModal}
                className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleExcelUpload}
                disabled={uploading || !file}
                className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Uploading...
                  </span>
                ) : (
                  "Upload"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IMAGE MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute cursor-pointer top-5 right-5 text-white text-3xl font-bold hover:text-gray-300 transition"
          >
            ✕
          </button>

          <img
            src={`${API_URL}/uploads${selectedImage}`}
            alt="Payment Receipt"
            className="max-w-[90%] max-h-[85vh] object-contain rounded"
          />
        </div>
      )}
    </div>
  );
};

export default AdminDonation;