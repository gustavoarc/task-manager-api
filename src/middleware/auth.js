const jwt = require ('jsonwebtoken')
const User = require('../models/user')


const auth = async (req , res , next )=>{
    try {
        const token = req.header('Auhorization').replace('Bearer','')
       
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

    }catch (e){
        res.status(401).send({error: 'Please authenticate'})
    } 
}