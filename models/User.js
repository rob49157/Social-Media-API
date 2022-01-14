const { MongoGridFSChunkError, ObjectId } = require("mongodb")
const mongoose = require("mongoose")
const {Thought} = require("./thought")




const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: {
        type: String,
        required: true ,
        lowercase:true,
       
      },
      
        
      thoughts:[{type: mongoose.SchemaTypes.ObjectId, ref: "Thought"}],
      
      friends:[{type: mongoose.SchemaTypes.ObjectId, ref: "User"}],
      
      
   

    })



// Create a virtual property `tagCount` that gets the amount of comments per user
UserSchema
  .virtual('friendcount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

const User= mongoose.model('User', UserSchema)

const handleError =(err)=> console.error(err);

User.create({
    name: 'rontron',
    age: 32,
    email: 'TEST@TEST.COM',
    // Friends:26,
    thoughts: ["61e175dd4a7d337e1b3872b4"],
    friends:["61e1f8990534f326ad9adcc6"]

    

    
},
(err) => (err ? handleError(err) : console.log('Document created'))
)



module.exports= User