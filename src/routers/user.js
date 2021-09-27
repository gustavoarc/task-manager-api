const  express = require('express')
const multer = require ('multer')
const User = require ('../models/user')
const auth = require ('../middleware/auth')
const {  sendWelcomeEmail , sendCancelationEmail } = require('../emails/account') 

const router = new express.Router()

router.post('/users', async (req  , res ) => {
    
    const user = new User( req.body)    
 
    try {
        await user.save()
        sendWelcomeEmail( user.email, user.name  )
        const token = await user.generateAuthToken()
        res.status(201).send(user , token  ) 
    }   catch (e){
        console.log(e);
        res.status(400).send(e)
    }  


  /*  user.save ().then( ()=>{
            res.status(201).send(user);
    }).catch ( ( e )=>{
            res.status(400);
            res.send (e);
    })*/
})

router.post ('/users/login' , async ( req , res )  => {
   
            
    try {  
        const user = await User.findByCredentials( req.body.email , req.body.password )
        
        const token = await User.generateAuthToken()

        res.send({user , token })
    } catch (e){
        console.log('eror', e);
        res.status(400).send (e)
    }
})



router.get ('/users', async (req, res)=>{
    
    try {
        const users = await User.find({})
        res.send(users)

    } catch (e){
        res.status(500).send(e)
    }


    /*User.find({}).then ( ( users )=>{
        res.send(users)
    }).catch ( (e)=>{
        res.status(500).send(e)    
    }) */
})

router.get ('/users/:id', async  (req, res)=>{
    const _id = req.params.id ; 

    
    try {
        const user = await  User.findById(_id)
       
        if (!user){
            return res.status(404).send()
        }
        res.send(user)

    } catch (e){    
        res.status(500).send()
    }


   /* User.findById({ _id }).then ( ( user )=>{
        
        if (!user){
            return res.status(404).send();
        }
        
        res.send(user)
    }).catch ( (e)=>{
        res.status(400).send(e)    
    }) */
})

router.patch('/users/:id' , async(req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name","email","password","age"]
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update)) 
    
    if (!isValidOperation){
        return res.status(400).send({Error: 'Invalid updates'})
    }

    try {
        //const user = await User.findByIdAndUpdate(req.params.id , req.body ,{new: true , runValidators: true } )

        const user = await User.findById( req.params.id)

        updates.forEach( ( update) => user[update]= req.body[update])
        await user.save()
         
        if (!user){
            return res.status(404).send()
        }

        res.send(user)

    } catch (e){
      
        res.status(400).send(e)
    }
})

router.delete('/users/:id' , async(req, res) =>{

    try {
        const user = await User.findByIdAndDelete(req.params.id  )

        sendCancelationEmail(user.email ,user.name )
         
        if (!user){
            return res.status(404).send()
        }

        res.send(user)

    } catch (e){
      
        res.status(400).send(e)
    }
})

const upload = multer ({
    dest : 'avatar' , 
    limits:  {
            fileSize:10000000
    } , 
    fileFilter(req, file, cb)   {
        if (!file.originalname.match(/\.(jpg|png|jpeg)$/)){
            return cb(new Error('Pleace upload an image'))
        }
        cb(undefined ,  true )
    } 
})

router.post('/users/me/avatar',  upload.single('avatar'), async  (req , res)=>{
    req.user.avatar =     req.file.buffer 
    await req.user.save ()
    res.send()
} , (error , req , res, next ) =>{
    res.status(400).send({ error : error.message })
} )

router.delete ('/users/me/avatar',  upload.single('avatar'), async  (req , res)=>{
    req.user.avatar =     undefined
    await req.user.save ()
    res.send()
} , (error , req , res, next ) =>{
    res.status(400).send({ error : error.message })
} )

router.get ('/users/:id/avatar', async (req, res)=> {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar  ){
            throw new Error ()
        }
        res.set ('Content-Type' , 'image/jpg')
        res.send(user.avatar )

    } catch  (e) {
        res.status(404).send()
    }  
})



module.exports = router 