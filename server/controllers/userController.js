const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async (req, res)=>{
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.send({status:"failed", message:"please add all fields"});
    }else{
        const usr = await User.find({email:email});
        console.log(usr.length)
        if(usr.length > 0){
           return res.send({status:"failed", message:"User already exist"});
        }else{
            const hassPass = await bcrypt.hash(password, 10);
            try{
                const newUsr = new User({
                    name:name,
                    email:email,
                    password:hassPass
                })
                if(newUsr.save()){
                    return res.send({status:"success", message:"User Registered Successfuly"});
                }
            }catch(err){
                return res.send({status:"failed", message:err});
            }
            
        }
    }
}

const loginUser = async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.send({status:"failed", message:"please add all fields"});
    }else{
        const usr = await User.findOne({email});
        if(!usr){
           return res.send({status:"failed", message:"Invalid Username or password"});
        }else{
            var matchPass = await bcrypt.compare(password, usr.password);
            if(matchPass){
                const token = await jwt.sign({user:usr._id}, process.env.JWT_SECRET);
                return res.send({status:"success", token:token});
            }else{
                return res.send({status:"failed", message:"Invalid Username or password"});
            }
        }
    }
}


module.exports = {
    registerUser, 
    loginUser
}