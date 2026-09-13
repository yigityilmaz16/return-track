import express from 'express';

const app= express();
app.use(express.json());

const products=[];

app.get("/products", (req,res) =>{
    res.json(products);
})

app.post("/products", (req,res) =>{
    if(!req.body.store || !req.body.name || !req.body.purchaseDate || !req.body.returnPeriodDays || Number(req.body.returnPeriodDays) <= 0){
        res.status(400).json({
            message : "Tüm Alanlar Dolu Olmalı Veya Sayılar Pozitif Olmalı!"
        })
        return;
    }

    const newProduct ={
        id: Date.now(),
        name: req.body.name,
        store: req.body.store,
        purchaseDate: req.body.purchaseDate,
        returnPeriodDays: Number(req.body.returnPeriodDays),
        isReturned: false
    }
    products.push(newProduct);
    res.status(201).json(newProduct);

})
app.listen(3000, () =>{
    console.log("API dinleniyor");
})