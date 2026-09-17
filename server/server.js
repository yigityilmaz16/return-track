import express from 'express';
import productRoute from './routes/productRoute.js'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
const PORT =process.env.PORT || 3000
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173'
const app= express();
app.use(express.json());
app.use(cors({ origin: CLIENT_ORIGIN}))
app.use('/products', productRoute)




app.listen(PORT, () =>{
    console.log(PORT);
})