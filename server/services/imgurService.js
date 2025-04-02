import { ImgurClient } from "imgur";
import dotenv from "dotenv";

dotenv.config();

// Create Imgur client instance
const client = new ImgurClient({
  clientId: process.env.IMGUR_CLIENT_ID,
});

export const uploadToImgur = async (imageBuffer) => {
  try {
    const response = await client.upload({
      image: imageBuffer.toString("base64"),
      type: "base64",
    });
    return response.data.link; // Returns the direct link to the image
  } catch (error) {
    console.error("Imgur upload error:", error);
    throw new Error("Failed to upload image to Imgur");
  }
};
