import express from 'express'
import {normalizeProductInput,isValidProductInput} from '../utils/productValidation.js'
import Product from '../models/Product.js'

const router= express.Router()
router.get("/", async (req,res) =>{
   try{
         const data = await Product.find()
         res.json(data)
   }catch{
    res.status(500).json({
        message: "Ürünler Alınamadı"
    })
   }
})

router.post("/", async (req,res) =>{
  try{
    const productData= normalizeProductInput(req.body)
   if(isValidProductInput(productData) === false){
    res.status(400).json({
        message: "Hatalı"
    })
    return
   }
    const data = await Product.create(productData)
    res.status(201).json(data);
}catch{
    res.status(500).json({
        message:"Başarısız"
    })
}

})
router.get("/:id", async (req,res) =>{
   try{
    const data= await Product.findById(req.params.id)
    if(!data){
        res.status(404).json({
            message: "Ürün Bulunamadı"
        })
        return;
    }
    res.status(200).json(data)
}catch{
    res.status(500).json({
        message:"Hata"
    })
}
})
router.delete("/:id", async (req,res) =>{
   try{
    const data = await Product.findByIdAndDelete(req.params.id)
    if(!data){
        res.status(404).json({
            message: "ürün bulunamadı"
        })
        return;
    }
    res.status(200).json(data)
}catch{
    res.status(500).json({
        message: "hata"
    })
}

})
router.patch("/:id/return-status", async (req,res) =>{
   try{
    const {isReturned} = req.body
    if(typeof isReturned !== 'boolean'){
        res.status(400).json({
         message: "isReturned True veya False Olmalı"
       })
       return;
    }
    const data = await Product.findByIdAndUpdate(
        req.params.id,
        {isReturned},
         { 
        new: true,           
        runValidators: true  
         }     )
    if(!data){
       res.status(404).json({
         message: "Ürün Bulunamadı"
       })
       return;
    }
    res.status(200).json(data)
}catch{
    res.status(500).json({
        message: "hata"
    })
}
})
router.patch("/:id", async (req,res) =>{
   try{
    const productData = normalizeProductInput(req.body)
    if(isValidProductInput(productData) === false){
        res.status(400).json({
         message: "Hatalı"
       })
       return;
    }
    const data = await Product.findByIdAndUpdate(
        req.params.id,
        productData,
        {
            new: true,
            runValidators: true
        }
    )
    if(!data){
       res.status(404).json({
         message: "Ürün Bulunamadı"
       })
       return;
    }
    res.status(200).json(data)
}catch{
    res.status(500).json({
        message: "hatalı"
    })
}
})

export default router
