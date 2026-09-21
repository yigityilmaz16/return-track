import express from 'express'
import {normalizeProductInput,isValidProductInput} from '../utils/productValidation.js'
import Product from '../models/Product.js'

const router= express.Router()
const products = []
router.get("/", async (req,res) =>{
   try{
         const data = await Product.find()
         res.json(data)
   }catch(error){
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
}catch(error){
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
}catch(error){
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
}catch(error){
    res.status(500).json({
        message: "hata"
    })
}

})
router.patch("/:id/return-status", (req,res) =>{
    const product = products.find(
        product => product.id === Number(req.params.id) 
    )
    if(!product){
       res.status(404).json({
         message: "Ürün Bulunamadı"
       })
       return;
    }
    const {isReturned} = req.body
    if(typeof isReturned !== 'boolean'){
        res.status(400).json({
         message: "isReturned True veya False Olmalı"
       })
       return;
    }
    product.isReturned= isReturned
    res.status(200).json(product)
})
router.patch("/:id", (req,res) =>{
    const product = products.find(
        product => product.id === Number(req.params.id)
    )
    if(!product){
       res.status(404).json({
         message: "Ürün Bulunamadı"
       })
       return;
    }
    const productData = normalizeProductInput(req.body)
    if(isValidProductInput(productData) === false){
        res.status(400).json({
         message: "Hatalı"
       })
       return;
    }
    product.name= productData.name
    product.store= productData.store
    product.purchaseDate = productData.purchaseDate
    product.returnPeriodDays= productData.returnPeriodDays
    res.status(200).json(product)
})

export default router