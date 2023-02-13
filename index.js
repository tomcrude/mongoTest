const express = require("express")
const mongoose = require("mongoose")
const modelUser = require("./modelo/model")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

mongoose.set("strictQuery", false);

const conect = mongoose.connect('mongodb+srv://test-1:IHjrlDk7Mno0IZeS@cluster0.sndfyat.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true
    }).then(db => console.log('conexion exitosa'))
    .catch(err => console.log('error: ', err))

    app.post("/user", (req,res)=>{
        modelUser(req.body)
        .save().then(data => console.log("user creado")).catch((e)=> console.log(e))
    })

    app.get("/user", (req,res)=>{
        modelUser
        .find().then(data => console.log(data)).catch((e)=> console.log(e))
    })

    app.get("/user/:id", (req,res)=>{
        modelUser
        .findById(req.params.id).then(data => console.log(data)).catch((e)=> console.log(e))
    })

    app.put("/user/:id", (req,res)=>{
        const {id} = req.params.id
        const {name, age, verification} = req.body
        modelUser
        .updateOne({_id : req.params.id}, {$set: { name, age, verification}}, {upsert: true}).then(data => console.log(data)).catch((e)=> console.log(e))
    })

    app.delete("/user/:id", (req,res)=>{
        const {id} = req.params.id
        modelUser
        .deleteOne({_id: req.params.id}).then(data => console.log(data)).catch((e)=> console.log(e))
    })

app.listen(3000, (e)=>{
    console.log("server open")
})