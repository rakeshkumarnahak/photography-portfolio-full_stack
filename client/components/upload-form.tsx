"use client";

import type React from "react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Upload, Calendar, MapPin, X, ImageIcon } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ConfirmationModal } from "./confirmation-modal";
import type { Category, ImageMetadata } from "@/lib/types";
import { photoApi } from "@/lib/api";
import { cn } from "@/lib/utils";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const formSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `File size should be less than 5MB`,
    })
    .refine(
      (file) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type
        ),
      {
        message: "Only .jpg, .jpeg, .png and .webp formats are supported",
      }
    ),
  category: z.string({
    required_error: "Please select a category",
  }),
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters",
    })
    .max(100, {
      message: "Title must not exceed 100 characters",
    }),
  description: z
    .string()
    .max(500, {
      message: "Description must not exceed 500 characters",
    })
    .optional(),
  dateTaken: z.date({
    required_error: "Please select a date",
  }),
  location: z
    .string()
    .max(100, {
      message: "Location must not exceed 100 characters",
    })
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface UploadFormProps {
  categories: Category[];
  onImageSelect: (file: File | null) => void;
  onMetadataChange: (metadata: ImageMetadata) => void;
  onReset: () => void;
  onUploadSuccess?: () => void;
}

export function UploadForm({
  categories,
  onImageSelect,
  onMetadataChange,
  onReset,
  onUploadSuccess,
}: UploadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      location: "",
    },
  });

  const watchedValues = form.watch();

  // Update parent component with metadata changes
  useState(() => {
    if (watchedValues.title && watchedValues.category) {
      const categoryName =
        categories.find((c) => c.slug === watchedValues.category)?.name || "";

      onMetadataChange({
        title: watchedValues.title,
        category: categoryName,
        dateTaken: watchedValues.dateTaken,
        location: watchedValues.location || "",
      });
    }
  });

  const handleImageChange = (file: File | null) => {
    if (file) {
      form.setValue("image", file);
      onImageSelect(file);
    } else {
      form.resetField("image");
      onImageSelect(null);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0]);
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("image", values.image);
      formData.append("title", values.title);
      formData.append("description", values.description || "");
      formData.append("alt", values.title);

      // Add category information
      const selectedCategory = categories.find(
        (c) => c.slug === values.category
      );
      if (selectedCategory) {
        formData.append("category[name]", selectedCategory.name);
        formData.append("category[slug]", selectedCategory.slug);
      }

      // Add optional fields if they exist
      if (values.dateTaken) {
        formData.append("dateTaken", values.dateTaken.toISOString());
      }
      if (values.location) {
        formData.append("location", values.location);
      }

      // Upload photo using API
      await photoApi.uploadPhoto(formData);

      toast({
        title: "Success!",
        description: "Photo uploaded successfully",
      });

      // Reset form and notify parent
      form.reset();
      onReset();
      onUploadSuccess?.();
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to upload photo",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmUpload = async () => {
    setShowConfirmation(false);
    setIsSubmitting(true);

    try {
      // In a real application, you would upload the image to your backend or storage service
      // For demo purposes, we'll simulate a successful upload after a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Image uploaded successfully!",
        description: "Your image has been added to the gallery.",
      });

      // Reset form
      form.reset();
      onReset();
    } catch (error) {
      toast({
        title: "Upload failed",
        description:
          "There was an error uploading your image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelUpload = () => {
    setShowConfirmation(false);
  };

  const resetForm = () => {
    form.reset();
    onReset();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-card rounded-xl border shadow-sm p-6"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="image"
              render={({
                field: { value, onChange, ...fieldProps },
                formState,
              }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <div
                      className={cn(
                        "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
                        dragActive
                          ? "border-primary bg-primary/5"
                          : "border-muted-foreground/20 hover:border-muted-foreground/50",
                        formState.errors.image && "border-destructive"
                      )}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => {
                        const input = document.createElement("input");
                        input.type = "file";
                        input.accept = "image/jpeg,image/png,image/webp";
                        input.onchange = (e) => {
                          const file =
                            (e.target as HTMLInputElement).files?.[0] || null;
                          handleImageChange(file);
                        };
                        input.click();
                      }}
                    >
                      {value ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <ImageIcon className="h-5 w-5" />
                            {value.name}
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 rounded-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleImageChange(null);
                            }}
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remove file</span>
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="h-10 w-10 text-muted-foreground" />
                          <div className="text-sm font-medium">
                            Drag & drop your image here or click to browse
                          </div>
                          <div className="text-xs text-muted-foreground">
                            JPG, PNG or WebP (max. 5MB)
                          </div>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.slug} value={category.slug}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter image title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter image description (optional)"
                      className="min-h-24 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="dateTaken"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date Taken</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <Calendar className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Enter location (optional)"
                          className="pl-9"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                type="submit"
                className="w-full sm:w-auto sm:flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Uploading...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Image
                  </span>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={resetForm}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </motion.div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={cancelUpload}
        onConfirm={confirmUpload}
        title="Confirm Upload"
        description="Are you sure you want to upload this image? It will be added to your portfolio gallery."
      />
    </>
  );
}
