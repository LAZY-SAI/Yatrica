import {Router} from 'express'

const adUser = Router()

adUser.post('/admin-users',(req,res)=>{

    const {username, description,from} = req.body

    console.log("data received:",req.body)
    if(!username || !description || !from){
        return res.status(400).json({message:"all fields are required"})
    }
    return res.status(201).json({message:"guide added successfully"})
})