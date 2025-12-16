import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import useRoute from "./routes/route.user.js";
const app = express();
app.use(express.json());
app.use(helmet());
dotenv.config()
app.use(
  cors({
    origin: [`${process.env.URI}`],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
const Port = 3000;
app.use("/", useRoute);
app.listen(process.env.PORT, () => {
  console.log(`app is running at localhost:${Port}`);
});
