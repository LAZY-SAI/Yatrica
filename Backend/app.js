import dotenv from "dotenv";
dotenv.config();

import express from "express";
import helmet from "helmet";
import cors from "cors";
import axios from 'axios'
import useRoute from "./routes/route.user.js";
import destRoute from "./routes/route.destination.js";

const app = express();
const PORT = process.env.PORT || 8080;
const NGROK = process.env.NG_ROK_URL


app.use(express.json());
app.use(helmet());


const corsOptions = {
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type","Authorization"],
};

app.use(cors(corsOptions));

app.get("/admin", async(req,res)=>{
    try {
        const response = await axios.get(
            `${NGROK}/api/admin/stats`,
            {
                headers: {
                    Authorization: req.headers.authorization
                }
            }
        );
        res.status(200).json(response.data)
    }catch(err){
        console.error(err)
        res.status(500).json({message:"failed to fetch data"})
    }
})


app.use("/", useRoute);
app.use("/", destRoute);
// app.use("/",adminRoute);
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});