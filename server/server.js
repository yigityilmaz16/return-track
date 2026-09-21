import express from 'express';
import productRoute from './routes/productRoute.js'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDatabase from './config/database.js';
dotenv.config()
const PORT =process.env.PORT || 3000
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173'
const app= express();
app.use(express.json());
app.use(cors({ origin: CLIENT_ORIGIN}))
app.use('/products', productRoute)
async function startServer() {
   try{
    await connectDatabase()
    app.listen(PORT, () =>{
    console.log(PORT);
})
   }catch(error){
    console.log("hata")
    process.exit(1)
   }
}
startServer()




