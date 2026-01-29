const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const User = require("../db/userSchema")

const authenticate = (req,res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader) return res.status(401).json({message:"Unauthorized"})
    
    const token = authHeader.split(" ")[1]

    try{
        const decode = jwt.verify(token,"Saad")
        req.user = decode
        next()
    }catch(err){
        res.status(401).json({message:"Invalid token"})
    }
}

router.get("/authenticate",authenticate, async(req, res) => {
    const user = await User.findOne({email : req.user.email})
    res.json({message:"Authenticated",user})
})
module.exports = router;