import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Define the base URL for the Google Gemini API
const BASE_URL = 'https://gemini.googleapis.com/v1/your-endpoint'; // Replace with the correct endpoint for Gemini API

// Configuration for the API request
const config = {
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY, // Use the Gemini API key
        'X-Goog-FieldMask': [
            'gemini.photos', // Replace with appropriate field masks for Gemini API
            'gemini.displayName', // Replace with appropriate field masks for Gemini API
            'gemini.id' // Replace with appropriate field masks for Gemini API
        ]
    }
};

// Function to get place details using the Google Gemini API
export const GetPlaceDetails = (data) => axios.post(BASE_URL, data, config);

// URL to retrieve photo reference using the Google Gemini API
export const PHOTO_REF_URL = 'https://gemini.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=' + import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;

