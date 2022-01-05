const mongoose = require("mongoose")




const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: {
        type: String,
        required: true ,
        lowercase:true
      
    },
    createdAt:{
        type: Date,
        default: ()=> Date.now(),
    },
    UpdateAt: {
        type: Date,
        default: ()=> Date.now(),
    },
    
    
})

module.exports=mongoose.model("User",UserSchema)