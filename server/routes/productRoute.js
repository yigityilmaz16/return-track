import express from 'express'
import {normalizeProductInput,isValidProductInput} from '../utils/productValidation.js'

const router= express.Router()
const products = []
router.get("/", (req,res) =>{
    res.json(products);
})

router.post("/", (req,res) =>{
   const productData= normalizeProductInput(req.body)
   if(isValidProductInput(productData) === false){
    res.status(400).json({
        message: "Hatalı"
    })
    return
   }
   const newProduct={
    id: Date.now(),
    name: productData.name,
    store: productData.store,
    purchaseDate: productData.purchaseDate,
    returnPeriodDays: productData.returnPeriodDays,
    isReturned:false
   }
   products.push(newProduct);
    res.status(201).json(newProduct);

})
router.get("/:id", (req,res) =>{
    const product = products.find(
        product => product.id === Number(req.params.id)
    )
    if(!product){
        res.status(404).json({
            message: "Ürün Bulunamadı"
        })
        return;
    }
    res.status(200).json(product)
})
router.delete("/:id", (req,res) =>{
    const index= products.findIndex(
        product => product.id === Number(req.params.id)
    )
    if (index === -1) {
    return res.status(404).json({
        message: "Ürün Bulunamadı"
    });
    }
    const [deletedProduct] = products.splice(index, 1)
    res.status(200).json(deletedProduct)

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