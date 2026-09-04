import React, { useEffect, useState } from 'react'
import axios from 'axios'
const App = () => {

  const [notes, setNotes] = useState([]);

  const fetchNotes = ()=>{
    axios.get("https://backend-o7gl.onrender.com/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }

  const submitHandler = (e)=>{
    e.preventDefault()
    const {title, description } = e.target.elements //destructure
    console.log (title.value,description.value)
    axios
      .post("https://backend-o7gl.onrender.com/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then(fetchNotes);
  }
  
  const deleteHandler = (dets)=>{
    console.log(dets);
    axios
      .delete("https://backend-o7gl.onrender.com/api/notes/" + dets)
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  }
  useEffect(()=>{
    fetchNotes()
},[])
 
  return (
    <>
      <form onSubmit={submitHandler} className='note-create-form'>
        <input name="title" type="text" placeholder="Title" />
        <input name="description" type="text" placeholder="Description" />
        <button>Create Post</button>
      </form>

      <div className="notes">
        {notes.map((dets) => {
          return (
            <div className="note">
              <h1>{dets.title}</h1>
              <p>{dets.description}</p>
              <button onClick={()=>{
                deleteHandler(dets._id)
              }}> delete</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App
