
const express =require('express')
const db =require('./config/connection')

const {User, Thoughts}= require("./models")

const PORT =process.env.PORT || 3001;
const app =express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())


// finds users
app.get('/Username',(req,res)=>{
    User.find({},(err,result)=>{
        if(err){
            res.status(500).send({message:'internal error'})
        }else{
            res.status(200).json(result)
        }
    })
})


//post friends

var id = '5ebadc45a99bde77b2efb20e';
User.findById(id, function (err, docs) {
    if (err){
        console.log(err);
    }
    else{
        console.log("Result : ", docs);
    }
});

app.put('/username/:id',(req,res)=>{
    
    var id = req.params.id;
    console.log(req.body)
    User.findByIdAndUpdate(id, req.body, {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully saved.');
    });
})

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
  