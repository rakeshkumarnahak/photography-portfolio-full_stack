// API URLs
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
export const UPLOAD_URL =
  process.env.NEXT_PUBLIC_UPLOAD_URL || "http://localhost:5000/uploads";

// Site Configuration
export const SITE_NAME =
  process.env.NEXT_PUBLIC_SITE_NAME || "Photography Portfolio";
export const MAX_IMAGE_SIZE = parseInt(
  process.env.NEXT_PUBLIC_MAX_IMAGE_SIZE || "10485760",
  10
); // 10MB default

// Image Configuration
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_IMAGE_DIMENSIONS = {
  width: 5000,
  height: 5000,
};
