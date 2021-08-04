const express = require('express')
const PORT = process.env.PORT || 4201  
const app = express()
const bodyparser = require('body-parser');
const {MONGOURI} = require('./config/keys.js');
const mongoose = require('mongoose')
mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected',()=>{
    console.log("Connected to dataBase");
})
mongoose.connection.on('error',(error)=>{
    console.log("Error Connecting : ",error);
})
require('./models/user')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))
app.use(require('./routes/auth'))
app.use(require('./routes/tasks'))
app.use(express.json())
app.listen(PORT,()=>{
    console.log("Server Running on PORT ",PORT)
})