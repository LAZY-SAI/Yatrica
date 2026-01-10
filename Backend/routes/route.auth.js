import {Router} from 'express'
import axios from 'axios'
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url"
const authRoute = Router()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });
const NGROK = process.env.NG_ROK_URL 

authRoute.post('/auth',async(req,res)=>{
        try{
            const response = await axios.post(`${NGROK}/api/auth/login`, req.body)

            res.status(200).json(response.data)
        }
        catch(error){
            console.error(error)
            res.status(500).json({message:"Authentication failed"})
        }
})

export default authRoute