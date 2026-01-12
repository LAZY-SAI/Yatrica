import {Router } from 'express'
import dotenv from "dotenv";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });
const NGROK = process.env.NG_ROK_URL 

const destRoute = Router()

destRoute.post('/destination', async (req, res) => {
    const token = req.headers.authorization;
    
    try {
        const response = await axios.post(`${NGROK}/api/destinations`, req.body, {
            headers: {
                Authorization: token
            }
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
    
    res.status(error.response?.status || 500).json(
        error.response?.data || { error: "Remote Server Error" }
    );
}
});

destRoute.get('/destinations/:id', async(req,res)=>{
    const token = req.headers.authorization;

    try{
            const res = await axios.get(`${NGROK}/api/destinations/{id}`,
                {
                    headers:{
                        Authorizatrion:token
                    }
                })
                res.sendStatus(200).json(res.data)
    }
    catch(error){
        
    if (error.response) {
       
        console.log("Status:", error.response.status);
        console.log("Data:", JSON.stringify(error.response.data, null, 2));
    } else {
        console.error("Connection Error:", error.message);
    }
    
    res.status(error.response?.status || 500).json(
        error.response?.data || { error: "Remote Server Error" }
    );
    }
})


export default destRoute