// const express = require('express')
// const mongodb= require('mongodb').MongoClient

// const app= express()
// const port = 3001

const mongoose = require("mongoose")
const User= require("./schema")


mongoose.connect("mongodb://localhost/socialmediadb")
run()
async function run(){
    const user =await User.create({name:"roberto", age:26})
    user.name= "andros"
    await user.save()
    console.log(user)
}
