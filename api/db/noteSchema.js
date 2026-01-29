const mongoose = require("mongoose")
const noteSchema = new mongoose.Schema({
 time : {type : Date, default : Date.now},
 title : String,
 description : String,
 color : String,
 isPinned : Boolean,
 user : {type : mongoose.Schema.Types.ObjectId, ref : "User"}

})
const Note = mongoose.model("Note", noteSchema)

module.exports = Note