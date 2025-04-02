import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
  // Basic Photo Information
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
    trim: true,
  },

  // Category Information
  category: {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
  },

  // Photo Metadata
  dateTaken: {
    type: Date,
  },
  location: {
    type: String,
    trim: true,
    maxlength: 100,
  },

  // System Fields
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
photoSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Create indexes for better query performance
photoSchema.index({ "category.slug": 1 });
photoSchema.index({ "category.name": 1 });

export default mongoose.model("Photo", photoSchema);
