const express = require("express")
const router = express.Router()
const User = require("../db/userSchema")
const { body, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Note = require("../db/noteSchema")
const validateSignup = [
    body('firstName').isString().notEmpty(),
    body('lastName').isString().optional(),
    body('email').isEmail().normalizeEmail().notEmpty(),
    body('password').isLength({ min: 6 }).notEmpty()
]
const validateSignin = [
    body("email").isEmail().normalizeEmail().notEmpty(),
    body('password').isLength({ min: 6 }).notEmpty()
]
router.post("/signup", validateSignup, async (req, res) => {
    // INPUT VALIDATION 
    const error = validationResult(req)
    if (error?.errors[0]?.msg) return res.status(400).json({status:400, message: `${error.errors[0].path}: ${error.errors[0].msg}` })

    // USER VALIDATION 
    const isExisting = await User.findOne({ email: req.body.email })
    if (isExisting) return res.status(400).json({status:400, message: "User already exists" })


    const password = await bcrypt.hash(req.body.password, 10)
    const createUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password
    })
    const saveUser = await createUser.save()
    if (saveUser) {
        const createNote = new Note({
            title : "Welcome aboard! 🎉",
            description : "Your account has been created successfully.",
            isPinned : false,
            user : saveUser._id,
            color : "rgb(100, 30, 43)",
        })
        await createNote.save()
        return res.status(201).json({status:201, message: "User created successfully" })
    } 
})
router.post("/signin",validateSignin, async (req, res) => {
    const error = validationResult(req)
    if(error?.errors[0]?.msg) return res.status(400).json({status:400, message: `${error.errors[0].path}: ${error.errors[0].msg}` })

    // FIND USER 
    const findUser = await User.findOne({email : req.body.email})
    if(!findUser) return res.status(400).json({status:400, message: "User not found" })
    
    
    // COMPARE PASSWORD
    const comparePassword = await bcrypt.compare(req.body.password, findUser.password) 
    if(!comparePassword) return res.status(400).json({status:400, message: "Invalid password" })

    // CREATE TOKEN 
    const token = jwt.sign({email : findUser.email}, "Saad")
    res.status(200).json({status : 201, message : "Logged in successfully", token,user:findUser})
    })

module.exports = router;