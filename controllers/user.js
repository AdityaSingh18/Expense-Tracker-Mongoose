const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user')

exports.postSignup = async(req ,res,next)=>{

    try {
        const {name, email, password} = req.body ;

        if(!name || !email || !password){
            return res.status(400).json({message:'add all fields'})
        }

        const user = await User.findOne({email:email});
        if(user){
            return res.status(409).json({message:'user already exist'})
        }

        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, async(err, hash)=>{
            let user = await User.create({name , email , password:hash , ispremiumuser : false })
            console.log(user)
            return res.status(201).json({message:'successfully created new user'})
        });
        
    
    } catch (err) {
        res.status(500).json(err);
    }
    
}

exports.postLogin = async(req,res,next)=>{
    try {
        
        const {email , password} = req.body ;
        
        if(!email || !password){
            return res.status(400).json({message:'enter all fields'})
        }

        const user = await User.findOne({email})
        
        if(!user){
            return res.status(404).json({message:'User not found'})
        }
        const foundUser = user;

        bcrypt.compare(password, foundUser.password, (err, matchPassUser)=>{
           if(!matchPassUser){
            return res.status(401).json({message:'User not authorized'})
           }
           
           return res.status(200).json({message:'login sucess' , token:generateAccessToken(foundUser._id) , isPremium:foundUser.ispremiumuser})
        });

    } catch (err) {
        return res.status(500).json(err)
    }
}

function generateAccessToken(id){
    return jwt.sign({ userId:id },'itstoken');
}