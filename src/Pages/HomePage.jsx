import React, { useState, useContext, useEffect } from "react";
import { NotesContext } from "../Layout/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../index.css';  // Import the new CSS file

const HomePage = () => {
  let [flag, setFlag] = useState(false);
  let { username, setUsername } = useContext(NotesContext);
  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  let [notes, setNotes] = useState([]);
  let navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    let checkname = localStorage.getItem("name");
    if (checkname) setUsername(checkname);
  }, [setUsername]);

  function Logout() {
    localStorage.removeItem("name");
    navigate("/");
  }

  useEffect(() => {
    if (username) {
      axios
        .get(`${BASE_URL}/notes/?username=${username}`)
        .then((res) => setNotes(res.data.data))
        .catch((error) => {
          console.error("Error fetching notes:", error);
        });
    }
  });

  function display() {
    setFlag(true);
  }

  function closeModal() {
    setFlag(false);
    setTitle("");
    setContent("");
  }

  function saveNote() {
    axios
      .post(`${BASE_URL}/notes/create/${username}`, {
        title: title,
        content: content,
      })
      .then((res) => {
        closeModal();
        setNotes((prev) => [...prev, res.data.data]);
      })
      .catch((error) => {
        console.error("Error creating note:", error);
        alert("Error creating note. Check console.");
      });
  }

  function Remove(id, index) {
    axios
      .delete(`${BASE_URL}/notes/delete/${username}/${id}`)
      .then(() => console.log("success"));
    let temp = [...notes];
    temp.splice(index, 0);
    setNotes(temp);
  }

  return (
    <div className="container">
      <div className="header">
        <h1 className="heading">Notes App</h1>
        <div className="headerRight">
          <div className="userGreeting">Welcome, {username}!</div>
          <button onClick={Logout} className="logoutButton">Logout</button>
        </div>
      </div>

      <button onClick={display} className="createButton">
        <i className="fas fa-plus" style={{ marginRight: "8px" }}></i>
        Create Note
      </button>

      {flag && (
        <div className="modalOverlay">
          <div className="modalBox">
            <h2 className="modalTitle">Add a new note</h2>
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="textarea"
            />
            <div className="modalActions">
              <button onClick={closeModal} className="cancelButton">Cancel</button>
              <button onClick={saveNote} className="saveButton">Save</button>
            </div>
          </div>
        </div>
      )}

      <div className="notesGrid">
        {notes.map((note, index) => (
          <div key={index} className="noteCard">
            <div className="noteHeader">
              <h3 className="noteTitle">{note.title}</h3>
              <div className="noteActions">
                <button onClick={() => Remove(note._id, index)} className="deleteButton">Delete</button>
              </div>
            </div>
            <div className="noteContent">{note.content}</div>
            <div className="noteFooter">
              <small className="noteDate">Created: {new Date(note.createdAt).toLocaleDateString()}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
