import express from 'express';

const app= express();
app.use(express.json());

const products=[];

app.get("/products", (req,res) =>{
    res.json(products);
})

app.listen(3000, () =>{
    console.log("API dinleniyor");
})