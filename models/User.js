const { MongoGridFSChunkError, ObjectId } = require("mongodb")
const mongoose = require("mongoose")
const Thoughts = require("./thought")




const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: {
        type: String,
        required: true ,
        lowercase:true,
       
      },
      posts:{
      thoughts:[{type: mongoose.SchemaTypes.ObjectId, ref: "Thoughts"}],
      friends:[{type: mongoose.SchemaTypes.ObjectId, ref: "UserSchema"}],
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

UserSchema
.virtual('friendcount')
.get(function(){
    return `${this.friends}`
})



const User= mongoose.model('User', UserSchema)

const handleError =(err)=> console.error(err);

User.create({
    name: 'Roberto',
    age: 32,
    email: 'TEST@TEST.COM',
    // Friends:26,
    thoughts: ["61dcb2538039a62f567c7cfd", "61dcb394121de68b42e68b21"]
    
},
(err) => (err ? handleError(err) : console.log('Document created'))
)

module.exports= User