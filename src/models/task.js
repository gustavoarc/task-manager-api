const mongoose = require ('mongoose');


const userShema = new mongoose.Schema ({   
    description: {
        type: String, 
        required: true , 
        trim: true 
    }, 
    completed: {
        type: Boolean, 
        default: false 
    }
 })

const Task = mongoose.model ('Task',userShema )

module.exports = Task ; 