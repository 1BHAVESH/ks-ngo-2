import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { 
  useCreateCowImageMutation, 
  useUpdateCowImageMutation 
} from '@/redux/features/adminApi';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/";

const CowForm = ({ open, onOpenChange, cow, length }) => {

  const [createCowImage] = useCreateCowImageMutation();
  const [updateCowImage] = useUpdateCowImageMutation();

  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const isEditing = !!cow;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: {
      title: "",
      order: 0,
    },
  });

  // ===== Prefill Form On Edit =====
  useEffect(() => {
    if (cow) {
      setValue("title", cow.title);
      setValue("order", cow.displayOrder);

      setImagePreview(`${API_URL}${cow.image}`);
    } else {
      reset({
        title: "",
        order: 0,
      });
      setImagePreview(null);
      setSelectedImage(null);
    }
  }, [cow, reset, setValue]);


  // ===== Image Select Handler =====
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image must be less than 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image");
        return;
      }

      setSelectedImage(file);

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };


  // ===== SUBMIT (CREATE + UPDATE BOTH) =====
  const onSubmit = async (data) => {

    // create mode me image zaroori hai
    if (!isEditing && !selectedImage) {
      alert("Please upload an image");
      return;
    }

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("order", data.order);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {

      if (isEditing) {
        // 🔥 UPDATE
        await updateCowImage({
          id: cow._id,
          formData
        }).unwrap();

        console.log("Cow Updated");

      } else {
        // 🔥 CREATE
        await createCowImage(formData).unwrap();

        console.log("Cow Created");
      }

      handleClose();

    } catch (err) {
      console.log(err);
    }
  };


  // ===== CLOSE FORM =====
  const handleClose = () => {
    onOpenChange(false);
    reset();
    setImagePreview(null);
    setSelectedImage(null);
  };


  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="[&>button]:cursor-pointer bg-zinc-900 border-zinc-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isEditing ? "Edit Cow" : "Add New Cow"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">

          {/* NAME */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Cow Name <span className="text-red-500">*</span>
            </Label>

            <Input
              id="title"
              className="bg-zinc-800 border-zinc-700"
              placeholder="Enter cow name"
              {...register("title", {
                required: "Cow name is required",
              })}
            />

            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>


          {/* IMAGE */}
          <div className="space-y-2">
            <Label>
              Cow Image <span className="text-red-500">*</span>
            </Label>

            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  className="w-full h-48 object-cover rounded-lg"
                />

                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setSelectedImage(null);
                  }}
                  className="absolute top-2 right-2 bg-red-500 rounded-full p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer">
                <Upload className="w-8 h-8 text-zinc-400 mb-2" />
                <span className="text-zinc-400 text-sm">Upload Image</span>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>


          {/* ORDER */}
          <div className="space-y-2">
            <Label>Display Order</Label>

            <Input
              type="number"
              className="bg-zinc-800 border-zinc-700"
              {...register("order", {
                valueAsNumber: true,
              })}
            />
          </div>


          {/* BUTTONS */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="bg-zinc-700"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit(onSubmit)}
              className="bg-[#d4af37] text-black"
            >
              {isEditing ? "Update Cow" : "Add Cow"}
            </Button>
          </DialogFooter>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CowForm;
