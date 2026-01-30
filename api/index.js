const express = require("express");
const app = express()
const cors = require("cors")
const db = require("./db/connection")
db();
const authRoutes = require("./auth/authRoutes")
const authenticate = require("./dashboard/authenticate")
const Note = require("./dashboard/note")
require('dotenv').config()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.get("/", (req, res) => {
    res.send("test Route")
})
app.use("/auth", authRoutes)
app.use("/dashboard", authenticate)
app.use("/dashboard", Note)
app.listen(process.env.PORT || 8000,()=>{
    console.log("Server Started");
})