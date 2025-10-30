
// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { NotesContext } from "../Layout/Context";

// const SignupPage = () => {
//   const [error, setError] = useState("");
//   let { username, setUsername } = useContext(NotesContext); 
//   let navigate = useNavigate();


//      let BASE_URL = import.meta.env.VITE_API_BASE_URL;


//   function handleInputChange(e) {
//     const newName = e.target.value;
//     setUsername(newName);
//     localStorage.setItem("name", newName);
//   }

//   function handleClick() {
//     setError("");
//     axios
//       .get(`${BASE_URL}/notes/?username=${username}`)
//       .then((response) => {
//         navigate("/home"); 
//       })
//       .catch((error) => {
//         setError("Error fetching notes.");
//         console.error(error);
//       });
//   }

//   return (
//     <div style={styles.container}>
//       <div style={styles.loginBox}>
//         <h2 style={styles.title}>Login to Notes App</h2>
//         <input
//           type="text"
//           placeholder="Enter your username"
//           value={username}
//           onChange={handleInputChange}
//           style={styles.input}
//         />
//         <button onClick={handleClick} style={styles.loginButton}>Fetch Notes</button>
//         {error && <p style={styles.error}>{error}</p>}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     minHeight: "100vh",
//     backgroundColor: "#f5f5f5",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "1rem",
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//   },
//   loginBox: {
//     backgroundColor: "#fff",
//     padding: "2rem",
//     borderRadius: "8px",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//     width: "100%",
//     maxWidth: "400px",
//     textAlign: "center",
//   },
//   title: {
//     marginBottom: "1.5rem",
//     color: "#333",
//     fontSize: "1.5rem",
//   },
//   input: {
//     padding: "10px",
//     borderRadius: "4px",
//     border: "1px solid #ddd",
//     width: "100%",
//     fontSize: "1rem",
//     marginBottom: "1rem",
//     transition: "border-color 0.3s",
//   },
//   loginButton: {
//     padding: "10px",
//     backgroundColor: "#4CAF50",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//     width: "100%",
//     fontSize: "1rem",
//     fontWeight: "500",
//     transition: "background-color 0.3s ease",
//   },
//   error: {
//     color: "#f44336",
//     marginTop: "1rem",
//     fontSize: "0.9rem",
//   }
// };

// export default SignupPage;







import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NotesContext } from "../Layout/Context";

const SignupPage = () => {
  const [error, setError] = useState("");
  let { username, setUsername } = useContext(NotesContext);
  let navigate = useNavigate();

  // ✅ Backend URL from .env file
  let BASE_URL = import.meta.env.VITE_API_BASE_URL;
  console.log(BASE_URL)

  function handleInputChange(e) {
    const newName = e.target.value;
    setUsername(newName);
    localStorage.setItem("name", newName);
  }

  async function handleClick() {
    setError("");
    try {
      const response = await axios.get(`${BASE_URL}/notes?username=${username}`);
      console.log("✅ Notes fetched successfully:", response.data);
      navigate("/home");
    } catch (err) {
      console.error("❌ Error fetching notes:", err);
      setError("Error fetching notes. Please try again later.");
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Login to Notes App</h2>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={handleInputChange}
          style={styles.input}
        />
        <button onClick={handleClick} style={styles.loginButton}>
          Fetch Notes
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  loginBox: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    marginBottom: "1.5rem",
    color: "#333",
    fontSize: "1.5rem",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    width: "100%",
    fontSize: "1rem",
    marginBottom: "1rem",
    transition: "border-color 0.3s",
  },
  loginButton: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "background-color 0.3s ease",
  },
  error: {
    color: "#f44336",
    marginTop: "1rem",
    fontSize: "0.9rem",
  },
};

export default SignupPage;













