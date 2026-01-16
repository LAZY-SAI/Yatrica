import { Router } from "express";
import dotenv from "dotenv";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import FormData from "form-data";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });
const upload = multer({ dest: "uploads/" });
const NGROK = process.env.NG_ROK_URL;

const destRoute = Router();
//create destination
destRoute.post("/create/destination", async (req, res) => {
  const token = req.headers.authorization;

  try {
    const response = await axios.post(`${NGROK}/api/destinations`, req.body, {
      headers: {
        Authorization: token,
      },
    });

    res.status(200).json(response.data);
    console.log("Success:", response.data);
  } catch (error) {
    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Data:", JSON.stringify(error.response.data, null, 2));
    } else {
      console.error("Connection Error:", error.message);
    }
  }
});
//insert image while creating the destination
destRoute.post(
  "/destinations/uploadfile",
  upload.single("image"),
  async (req, res) => {
    const token = req.headers.authorization;

    try {
      const { destinationId } = req.body;

      if (!req.file || !destinationId) {
        return res
          .status(400)
          .json({ message: "Image or destinationId missing" });
      }
      const form = new FormData();
      form.append("image",fs.createReadStream(req.file.path))
      form.append("destinationId", destinationId)
      const response = await axios.post(`${NGROK}/api/uploads/destination`, {
        headers: {
          authorization: token,
          ...form.getHeaders()
        },
      });
      res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
    }
  }
);
//get all destinations
destRoute.get("/destinations", async (req, res) => {
  const token = req.headers.authorization;

  try {
    const response = await axios.get(`${NGROK}/api/destinations`, req.body, {
      headers: {
        Authorization: token,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Data:", JSON.stringify(error.response.data, null, 2));
    } else {
      console.error("Connection Error:", error.message);
    }
  }
});
//destination by id
destRoute.get(`/destinations/:id`, async (req, res) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  try {
    const response = await axios.get(`${NGROK}/api/destinations/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    res.status(200).json(response.data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
});
//update destination

destRoute.put("/update/destinations/:id", async (req, res) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  const payload = req.body;
  try {
    const response = await axios.put(
      `${NGROK}/api/destinations/${id}`,
      payload,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    res.status(200).json("Update success", response.data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error });
  }
});

//delete destination
destRoute.delete("/delete/destination/:id", async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  try {
    const response = await axios.delete(`${NGROK}/api/destinations/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    res
      .status(200)
      .json({ message: "succussfully updated", data: response.data });
    console.log("data deleted successfully");
  } catch (error) {
    console.error(error);
  }
});

export default destRoute;
