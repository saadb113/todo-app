const express = require("express");
const app = express()
const cors = require("cors")
const db = require("./db/connection")
db();
const authRoutes = require("./auth/authRoutes")
const authenticate = require("./dashboard/authenticate")
const Note = require("./dashboard/note")
    
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use("/auth", authRoutes)
app.use("/dashboard", authenticate)
app.use("/dashboard", Note)
app.listen(8000,()=>{
    console.log("Server Started");
})