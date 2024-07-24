import mongoose from "mongoose";


// const mongoURL = "mongodb+srv://maisuriyaraj664:zTZ4pj2LioNWbTPG@cluster0.dr24uoe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// mongodb+srv://maisuriyaraj664:zTZ4pj2LioNWbTPG@cluster0.dr24uoe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const mongoURL = process.env.DB_URL || "mongodb://localhost:27017/graphcommunity"
await mongoose.connect(mongoURL).then(() => {
    console.log("Database Connected 🗿 !")
})