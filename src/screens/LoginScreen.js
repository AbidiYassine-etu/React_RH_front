import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 

    try {
      const response = await axios.post("http://localhost:8082/employee/login", {
        email: email,
        password: password,
      });

      if (response && response.data) {
        console.log("Login successful", response.data);
        localStorage.setItem("token", response.data.token);
      } else {
        setError("Unexpected response format from server.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Login failed. Please try again.");
      } else {
        setError("An unknown error occurred. Please try again.");
      }
      console.error("Login failed", error);
    }
  };

  return (
    <>
      <div
        className="card shadow mx-auto"
        style={{ maxWidth: "380px", marginTop: "100px" }}
      >
        <div className="card-body">
          <h4 className="card-title mb-4 text-center">Sign in</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
