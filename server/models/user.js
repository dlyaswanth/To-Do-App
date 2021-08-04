const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true
    },
    password:{
        type:String,
        reqiured:true
    },
    toDoList:
    {
        type:[]
    }
})
mongoose.model("User",userSchema);