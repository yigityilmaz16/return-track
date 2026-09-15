import express from 'express';
import productRoute from './routes/productRoute.js'
const app= express();
app.use(express.json());
app.use('/products', productRoute)


app.listen(3000, () =>{
    console.log("API dinleniyor");
})