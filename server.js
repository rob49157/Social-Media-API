
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
        return res.status(200).json(doc);
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
        thoughts: req.body.thoughts,
        friends:req.body.friends
        
    },
    (err,results)=>{
        if(err)throw err;
        res.json(results)
    }
)})

// add friends
app.get('/username/:userid/friend/:friendid',(req,res)=>{
    var userid = req.params.userid;
    console.log(req.body)
    User.findByIdAndUpdate(userid, { "$push": {friends: req.params.friendid}},
                            function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        return res.send('Succesfully saved.');
    }
});
})

// delete friends
app.delete('/username/:userid/friend/:friendid',(req,res)=>{
    var userid = req.params.userid;
    console.log(req.body)
    User.findByIdAndUpdate(userid, { "$pull": {friends: req.params.friendid}},
                            function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        return res.send(docs);
    }
});
})

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

//find thoughts by _id
app.get('/thoughts/:id',(req,res)=>{
    
    var id = req.params.id;
    console.log(req.body)
    Thoughts.findById(id, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send(doc);
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

app.post('/createthought',(req,res)=>{
    Thoughts.create({
        thoughtext:req.body.thoughtext,
        username:req.body.username
       
        
    },
    (err,results)=>{
        if(err)throw err;
        res.json(results)
    }
)})

// reactions id

app.get('/thoughts/:userid/reaction/:reactionid',(req,res)=>{
    var reactionid = req.params.reactionid;
    console.log(req.body)
    Thoughts.findByIdAndUpdate(reactionid, { "$push": {thoughttext: req.params.friendid}},
                            function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        return res.send('Succesfully saved.');
    }
});
})

// delete reaction
app.delete('/thoughts/:userid/reaction/:reactionid',(req,res)=>{
    var reactionid = req.params.reactionid;
    console.log(req.body)
    Thoughts.findByIdAndUpdate(reactionid, { "$pull": {thoughttext: req.params.reactionid}},
                            function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        return res.send('Succesfully deleted.');
    }
});
})
db.once('open',()=>{
    app.listen(PORT,()=>{
        console.log(`API server running on port ${PORT}!`)
    })
})
  