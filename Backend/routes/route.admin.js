import Router from "express";
import dotenv from "dotenv";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url"
const admindash = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });
const NGROK = process.env.NG_ROK_URL 
admindash.get(`/admin`, async (req, res) => {
  try {
    const response = await axios.get(`${NGROK}/api/admin/stats`, {
      headers: {
        Authorization: req.headers.authorization,
        "ngrok-skip-browser-warning": "true",
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "failed to fetch data" });
  }
});

export default admindash;
