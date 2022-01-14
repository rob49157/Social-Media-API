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
    
    
    
    
})

UserSchema
.virtual('friendcount')
.get(function(){
    return `${this.friends}`
})



const User= mongoose.model('User', UserSchema)

const handleError =(err)=> console.error(err);

User.create({
    name: 'roberto',
    age: 32,
    email: 'TEST@TEST.COM',
    // Friends:26,
    posts: ["61e075c15767a0f4938d647b"],

    

    
},
(err) => (err ? handleError(err) : console.log('Document created'))
)



module.exports= User