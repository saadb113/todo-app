const mongoose = require("mongoose")
const connection = async()=>{
    await mongoose.connect("mongodb+srv://saadb451:Saadbhaizindabaad1!@cluster0.vbcrt.mongodb.net/").then(data=>{
        console.log("connected");
    });
} 

module.exports = connection;
