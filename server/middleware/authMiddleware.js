import jwt from 'jsonwebtoken'
import User from '../models/User.js'

async function auth(req,res,next){
   try{ const verif= req.headers.authorization
    if(!verif || !verif.startsWith('Bearer ')){
        res.status(401).json({
            message: "giriş yapmanız gerekiyor"
        })
        return;
    }
    const token = verif.split(" ")[1]
    const decoded= jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.userId)
    if(!user){
        res.status(401).json({
            message: "kullanıcı bulunamadı"
        })
        return;
    }
    req.user=user
    next()
}catch(error){
    if(error.name === "JsonWebTokenError" || error.name === "TokenExpiredError"){
        res.status(401).json({
            message: "Geçersiz veya süresi dolmuş token"
        })
        return;
    }
    next(error)
}
}

export default auth;