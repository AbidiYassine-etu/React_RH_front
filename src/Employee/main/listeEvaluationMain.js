import React, { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Correct import

const ListeEvaluationMain = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [message, setMessage] = useState("");

  // Extract employee ID from the JWT token
  const getEmployeeIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token); // Decode the token
      console.log("Decoded Token:", decodedToken); // Log to verify the token structure
      return decodedToken.id; // Assuming 'id' in the token is the employeeId
    }
    return null; // Return null if no token is found
  };

  // Fetch employee evaluations
  useEffect(() => {
    const fetchEvaluations = async () => {
      const employeeId = getEmployeeIdFromToken();
      if (!employeeId) {
        setMessage("Employee ID not found.");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        console.log(token);
        if (!token) {
          setMessage("Token is missing.");
          return;
        }

        const response = await axios.get(
          `http://localhost:8082/evaluations/getEvaluationsByEmployee/${employeeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Log response data to verify its structure
        console.log("Evaluations Response:", response.data);

        // Check if response data is an array and handle it accordingly
        if (Array.isArray(response.data)) {
          if (response.data.length === 0) {
            setMessage("No evaluations found.");
          } else {
            setEvaluations(response.data);
          }
        } else {
          setMessage("Invalid data format.");
        }
      } catch (error) {
        setMessage("Error fetching evaluations.");
        console.error("Error fetching evaluations:", error);
      }
    };

    fetchEvaluations();
  }, []); // Empty dependency array to fetch only once

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">My Evaluations</h1>

      {message && (
        <div
          className={`alert mt-4 ${message.includes("found") ? "alert-warning" : "alert-danger"}`}
        >
          {message}
        </div>
      )}

      {evaluations.length > 0 ? (
        <div className="list-group mt-4">
          {evaluations.map((evaluation) => (
            <div key={evaluation.id} className="list-group-item">
              <h5>{evaluation.date_Eval}</h5>
              <p><strong>Note:</strong> {evaluation.note_Eval}</p>
              <p><strong>Comment:</strong> {evaluation.commantaire}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No evaluations found.</p>
      )}
    </div>
  );
};

export default ListeEvaluationMain;
