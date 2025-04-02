import express from "express";
import Photo from "../models/Photo.js";
import multer from "multer";
import { uploadToImgur } from "../services/imgurService.js";

const router = express.Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Not an image! Please upload an image."), false);
    }
  },
});

// Get all photos
router.get("/", async (req, res) => {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 });
    res.json(photos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching photos", error: error.message });
  }
});

// Get photo by ID
router.get("/:id", async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }
    res.json(photo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching photo", error: error.message });
  }
});

// Upload new photo
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    // Validate required fields
    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (
      !req.body.category ||
      !req.body.category.name ||
      !req.body.category.slug
    ) {
      return res
        .status(400)
        .json({ message: "Category name and slug are required" });
    }

    // Upload to Imgur
    const imageUrl = await uploadToImgur(req.file.buffer);

    // Create new photo with all required fields
    const photo = new Photo({
      title: req.body.title,
      description: req.body.description || "",
      imageUrl: imageUrl,
      alt: req.body.alt || req.body.title, // Use title as alt text if not provided
      category: {
        name: req.body.category.name,
        slug: req.body.category.slug,
      },
      dateTaken: req.body.dateTaken || null,
      location: req.body.location || null,
    });

    const newPhoto = await photo.save();
    res.status(201).json(newPhoto);
  } catch (error) {
    console.error("Photo upload error:", error);
    res.status(400).json({
      message: "Error uploading photo",
      error: error.message,
    });
  }
});

// Update photo
router.patch("/:id", async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }

    // Update fields if provided
    if (req.body.title) photo.title = req.body.title;
    if (req.body.description) photo.description = req.body.description;
    if (req.body.alt) photo.alt = req.body.alt;
    if (req.body.category) {
      if (req.body.category.name) photo.category.name = req.body.category.name;
      if (req.body.category.slug) photo.category.slug = req.body.category.slug;
    }
    if (req.body.dateTaken) photo.dateTaken = req.body.dateTaken;
    if (req.body.location) photo.location = req.body.location;

    const updatedPhoto = await photo.save();
    res.json(updatedPhoto);
  } catch (error) {
    res.status(400).json({
      message: "Error updating photo",
      error: error.message,
    });
  }
});

// Delete photo
router.delete("/:id", async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }
    await photo.deleteOne();
    res.json({ message: "Photo deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting photo",
      error: error.message,
    });
  }
});

export default router;
