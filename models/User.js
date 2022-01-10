const { MongoGridFSChunkError, ObjectId } = require("mongodb")
const mongoose = require("mongoose")




const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: {
        type: String,
        required: true ,
        lowercase:true,
       
      },
      
    // thoughts:{
    //     type:mongoose.SchemaType.ObjectId,
    //     ref:"Thought"
    // },
     
    friends:{
        friends:[ObjectId],
        type:mongoose.SchemaTypes.ObjectId,
        ref: "User"
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
    Friends:26,
    
},
(err) => (err ? handleError(err) : console.log('Document created'))
)

module.exports= User

// module.exports=mongoose.model("User",UserSchema)