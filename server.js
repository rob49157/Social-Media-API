
const express =require('express')
const db =require('./config/connection')

const {User, Thoughts}= require("./models")
const { MongoClient: mongodb, ObjectId } = require('mongodb');

const PORT =process.env.PORT || 3001;
const app =express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())


// finds users
app.get('/username',(req,res)=>{
    User.find({},(err,result)=>{
        if(err){
            res.status(500).send({message:'internal error'})
        }else{
            res.status(200).json(result)
        }
    })
})


//post/update friends

// var id = '5ebadc45a99bde77b2efb20e';
// User.findById(id, function (err, docs) {
//     if (err){
//         console.log(err);
//     }
//     else{
//         console.log("Result : ", docs);
//     }
// });
// update user
app.put('/username/:id',(req,res)=>{
    
    var id = req.params.id;
    console.log(req.body)
    User.findByIdAndUpdate(id, req.body, {$set: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully saved.');
    });
})

app.delete('/username/:id',(req,res)=>{
    
    var id = req.params.id;
    console.log(req.body)
    User.findByIdAndDelete(id, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully deleted.');
    });
})






// //delete user
// app.delete('/username/:id', (req, res) => {
    
//     // Use deleteOne() to delete one object
//     User.findByIdAndDelete(
        
//       // This is the filter. The delete only the document that matches the _id provided in the request body
//       { _id: ObjectId(req.body.id) },
//       (err) => {
//         if (err) throw err;
//         res.send('Document deleted');
//       } 
     
//     );
//   });
  

//     return User.findOne({ friends: friends })
//       .populate('friends').exec((err, posts) => {
//         console.log("Populated User " + posts); 
//       }
    

// )

//  app.post('/Username',(req,res)=>{
//     User.populate('friends',(err,result)=>{
//         if(err){
//             res.status(500).send({message:'cant post'})
//         }else{
//             res.status(200).json(result)
//         }
//     })
    
// })


// get thoughts
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
  