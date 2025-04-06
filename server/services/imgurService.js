import { ImgurClient } from "imgur";
import dotenv from "dotenv";

dotenv.config();

// Create Imgur client instance
const client = new ImgurClient({
  clientId: process.env.IMGUR_CLIENT_ID,
});

export const uploadToImgur = async (imageBuffer) => {
  try {
    console.log("Starting Imgur upload...");
    console.log("Image buffer size:", imageBuffer.length);

    const response = await client.upload({
      image: imageBuffer.toString("base64"),
      type: "base64",
    });

    console.log("Imgur upload successful:", response.data.link);
    return response.data.link; // Returns the direct link to the image
  } catch (error) {
    console.error("Imgur upload error:", error);
    console.error("Error details:", {
      message: error.message,
      status: error.status,
      data: error.data,
    });
    throw new Error(`Failed to upload image to Imgur: ${error.message}`);
  }
};
