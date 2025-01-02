import { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../axiosInstance";
import "../App.css";
import { ClipLoader } from "react-spinners";

function Main() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch history on load
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axiosInstance.get("/history");
      setHistory(response.data);
    } catch (err) {
      setError("Failed to load history");
    }
  };

  const handleSubmit = async () => {
    if (!question) return;

    setLoading(true);
    setError(null);
    try {
      // Make POST request to the backend
      const response = await axiosInstance.post("/ask", {
        question,
      });
      console.log(response);
      setAnswer(response.data.answer);
      fetchHistory(); // Reload history after a successful question
    } catch (err) {
      setError("Failed to get a response from the AI service");
    } finally {
      setLoading(false);
      setQuestion("");
    }
  };

  return (
    <div className="App">
      <h1>AI Chat</h1>
      <div>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
        />
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>}

      <div>
        <h2>Answer:</h2>
        {loading ? <ClipLoader size={50} color="#007bff" /> : <p>{answer}</p>}
      </div>

      <div>
        <h2>History:</h2>
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              <strong>Q:</strong> {item.question} <br />
              <strong>A:</strong> {item.answer}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Main;
