const {Schema, model}= require('mongoose')
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
    username:{
        type:String,
        require:true,
    },
    reactions:[reactionSchema]
        })

// reaction subdocument

const Thoughts=mongoose.model('Thought',ThoughtSchema)

const mainuserdata = {thoughttext:"this thought is for testing",username:"roberto"}
const secondaryuserdata=[
    {thoughttext:"this is the second test thought",username:"roberto"},
    {thoughttext:"this is the third test thought",username:"roberto"}
]

Thoughts.create({ username: mainuserdata, thoughttext: secondaryuserdata}
)



// const handleError =(err)=> console.error(err);

// ThoughtSchema.virtual('reactioncount').get(function(){
//     return `${this.reaction}`
// })

// Thoughts.create({
//     thoughttext:"checking text functionality",
//     username: 'roberto'

// })




module.exports= Thoughts