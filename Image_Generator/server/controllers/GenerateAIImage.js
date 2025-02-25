import * as dotenv from "dotenv";
import { createError } from "../error.js";
import { Configuration } from "gemini-ai"; // Replace with actual import if necessary
import { GeminiApi } from "gemini-ai";

dotenv.config();

// Setup Gemini API key
const configuration = new Configuration({
  apiKey: process.env.GEMINI_API_KEY, // Use the appropriate environment variable
});
const gemini = new GeminiApi(configuration);

// Controller to generate Image
export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    const response = await gemini.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json", // Adjust if Gemini uses different response format
    });
    
    const generatedImage = response.data.data[0].b64_json; // Adjust if Gemini's response structure is different
    res.status(200).json({ photo: generatedImage });
  } catch (error) {
    next(
      createError(
        error.status,
        error?.response?.data?.error.message || error.message
      )
    );
  }
};