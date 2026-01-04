import {Router } from 'express'

const destRoute = Router()

destRoute.post('/api/destinations',(req, res)=>{
    const{title, description, place, date, region,Map}= req.body;
    console.log("data received:",req.body)

    if(!title || !description || !place || !date || !region){
        return res.status(400).json({message:"all fields are required"})
    }
    else
    return res.status(201).json({message:"destination added successfully"})
})



export default destRoute