// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./App.css";
// import { ClipLoader } from "react-spinners";

// function App() {
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch history on load
//     fetchHistory();
//   }, []);

//   const fetchHistory = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/api/history");
//       setHistory(response.data);
//     } catch (err) {
//       setError("Failed to load history");
//     }
//   };

//   const handleSubmit = async () => {
//     if (!question) return;

//     setLoading(true);
//     setError(null);
//     try {
//       // Make POST request to the backend
//       const response = await axios.post("http://localhost:8000/api/ask", {
//         question,
//       });
//       setAnswer(response.data.answer);
//       fetchHistory(); // Reload history after a successful question
//     } catch (err) {
//       setError("Failed to get a response from the AI service");
//     } finally {
//       setLoading(false);
//       setQuestion("");
//     }
//   };

//   return (
//     <div className="App">
//       <h1>AI Chat</h1>
//       <div>
//         <input
//           type="text"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           placeholder="Ask a question..."
//         />
//         <button onClick={handleSubmit} disabled={loading}>
//           {loading ? "Submitting..." : "Submit"}
//         </button>
//       </div>

//       {error && <div style={{ color: "red" }}>{error}</div>}

//       <div>
//         <h2>Answer:</h2>
//         {loading ? <ClipLoader size={50} color="#007bff" /> : <p>{answer}</p>}
//       </div>

//       <div>
//         <h2>History:</h2>
//         <ul>
//           {history.map((item, index) => (
//             <li key={index}>
//               <strong>Q:</strong> {item.question} <br />
//               <strong>A:</strong> {item.answer}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Main from "./components/Main";
import PrivateRoute from "../PrivateRouter";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/main"
          element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
