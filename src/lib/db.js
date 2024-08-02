import mongoose from "mongoose";


// const mongoURL = "mongodb+srv://maisuriyaraj664:zTZ4pj2LioNWbTPG@cluster0.dr24uoe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// mongodb+srv://maisuriyaraj664:zTZ4pj2LioNWbTPG@cluster0.dr24uoe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const mongoURL = process.env.DB_URL || "mongodb+srv://maisuriyaraj664:zTZ4pj2LioNWbTPG@cluster0.dr24uoe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(mongoURL,{ useUnifiedTopology: true }).then(() => {
    console.log("Database Connected 🗿 !")
}).catch((error)=>{
    console.log(error);
})