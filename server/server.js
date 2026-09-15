import express from 'express';
import productRoute from './routes/productRoute.js'
import cors from 'cors'
const app= express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173'}))
app.use('/products', productRoute)



app.listen(3000, () =>{
    console.log("API dinleniyor");
})