// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../axiosInstance";

// const Login = () => {
//   const [formData, setFormData] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Make the API call to log the user in
//       const response = await axiosInstance.post("/login", formData);

//       // Save the token in localStorage
//       localStorage.setItem("token", response.data.access_token);
//       console.log("Token:", response.data.access_token);

//       // Redirect to the homepage or dashboard after successful login
//       alert("Login successful");
//       navigate("/main"); // Change this to the page you'd like to redirect to after login
//     } catch (err) {
//       // Handle error if login fails
//       setError(err.response?.data?.detail || "Invalid credentials");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username:</label>
//           <input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import "../App.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/login", formData);
      localStorage.setItem("token", response.data.access_token);
      console.log("Token:", response.data.access_token);
      alert("Login successful");
      navigate("/main");
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
