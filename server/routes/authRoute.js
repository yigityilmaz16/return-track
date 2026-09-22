import express from 'express'
import User from '../models/User.js'
import bcryptjs from 'bcryptjs'

const router= express.Router();

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