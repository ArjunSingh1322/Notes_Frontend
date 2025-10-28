

import React, { useState, useContext, useEffect } from "react";
import { NotesContext } from "../Layout/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  let [flag, setFlag] = useState(false);
  let { username, setUsername } = useContext(NotesContext); 
  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  let [notes, setNotes] = useState([]); 
  let navigate = useNavigate();

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
        .get(`http://localhost:5047/notes/?username=${username}`)
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
      .post(`http://localhost:5047/notes/create/${username}`, {
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

  function Remove(id,index) {
    axios
      .delete(`http://localhost:5047/notes/delete/${username}/${id}`)
      .then(() => console.log("success"))
      let temp = [...notes]
      temp.splice(index,0)
      setNotes(temp)
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.heading}>Notes App</h1>
        <div style={styles.headerRight}>
          <div style={styles.userGreeting}>Welcome, {username}!</div>
          <button onClick={Logout} style={styles.logoutButton}>Logout</button>
        </div>
      </div>

      <button onClick={display} style={styles.createButton}>
        <i className="fas fa-plus" style={{marginRight: "8px"}}></i>
        Create Note
      </button>

      {flag && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <h2 style={styles.modalTitle}>Add a new note</h2>
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={styles.textarea}
            />
            <div style={styles.modalActions}>
              <button onClick={closeModal} style={styles.cancelButton}>Cancel</button>
              <button onClick={saveNote} style={styles.saveButton}>Save</button>
            </div>
          </div>
        </div>
      )}

      <div style={styles.notesGrid}>
        {notes.map((note, index) => (
          <div key={index} style={styles.noteCard}>
            <div style={styles.noteHeader}>
              <h3 style={styles.noteTitle}>{note.title}</h3>
              <div style={styles.noteActions}>
                <button onClick={() => Remove(note._id,index)} style={styles.deleteButton}>Delete</button>
              </div>
            </div>
            <div style={styles.noteContent}>{note.content}</div>
            <div style={styles.noteFooter}>
              <small style={styles.noteDate}>Created: {new Date(note.createdAt).toLocaleDateString()}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { 
    padding: "2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: "1200px",
    margin: "0 auto"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    borderBottom: "1px solid #eee",
    paddingBottom: "1rem"
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "1rem"
  },
  heading: { fontSize: "2rem", color: "#333", margin: 0 },
  userGreeting: { fontSize: "1rem", color: "#666", fontWeight: "500" },

  logoutButton: {
    padding: "6px 12px",
    background: "#ff5252",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "all 0.2s ease"
  },

  createButton: {
    padding: "10px 16px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    transition: "all 0.3s ease",
    marginBottom: "2rem"
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000
  },

  modalBox: {
    background: "#fff",
    padding: "25px",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  modalTitle: { margin: "0 0 1rem 0", color: "#333", fontSize: "1.4rem" },
  input: { padding: "10px", borderRadius: "4px", border: "1px solid #ddd", width: "100%", fontSize: "1rem" },
  textarea: { padding: "10px", borderRadius: "4px", border: "1px solid #ddd", width: "100%", minHeight: "120px", fontSize: "1rem", resize: "vertical" },
  modalActions: { display: "flex", justifyContent: "flex-end", gap: "0.8rem" },

  cancelButton: {
    padding: "8px 16px",
    background: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },

  saveButton: {
    padding: "8px 16px",
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },

  notesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(600px, 1fr))",
    gap: "1.5rem",
    marginTop: "1.5rem"
  },

  noteCard: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    padding: "1.2rem",
    borderLeft: "4px solid #4CAF50"
  },

  noteHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "0.8rem"
  },

  noteTitle: { margin: 0, color: "#333", fontSize: "1.2rem", fontWeight: "600" },

  noteActions: { display: "flex", gap: "0.5rem" },

  deleteButton: {
    padding: "6px 10px",
    background: "transparent",
    border: "1px solid #f44336",
    color: "#f44336",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.85rem",
    transition: "all 0.2s ease"
  },

  noteContent: {
    color: "#555",
    fontSize: "0.95rem",
    lineHeight: "1.5",
    marginBottom: "1rem",
    whiteSpace: "normal",
    wordWrap: "break-word"
  },

  noteFooter: { display: "flex", justifyContent: "flex-end" },

  noteDate: { color: "#888", fontSize: "0.8rem" }
};

export default HomePage;
