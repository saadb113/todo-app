const mongoose = require("mongoose")
require('dotenv').config()
const connection = async()=>{
    await mongoose.connect(process.env.MONGO_URI).then(data=>{
        console.log("connected");
    });
} 

module.exports = connection;
