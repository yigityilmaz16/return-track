import express from 'express';

const app= express();
app.use(express.json());

const products=[];

app.get("/products", (req,res) =>{
    res.json(products);
})

app.post("/products", (req,res) =>{
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