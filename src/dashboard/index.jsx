
import { useEffect, useState } from 'react';
import '../App.css';
import Sidebar from "./components/sidebar"
import NoteCard from "./components/notesCard.jsx"
import Toast from "./components/toast"

function App({user}) {
    const [Notes, setNotes] = useState([]);
     const [Note, setNote] = useState({});
const [toastText, settoastText] = useState(null);
   useEffect(() => {
    fetch("https://todo-app-7ffy.onrender.com/dashboard/getNotes",{
        method : "POST",
        headers :{
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({userId : user._id})
    }).then(res=>res.json()).then(data=>{
        if(data.notes){
            const PinNotesFirst = data.notes.sort((a,b) => b.isPinned - a.isPinned);
            setNotes(PinNotesFirst)
        }else{
            setNotes([])
        }
    });
   }, []);




   const handleSubmit = async(e,noteId)=>{
    const isNewNote = noteId !== undefined ? false : true
    console.log(Note);
    console.log(noteId,isNewNote)
        e.preventDefault()
        await fetch(!isNewNote ? "https://todo-app-7ffy.onrender.com/dashboard/updateNote" : "https://todo-app-7ffy.onrender.com/dashboard/createNote",{
            method : !isNewNote ? "PUT" : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({...Note, user : user._id})
        }).then(res=>res.json()).then(data=>{
            if(data.status === 201){
            const PinNotesFirst = data.notes.sort((a,b) => b.isPinned - a.isPinned);
                settoastText(data.message)
                setNote(null)
                setNotes(PinNotesFirst)
            }
        })
    }
    const deleteNote = async(id)=>{
        await fetch("https://todo-app-7ffy.onrender.com/dashboard/deleteNote",{
            method : "delete",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({id,user : user._id})
        }).then(res=>res.json()).then(data=>{
            settoastText(data.message)
            setNote(null)
            setNotes(data.notes)
        })
    }
    return (
        <div className="dashboard">
            
            <Sidebar setNote={setNote} user={user}/>
            <div className="mainSection">
                <h1>Notes</h1>
                <div className="notes-container">
                    {
                        Notes !=null &&
                        Notes.map((note) => {
                            return(
                            <NoteCard key={note._id} note={note} setNote={setNote} />
                        )})
                    }
                </div>

               
            </div>
             {
                Note?.color && (
                    <div className="create-note-popup">
                        <div className="bg" onClick={()=>setNote({...Note,color : null})}></div>
                        <form onSubmit={(event)=>handleSubmit(event,Note._id)} style={{background : Note.color}}>
                            {console.log(Note._id)}
                        <div className="header">
                        <button type='button' className="back" onClick={()=>setNote({...Note,color : null})}>
                            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            Notes
                        </button>
                        <div className="actions">
                            <button type='button' className='pin' onClick={()=>setNote({...Note, isPinned : !Note.isPinned})}>
                                {
                                    Note.isPinned ? (
                                
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" class="star-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>
                                    ):(
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" class="star-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path></svg>
                                    )
                                }
                            </button>
                            <button onClick={()=>deleteNote(Note._id)} className="delete">
                                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="action-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                            </button>
                            <button type='submit' className='submit'>
                                Done
                            </button>
                        </div>
                    </div>
                    <input value={Note.title} onChange={(e)=>setNote({...Note, title : e.target.value})} type="text" placeholder='Title...' />
                    <textarea value={Note.description} onChange={(e)=>setNote({...Note, description : e.target.value})} name="" id="" placeholder='Start writing...'>

                    </textarea>
                    </form>
                </div>
                )}

                {
                toastText && (
                    <Toast text={toastText}/>
                )
            }{

                setTimeout(() => {
                    settoastText(null)
                }, 8000)
            }
        </div>
    );
}

export default App;
