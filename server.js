
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

// find user by id
app.get('/username/:id',(req,res)=>{
    
    var id = req.params.id;
    console.log(req.body)
    User.findById(id, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully found.');
    });
})


// update user
app.put('/username/:id',(req,res)=>{
    
    var id = req.params.id;
    console.log(req.body)
    User.findByIdAndUpdate(id, req.body, {$set: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully saved.');
    });
})

// delete user
app.delete('/username/:id',(req,res)=>{
    
    var id = req.params.id;
    console.log(req.body)
    User.findByIdAndDelete(id, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully deleted.');
    });
})



//create user
app.post('/create',(req,res)=>{
    User.create({
        name:req.body.name,
        age:req.body.age,
        email: req.body.email,
        
    },
    (err,results)=>{
        if(err)throw err;
        res.json(results)
    }
)})

// friends
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

//find thoughtby id
app.get('/thoughts/:id',(req,res)=>{
    
    var id = req.params.id;
    console.log(req.body)
    Thoughts.findById(id, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully found.');
    });
})

// delete thoughts
app.delete('/thoughts/:id',(req,res)=>{
    
    var id = req.params.id;
    console.log(req.body)
    Thoughts.findByIdAndDelete(id, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully deleted.');
    });
})

//update thought
app.put('/thoughts/:id',(req,res)=>{
    
    var id = req.params.id;
    console.log(req.body)
    Thoughts.findByIdAndUpdate(id, req.body, {$set: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully updated.');
    });
})


// post new thought

db.once('open',()=>{
    app.listen(PORT,()=>{
        console.log(`API server running on port ${PORT}!`)
    })
})
  