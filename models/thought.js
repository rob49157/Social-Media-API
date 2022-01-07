const {Schema, model}= require('mongoose')
const mongoose = require('mongoose')

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
    reaction{
        //array of nested documents created with "reaction schema"
    }




})
ThoughtSchema.pre("save",function(next){
    this.updatedAt= Date.now()
})