import dotenv from "dotenv";
dotenv.config();

import express from "express";
import helmet from "helmet";
import cors from "cors";

import useRoute from "./routes/route.user.js";
import destRoute from "./routes/route.destination.js";
import adminRoute from "./routes/route.admin.js";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(helmet());

const corsOptions = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use("/", useRoute);
app.use("/", destRoute);
app.use("/", adminRoute);
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
