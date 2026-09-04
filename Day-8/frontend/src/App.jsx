import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [notes, setnotes] = useState([

  ]);

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setnotes(res.data.notes);
    });
  }

function handleSubmit(e){
  e.preventDefault()

  const {title, description } = e.target.elements
  console.log(title.value,description.value);
  axios.post("http://localhost:3000/api/notes",{
    title: title.value,
    description: description.value
  }).then(res=>{
    console.log(res.data)
    fetchNotes() 
  })
}

function deleteHandler(noteId){
  axios.delete("http://localhost:3000/api/notes/"+noteId)
  .then(res=>{
    console.log(res.data)
    fetchNotes()
  })
console.log(noteId);

  
}

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
    <form className="note-create-form" onSubmit={handleSubmit}>
      <input name="title" type="text" placeholder="Enter Title" />
      <input name="description" type="text" placeholder="Enter Description" />
      <button>Create Note</button>
    </form>
      <div className="notes">
        {notes.map((note) => {
          return (
            <div className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={()=>{
                deleteHandler(note._id)
              }}>Delete</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
