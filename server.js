// const express = require('express')
// const mongodb= require('mongodb').MongoClient

// const app= express()
// const port = 3001

const mongoose = require("mongoose")
const User= require("./models/User")


mongoose.connect("mongodb://localhost/socialmediadb")
run()
async function run(){
    try{
        const user= await User.create({
            name:"roberto",
            age:32,
            email:"TEST@EMAIL.COM"
        })

    }
    catch (e){console.log(e)}
       
}
  