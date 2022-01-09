
///// youtube version
// const mongoose = require("mongoose")
// const User= require("./models/User")


// mongoose.connect("mongodb://localhost/socialmediadb")
// run()
// async function run(){
//     try{
//         const user= await User.create({
//             name:"roberto",
//             age:32,
//             email:"TEST@EMAIL.COM"
//         })

//     }
//     catch (e){console.log(e)}
       
// }

//school
const express =require('express')
const db =require('./config/connection')

const {User, Thoughts}= require("./models")

const PORT =process.env.PORT || 3001;
const app =express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/Username',(req,res)=>{
    User.find({},(err,result)=>{
        if(err){
            res.status(500).send({message:'internal error'})
        }else{
            res.status(200).json(result)
        }
    })
})

app.get('/thoughts',(req,res)=>{
    Thoughts.find({},(err,result)=>{
        if(err){
            res.status(500).send({message:'internal error'})
        }else{
            res.status(200).json(result)
        }
    })
})

db.once('open',()=>{
    app.listen(PORT,()=>{
        console.log(`API server running on port ${PORT}!`)
    })
})
  