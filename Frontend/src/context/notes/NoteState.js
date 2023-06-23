import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState=(props)=>{
const host="http://localhost:5000"
const notesInitial=[]
const [notes,setNotes]=useState(notesInitial)

//Get All NOtes
const getNotes=async ()=>{
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('auth-token')
    } 
  });
    const json=await response.json()
    setNotes(json )
}  

  //Add NOte 
  const addNote = async (title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('auth-token')
      },
      body: JSON.stringify({title, description, tag})
    });

    const note = await response.json();
    setNotes(notes.concat(note))
  }

  //Delete NOte
const deleteNote=async (id)=>{
  //TODO: API Call

  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('auth-token')
    }
  });
  const json =response.json(); 
  const newNotes=notes.filter((note)=>{return note._id!==id})
  setNotes(newNotes) 
  }
  //Edit a Note
//   const editNote=async (id,title,description,tag)=>{
//     //API Call
//     const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
//   method: "PUT",
//   headers: {
//     "Content-Type": "application/json",
//     "auth-token":
//   },    
//   body: JSON.stringify({title,description,tag}), 
// });
// const json =await response.json(); 
// let newNotes=JSON.parse(JSON.stringify(notes))
//     //Edit in Client Side
//   for (let index = 0; index < newNotes.length; index++) {
//     const element = newNotes[index];
//     if(element._id===id){
//     newNotes[index].title=title;
//     newNotes[index].description=description;
//     newNotes[index].tag=tag;
//     break;
//     }
//   } 
//   setNotes(newNotes) 
//   }
const editNote = async (id, title, description, tag) => {
  // API Call 
  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzMGVhNjVhMWY0NzE0YWUxZWEyOTI0In0sImlhdCI6MTY4Mjc1NzkwOH0.U-DzFzF9KLVCVq6-LqzV4jo_ncMMOYSS40P8sG-ysmg"
    },
    body: JSON.stringify({title, description, tag})
  });
  const json = await response.json(); 

   let newNotes = JSON.parse(JSON.stringify(notes))
  // Logic to edit in client
  for (let index = 0; index < newNotes.length; index++) {
    const element = newNotes[index];
    if (element._id === id) {
      newNotes[index].title = title;
      newNotes[index].description = description;
      newNotes[index].tag = tag; 
      break; 
    }
  }  
  setNotes(newNotes);
}


return(
    <NoteContext.Provider value={{notes,addNote, deleteNote, editNote, getNotes}}>
     {props.children}
    </NoteContext.Provider>
)
}

export default NoteState;

