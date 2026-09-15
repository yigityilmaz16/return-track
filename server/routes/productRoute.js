import express from 'express'

const router= express.Router()
const products = []
router.get("/", (req,res) =>{
    res.json(products);
})

router.post("/", (req,res) =>{
    const { name, store, purchaseDate, returnPeriodDays } = req.body
    const cleanName = typeof name === 'string' ? name.trim() : ''
    const cleanStore = typeof store === 'string' ? store.trim() : ''
    const cleanReturnPeriodDays = Number(returnPeriodDays)
        if(!cleanStore || !cleanName || !purchaseDate || cleanReturnPeriodDays <= 0 || !Number.isFinite(cleanReturnPeriodDays)){
        res.status(400).json({
            message : "Tüm Alanlar Dolu Olmalı Veya Sayılar Pozitif Olmalı!"
        })
        return;
    }
    const newProduct ={
        id: Date.now(),
        name: cleanName,
        store: cleanStore,
        purchaseDate: purchaseDate,
        returnPeriodDays: cleanReturnPeriodDays,
        isReturned: false
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
    const { name, store, purchaseDate, returnPeriodDays } = req.body
    const cleanName = typeof name === 'string' ? name.trim() : ''
    const cleanStore = typeof store === 'string' ? store.trim() : ''
    const cleanReturnPeriodDays = Number(returnPeriodDays)
     if(!cleanStore || !cleanName || !purchaseDate || cleanReturnPeriodDays <= 0 || !Number.isFinite(cleanReturnPeriodDays)){
        res.status(400).json({
            message : "Tüm Alanlar Dolu Olmalı Veya Sayılar Pozitif Olmalı!"
        })
        return;
    }
    product.name= cleanName
    product.store= cleanStore
    product.purchaseDate= purchaseDate
    product.returnPeriodDays= cleanReturnPeriodDays
    res.status(200).json(product)
})

export default router