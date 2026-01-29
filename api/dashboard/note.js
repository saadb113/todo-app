const express = require("express")
const router = express.Router()
const Note = require("../db/noteSchema")
const {body,validationResult} = require("express-validator")

const validateNoteInput = [
    body('title').notEmpty().withMessage("Title is required"),
    body('description').notEmpty().withMessage("Description is required")
]

router.post("/createNote", validateNoteInput, async(req, res) => { 
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    const newNote = new Note({
        title : req.body.title,
        description : req.body.description,
        user : req.body.user,
        isPinned : req.body.isPinned || false, 
        color : req.body.color
    })
    const saveNote = await newNote.save()
    const notes = await Note.find({user:req.body.user})
    if(saveNote) return res.status(201).json({status:201,message : "Note created successfully",notes})

})
router.put("/updateNote", validateNoteInput, async(req, res) => { 
    console.log(req.body._id)
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    const updateNote = await Note.findByIdAndUpdate(req.body._id, {
        title : req.body.title,
        description : req.body.description,
        isPinned : req.body.isPinned || false
    })
    const notes = await Note.find({user : req.body.user})
    if(!updateNote) return res.status(400).json({status:400,message : "Error"})
    res.status(201).json({status:201,message : "Note updated successfully", notes})

})

router.post("/getNotes", async(req, res) => {
    const user = req.body.userId
    const getNotes = await Note.find({user})
    res.json({notes : getNotes}) 
})
router.delete("/deleteNote", async(req, res) => {
    const getNotes = await Note.findByIdAndDelete(req.body.id)
    const notes = await Note.find({user : req.body.user})
    res.json({notes, message : "Note deleted successfully"}) 
})

module.exports = router