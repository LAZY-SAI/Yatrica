import { Router } from "express";
import dotenv from "dotenv";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import FormData from "form-data";
import { Readable } from "stream";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }
});

const BACKEND = process.env.BACKEND_URL;
const destRoute = Router();

// Create destination with image
destRoute.post("/create/destinations", upload.single("image"), async (req, res) => {
  const token = req.headers.authorization;

  try {
    console.log("=== CREATE DESTINATION REQUEST ===");
    console.log("File received:", !!req.file);

    // Validate image
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Create a readable stream from the buffer
    const bufferStream = new Readable();
    bufferStream.push(req.file.buffer);
    bufferStream.push(null);

    // Parse tags
    let tagsArray = [];
    if (req.body.tags) {
      try {
        tagsArray = JSON.parse(req.body.tags);
      } catch (e) {
        console.log("Tags parsing error:", e);
      }
    }

    // Build the destination object matching the API schema
    const destinationData = {
      name: req.body.name,
      shortDescription: req.body.shortDescription || '',
      description: req.body.description || req.body.shortDescription || '',
      district: req.body.district,
      province: req.body.province,
      country: req.body.country,
      municipality: req.body.municipality,
      locationString: `${req.body.municipality}, ${req.body.district}, ${req.body.province}, ${req.body.country}`,
      latitude: parseFloat(req.body.latitude),
      longitude: parseFloat(req.body.longitude),
      type: req.body.type || 'NATURAL',
      category: req.body.category || '',
      difficultyLevel: req.body.difficultyLevel || 'EASY',
      averageDurationHours: req.body.averageDurationHours ? parseFloat(req.body.averageDurationHours) : 0,
      entranceFeeLocal: req.body.entranceFeeLocal ? parseFloat(req.body.entranceFeeLocal) : 0,
      entranceFeeForeign: req.body.entranceFeeForeign ? parseFloat(req.body.entranceFeeForeign) : 0,
      tags: tagsArray,
      safetyLevel: req.body.safetyLevel ? parseInt(req.body.safetyLevel) : 1,
      hasParking: req.body.hasParking === 'true' || req.body.hasParking === true,
      hasRestrooms: req.body.hasRestrooms === 'true' || req.body.hasRestrooms === true,
      hasDrinkingWater: req.body.hasDrinkingWater === 'true' || req.body.hasDrinkingWater === true,
      hasWifi: req.body.hasWifi === 'true' || req.body.hasWifi === true,
      hasGuideServices: req.body.hasGuideServices === 'true' || req.body.hasGuideServices === true,
    };

    // Add optional fields if present
    if (req.body.subCategory) destinationData.subCategory = req.body.subCategory;
    if (req.body.bestSeason) destinationData.bestSeason = req.body.bestSeason;

    console.log("Destination data:", JSON.stringify(destinationData, null, 2));

    // Create FormData
    const form = new FormData();
    
    // Append the destination object as JSON string
    form.append("destination", JSON.stringify(destinationData), {
      contentType: 'application/json'
    });
    
    // Append the file to the 'files' array (even though it's just one file)
    form.append("files", bufferStream, {
      filename: req.file.originalname || 'destination-image.jpg',
      contentType: req.file.mimetype,
      knownLength: req.file.size
    });

    console.log("=== SENDING TO BACKEND ===");
    console.log("URL:", `${BACKEND}/api/destinations/with-images`);

    // Send to backend
    const response = await axios.post(
      `${BACKEND}/api/destinations/with-images`,
      form,
      {
        headers: {
          ...form.getHeaders(),
          Authorization: token,
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    console.log("✅ SUCCESS");
    res.status(200).json(response.data);
    
  } catch (error) {
    console.error("❌ ERROR:");
    
    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Data:", JSON.stringify(error.response.data, null, 2));
      
      res.status(error.response.status).json({
        message: error.response.data.message || "Backend error",
        error: error.response.data
      });
    } else if (error.request) {
      console.error("No response:", error.message);
      res.status(503).json({
        message: "Backend not responding",
        error: error.message
      });
    } else {
      console.error("Setup error:", error.message);
      console.error("Stack:", error.stack);
      res.status(500).json({
        message: "Request failed",
        error: error.message
      });
    }
  }
});

// Get all destinations
destRoute.get("/destinations", async (req, res) => {
  const token = req.headers.authorization;
  try {
    const response = await axios.get(`${BACKEND}/api/destinations`, {
      headers: { Authorization: token },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || "Failed to fetch destinations"
    });
  }
});

// Get destination by id
destRoute.get("/destinations/:id", async (req, res) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  
  try {
    const response = await axios.get(`${BACKEND}/api/destinations/${id}`, {
      headers: { Authorization: token },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: "Failed to fetch destination"
    });
  }
});

// Update destination
destRoute.put("/update/destinations/:id", async (req, res) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  
  try {
    console.log("=== UPDATE DESTINATION ===");
    console.log("ID:", id);
    console.log("Request body:", JSON.stringify(req.body, null, 2));

    const response = await axios.put(
      `${BACKEND}/api/destinations/${id}`,
      req.body,
      {
        headers: { 
          'Content-Type': 'application/json',
          Authorization: token 
        },
      }
    );
    
    console.log("✅ UPDATE SUCCESS");
    res.status(200).json(response.data);
  } catch (error) {
    console.error("❌ UPDATE ERROR:");
    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Data:", JSON.stringify(error.response.data, null, 2));
    }
    
    res.status(error.response?.status || 400).json({
      message: error.response?.data?.message || error.message,
      error: error.response?.data
    });
  }
});

// Delete destination
destRoute.delete("/delete/destination/:id", async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  
  try {
    const response = await axios.delete(`${BACKEND}/api/destinations/${id}`, {
      headers: { Authorization: token },
    });
    res.status(200).json({
      message: "Successfully deleted",
      data: response.data
    });
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: "Failed to delete destination"
    });
  }
});

// Proxy images
destRoute.get("/uploads/destinations/:filename", async (req, res) => {
  const { filename } = req.params;
  
  try {
    const imageUrl = `${BACKEND}/uploads/destinations/${filename}`;
    const response = await axios({
      url: imageUrl,
      method: "GET",
      responseType: "stream",
    });

    if (response.headers['content-type']) {
      res.setHeader('content-type', response.headers['content-type']);
    }

    response.data.pipe(res);
  } catch (error) {
    console.error("Image Proxy Error:", error.message);
    res.status(404).send("Image not found");
  }
});

export default destRoute;