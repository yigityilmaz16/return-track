import express from 'express'
import User from '../models/User.js'
import bcryptjs from 'bcryptjs'
import  jwt from 'jsonwebtoken';
import auth from '../middleware/authMiddleware.js';

const router= express.Router();

router.get('/me', auth, (req, res) => {
  res.json(req.user)
})

router.post('/login', async (req,res,next) =>{
    try{
        const {email,password} = req.body
        if(!email || !password){
            res.status(400).json({
                message: "Alanlardan biri veya ikisi eksik"
            })
            return;
        }
        const mail = email.trim().toLowerCase()
        const existingUser = await User.findOne( {email: mail}).select('+password')
        if(!existingUser){
            res.status(401).json({
                message:"Email veya parola hatalı"
            })
            return;
        }
        const comparedPass = await bcryptjs.compare(password, existingUser.password)
        if(!comparedPass){
            res.status(401).json({
                message:"Email veya parola hatalı"
            })
            return;
        }
       const token= jwt.sign(
                 { userId: existingUser._id },
                 process.env.JWT_SECRET,
                 { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
                )
        res.status(200).json({
            user: existingUser,
            token
        })
    }catch(error){
        next(error)
    }
})

router.post('/register', async (req,res,next) =>{
    try{
        const {name,email,password} = req.body
        if(!name || !email || !password || password.length<6){
            res.status(400).json({
                message:"Alanlar boş olamaz veya parola 6 karakterden az olamaz!"
            })
            return;
        }
        const mail = email.trim().toLowerCase()
        const existingUser = await User.findOne( {email: mail})
        if(existingUser){
            res.status(409).json({
                message:"Bu kullanıcı zaten kayıtlı."
            })
            return;
        }
        const pass = await bcryptjs.hash(password,12)
       const newUser= await User.create({
            name:name.trim(),
            email:mail,
            password:pass
        })
        res.status(201).json(newUser)
    }catch(error){
        next(error)
    }
})

export default router 