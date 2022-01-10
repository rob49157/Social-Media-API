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
        default: ()=>Date.now
        
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
        default:()=> Date.now()
        // getter method to format timestamp
    },
    username: {
        type: String
    },
    reactions:[reactionSchema]
        })

// reaction subdocument

const Thoughts=mongoose.model('Thought',ThoughtSchema)

const mainuserdata = {thoughttext:"testestestestests",username:"roberto"}


Thoughts.create({ username:mainuserdata['username'], thoughttext: mainuserdata['thoughttext']})




module.exports= Thoughts