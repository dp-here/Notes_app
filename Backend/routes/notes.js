const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

//Route 1: Get all the notes :GET "api/notes/fetchallnotes". Login required.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//Route 2: Add a new notes :POST "api/auth/addnote". Login required.
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be of min length 5").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      else{
      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await notes.save();
      res.json(savedNote);
      // res.redirect('/fetchallnotes') 
       //it is giving error: Cannot set headers after they are sent to the client 
    }}
     catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route 3: Update an existing note:PUT "api/notes/updatenote". Login required.
router.put(
    "/updatenote/:id",
    fetchuser,
    async (req, res) => { 
    const {title,description,tag}=req.body

    try {

    //Creating new note 
    const newNote={}
    if(title){
        newNote.title=title
    }
    if(description){
        newNote.description=description;
    }
    if(tag){
        newNote.tag=tag;
    }

    //Find the note to be updated and update it.
    let note=await Notes.findById(req.params.id)
    if(!note){
      return res.status(404).send("Not Found")
    }
    if(note.user.toString()!==req.user.id){
       return res.status(401).send("Not Allowed")
    }

    note=await Notes.findByIdAndUpdate(req.params.id, {$set: newNote},{new:true})
    res.json({note})
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error"); 
  }
    })

    //Route 4: Delete an existing note:DELETE "api/notes/deletenote". Login required.
router.delete(
  "/deletenote/:id",
  fetchuser,
  async (req, res) => { 
  try {

  //Find the note to be delete and delete it.
  let note=await Notes.findById(req.params.id)
  if(!note){
    return res.status(404).send("Not Found")
  }
  //Allow deletion if user owns the note.
  if(note.user.toString()!==req.user.id){
     return res.status(401).send("Not Allowed")
  }

  note=await Notes.findByIdAndDelete(req.params.id)
  res.json({"SUCCESS":"Note has been deleted.",note:note})
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error"); 
}
  })

module.exports = router;
