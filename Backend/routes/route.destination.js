import {Router } from 'epxress'

const destRoute = Router()

destRoute.post('/admin-destination',(req, res)=>{
    const{title, description, place, date, region,}= req.body;
    
})



export default destRoute