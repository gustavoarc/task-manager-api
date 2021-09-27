require('./db/mongoose')
const express =  require('express');
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require ('./routers/user')

const taskRouter = require ('./routers/task')

const app = express();
const port = process.env.PORT 

const multer = require('multer');
const upload = multer ({
    dest: 'images'
})

app.post('/upload', upload.single('upload'), (req, res)=>{
    res.send();
})


app.use(express.json());
app.use(userRouter)
app.use(taskRouter)

app.listen(port , () =>{
    console.log('Server ins up on port ' + port  );
})


/*
const bcrypt = require ('bcryptjs')

const myFunction = async ()=>{
    const password = 'Gustavo'
    const hashedPaddword = await bcrypt.hash(password ,  8 )

    console.log(password);
    console.log(hashedPaddword);

    const isMatch = await bcrypt.compare('Gustavo', hashedPaddword)
    console.log(isMatch);

}

myFunction()

*/