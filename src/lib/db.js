import mongoose from "mongoose";


// const mongoURL = "mongodb+srv://maisuriyaraj664:zTZ4pj2LioNWbTPG@cluster0.dr24uoe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// mongodb+srv://maisuriyaraj664:zTZ4pj2LioNWbTPG@cluster0.dr24uoe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const mongoURL ="mongodb+srv://maisuriyaraj664:zTZ4pj2LioNWbTPG@cluster0.dr24uoe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Default is 30 seconds
    socketTimeoutMS: 45000, // Default is 0 (no timeout)
}).then(() => {
    console.log("Database Connected 🗿 !")
}).catch((error) => {
    console.log(error);
})