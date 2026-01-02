import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useBankInfoCreateMutation,
  useGetBankDetailQuery,
  useUpdateBankInfoMutation,
} from "@/redux/features/adminApi";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const schema = yup.object().shape({
  accountName: yup.string().required("Account Name is required"),
  accountNumber: yup.string().required("Account Number is required"),
  ifscCode: yup
    .string()
    .required("IFSC Code is required")
    .matches(/^[A-Z0-9]+$/, "Must be uppercase alphanumeric"),
  bankName: yup.string().required("Bank Name is required"),
  qrCode: yup.mixed().nullable(),
  isActive: yup.boolean().default(true),
});

// ==================================
// FORM COMPONENT
// ==================================
function BankForm({ onSubmit, initialData = null, onCancel }) {
  const [bankInfoCreate] = useBankInfoCreateMutation();
  const [updateBankInfo] = useUpdateBankInfoMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      accountName: "",
      accountNumber: "",
      ifscCode: "",
      bankName: "",
      qrCode: null,
      isActive: true,
    },
  });

  const submitHandler = async (data) => {
  const formData = new FormData();

  formData.append("accountName", data.accountName);
  formData.append("accountNumber", data.accountNumber);
  formData.append("ifscCode", data.ifscCode);
  formData.append("bankName", data.bankName);
  formData.append("isActive", data.isActive);

  // Only append NEW qrCode file if selected
  if (data.qrCode && data.qrCode.length > 0) {
    formData.append("qrCode", data.qrCode[0]);
  }

  // IMPORTANT: Always send existing qrCode path during update
  if (initialData?._id && initialData?.qrCode) {
    formData.append("existingQrCode", initialData.qrCode);
  }

  try {
    if (initialData?._id) {
      const response = await updateBankInfo({
        id: initialData._id,
        body: formData,
      }).unwrap();
      console.log(response);
    } else {
      const response = await bankInfoCreate(formData).unwrap();
    }

    onSubmit?.();
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-5">
      <h2 className="text-xl font-bold text-gray-700">
        {initialData ? "Edit Bank Details" : "Add Bank Details"}
      </h2>

      <div>
        <label className="block text-sm font-medium mb-1">Account Name</label>
        <input
          {...register("accountName")}
          className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500"
          placeholder="Cow Seva Trust"
        />
        {errors.accountName && (
          <p className="text-red-500 text-sm">{errors.accountName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Account Number</label>
        <input
          {...register("accountNumber")}
          className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500"
          placeholder="1234567890123"
        />
        {errors.accountNumber && (
          <p className="text-red-500 text-sm">{errors.accountNumber.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">IFSC Code</label>
        <input
          {...register("ifscCode")}
          className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500"
          placeholder="SBIN0001234"
          onChange={(e) => setValue("ifscCode", e.target.value.toUpperCase())}
        />
        {errors.ifscCode && (
          <p className="text-red-500 text-sm">{errors.ifscCode.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Bank Name</label>
        <input
          {...register("bankName")}
          className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500"
          placeholder="State Bank of India"
        />
        {errors.bankName && (
          <p className="text-red-500 text-sm">{errors.bankName.message}</p>
        )}
      </div>

      {/* QR Upload */}
      <div>
        <label className="block text-sm font-medium mb-1">
          QR Code (optional)
        </label>

        <input
          type="file"
          accept="image/*"
          {...register("qrCode")}
          className="w-full border rounded-lg px-3 py-2"
        />

        {initialData?.qrCode && (
          <img
            src={`${API_URL}${initialData.qrCode}`}
            className="w-24 h-24 mt-2 border rounded"
          />
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleSubmit(submitHandler)}
          className="flex-1 cursor-pointer bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          {initialData ? "Update" : "Save"} Bank Details
        </button>

        {initialData && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 cursor-pointer bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

// ==================================
// VIEW COMPONENT
// ==================================
function BankDetailsView({ bankData, onEdit }) {
  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-700">
          Bank Account Details
        </h2>

        <button
          onClick={onEdit}
          className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Edit
        </button>
      </div>

      <div className="border-t pt-4 space-y-3">
        <p>
          <b>Account Name:</b> {bankData.accountName}
        </p>
        <p>
          <b>Account Number:</b> {bankData.accountNumber}
        </p>
        <p>
          <b>IFSC Code:</b> {bankData.ifscCode}
        </p>
        <p>
          <b>Bank Name:</b> {bankData.bankName}
        </p>

        {bankData.qrCode && (
          <img
            src={`${API_URL}${bankData.qrCode}`}
            className="w-40 h-40 object-contain border rounded"
          />
        )}

        <span
          className={`px-3 py-1 rounded-full text-sm ${
            bankData.isActive
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {bankData.isActive ? "Active" : "Inactive"}
        </span>
      </div>
    </div>
  );
}

// ==================================
// MAIN PAGE
// ==================================
export default function BankDetailsManager() {
  const { data, isLoading, refetch } = useGetBankDetailQuery();

  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) return <p>Loading...</p>;

  const bank = data?.data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
      {isEditing || !bank ? (
        <BankForm
          initialData={bank || null}
          onSubmit={() => {
            setIsEditing(false);
            refetch();
          }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <BankDetailsView bankData={bank} onEdit={() => setIsEditing(true)} />
      )}
    </div>
  );
}
