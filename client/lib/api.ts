import type { Category, GalleryImage, ImageMetadata } from "./types";
import { API_URL } from "./config";

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "An error occurred");
  }
  return response.json();
};

// Photo API functions
export const photoApi = {
  // Get all photos
  getAllPhotos: async () => {
    const response = await fetch(`${API_URL}/photos`);
    return handleResponse(response);
  },

  // Get photo by ID
  getPhotoById: async (id: string) => {
    const response = await fetch(`${API_URL}/photos/${id}`);
    return handleResponse(response);
  },

  // Upload new photo
  uploadPhoto: async (formData: FormData) => {
    const response = await fetch(`${API_URL}/photos`, {
      method: "POST",
      body: formData,
    });
    return handleResponse(response);
  },

  // Update photo
  updatePhoto: async (id: string, data: Partial<ImageMetadata>) => {
    const response = await fetch(`${API_URL}/photos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  // Delete photo
  deletePhoto: async (id: string) => {
    const response = await fetch(`${API_URL}/photos/${id}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  },
};
