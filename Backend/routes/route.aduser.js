import {Router} from 'express'
import axios from 'axios'
const adUser = Router()
const NGROK = process.env.NG_ROK_URL
adUser.post('/admin-users',(req,res)=>{

    const {username, description,from} = req.body

    console.log("data received:",req.body)
    if(!username || !description || !from){
        return res.status(400).json({message:"all fields are required"})
    }
    return res.status(201).json({message:"guide added successfully"})
})

// adUser.get("/admin-users", async (req, res) => {
//     try {
//         const response = await axios.get(
//             `${NGROK}/api/admin/stats`,
//             {
//                 headers: {
//                     Authorization: req.headers.authorization
//                 }
//             }
//         );
//
//         res.status(200).json(response.data);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ message: "Failed to fetch admin users" });
//     }
// });
