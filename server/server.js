import express from 'express';

const app= express();
app.use(express.json());

const products=[];

app.get("/products", (req,res) =>{
    res.json(products);
})

app.post("/products", (req,res) =>{
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
app.get("/products/:id", (req,res) =>{
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
app.delete("/products/:id", (req,res) =>{
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
app.listen(3000, () =>{
    console.log("API dinleniyor");
})