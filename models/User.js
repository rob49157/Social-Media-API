const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: {
        type: String,
        required: true ,
        lowercase:true
      
    },
    //joining wiht thought
    thought:mongoose.SchemaType.Objectid,
    friends:[String],
    //
    createdAt:{
        type: Date,
        default: ()=> Date.now(),
    },
    UpdateAt: {
        type: Date,
        default: ()=> Date.now(),
    },
    
    
})

const User= mongoose.model('User', UserSchema)

const handleError =(err)=> console.error(err);

User.create({
    name: 'Roberto',
    age: 32,
    email: 'TEST@TEST.COM'
},
(err) => (err ? handleError(err) : console.log('Document created'))
)

module.exports= User

// module.exports=mongoose.model("User",UserSchema)