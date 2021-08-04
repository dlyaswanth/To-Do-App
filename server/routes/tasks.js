const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
router.post('/show-task',(req,res)=>{
    User.findOne({email:req.body.email})
    .then(task=>{
        res.send(task.toDoList);
    })
})
router.post('/create-task', async (req,res)=>{
    const {title,startDate,endDate,time}=req.body;
    var size=0;
    await User.findOne({email:req.body.email})
    .then(result=>{
        size=result.toDoList.length;
    })
    User.findOneAndUpdate(req.body.email,{
        $push:{toDoList:{"id":size,"title":title,"startDate":startDate,"endDate":endDate,"time":time}}
    },{
        new:true
    })
    .exec((err,result)=>{
        if (err){
            return res.status(422).json({error:err})
        }
        else {
        res.status(201).json('Task Added Sucessfully !')};
    })
})
router.post('/remove',async (req,res)=>{
    const {email,id}=req.body;
    await User.findOneAndUpdate(email,{
        $pull:{toDoList:{"id":id}}
    },{
        new:true
    })
    await User.findOne({email:req.body.email})
    .then(task=>{
        res.send(task.toDoList);
    })
})
module.exports=router;