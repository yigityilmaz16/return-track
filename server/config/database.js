import mongoose from "mongoose"
import dns from "node:dns"
async function connectDatabase(){
    dns.setServers(['1.1.1.1', '8.8.8.8']);
    const URI = process.env.MONGODB_URI 
    if(!URI){
        throw new Error("Hata")
    }
    await mongoose.connect(URI)
    console.log("Başarılı")
}

export default connectDatabase