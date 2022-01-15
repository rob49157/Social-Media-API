const {Schema, model}= require('mongoose')
const {User} = require("./User")
const mongoose = require('mongoose')



// reaction subdocument
const reactionSchema= new mongoose.Schema({
    reactionId:{},
    reactionbody:{
        type:String,
        require:true,
        maxlength:280
    },
    username:{
        type:String,
        require:true,
    },
    createdAt:{
        type:Date,
        default: ()=>Date.now,
       

        
    }
})

//thought table
const ThoughtSchema= new mongoose.Schema({
    thoughttext: {
        type: String,
        require:true,
        minlength: 1,
        maxlength: 280
    },
    createdat:{
        type:Date,
        default:()=> Date.now(),
        get:(Timestamp)=>time(Timestamp)
        // getter method to format timestamp
    },
    username:{
        type:String,
        require:true,
        ref:"User"
    },
    reactions: [reactionSchema]
})
    // username: {
    //     field:{type:String},
        
    //     name:[{type: mongoose.SchemaTypes.ObjectId, ref: "User"}],
    //     ref:'User'
    // },
    
   

// reaction subdocument

const Thoughts=mongoose.model('Thought',ThoughtSchema)

// const mainuserdata = {thoughttext:"this is a test",username:"roberto"}


// Thoughts.create({ username:mainuserdata, thoughttext: mainuserdata['thoughttext']})




module.exports= Thoughts