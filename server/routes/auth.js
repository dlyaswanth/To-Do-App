const express=require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
router.post('/login',(req,res)=>{
    const {email,password}=req.body;
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser)
        return res.send(402).json({error:'Invalid Username or Password !'})
        bcrypt.compare(password,savedUser.password,function(err,result){
            if (result)
            return res.status(202).json({message:"Logged In !"})
            else
            return res.status(401).json({error:"Invalid UserName or Password"});
        })
    })
})
router.post('/signup',(req,res)=>{
    const {email,password}=req.body;
    User.findOne({email:email})
    .then(savedUser=>{
        if (savedUser)
        return res.status(401).json({error:'Email Already exists !'})
        else
        {
            bcrypt.hash(password,15,(err,hashedpassword)=>{
                const user=new User({
                    email,
                    password:hashedpassword,
                })
                user.save()
            })
            return res.status(201).json({message:'User created Successfully !'});
        }
    })
})
module.exports=router;