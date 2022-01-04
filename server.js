// const express = require('express')
// const mongodb= require('mongodb').MongoClient

// const app= express()
// const port = 3001

const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/socialmediadb", ()=>{
    console.log('connected')
})

