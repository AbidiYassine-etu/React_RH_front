import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Correct import

const AddEvaluationMain = () => {
  const [employees, setEmployees] = useState([]);
  const [evaluation, setEvaluation] = useState({
    date_Eval: "",
    note_Eval: "",
    commantaire: ""
  });
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [message, setMessage] = useState("");

  // Extract adminRHId from the JWT token
  const getAdminRHIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token); // Decode the token
      console.log("Decoded Token:", decodedToken); // Log to verify the token structure
      return decodedToken.id; // Assuming 'id' in the token is the adminRHId
    }
    return null; // Return null if no token is found
  };

  // Fetch the list of employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8082/employee/allEmp", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployees(response.data);
      } catch (error) {
        setMessage("Error fetching employees.");
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvaluation((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle employee selection change
  const handleEmployeeChange = (e) => {
    const selectedId = parseInt(e.target.value, 10); // Parse the selected ID to a number
    const selectedEmp = employees.find(emp => emp.id === selectedId);
    setSelectedEmployee(selectedEmp);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const adminRHId = getAdminRHIdFromToken(); // Extract adminRHId from token
    console.log("Selected Employee:", selectedEmployee); // Log selected employee
    console.log("Admin RH ID:", adminRHId); // Log admin RH ID

    if (selectedEmployee && adminRHId) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:8082/evaluations/addEvaluation",
          {
            date_Eval: evaluation.date_Eval,
            note_Eval: evaluation.note_Eval,
            commantaire: evaluation.commantaire,
          },
          {
            params: {
              employeeId: selectedEmployee.id,
              adminRHId: adminRHId,  // Use the adminRHId extracted from token
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 201) {
          setMessage("Evaluation added successfully!");
        }
      } catch (error) {
        setMessage("Error adding evaluation.");
        console.error("Error adding evaluation:", error);
      }
    } else {
      setMessage("Employee selection or Admin RH ID is missing.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Add Evaluation</h1>

      {message && (
        <div
          className={`alert mt-4 ${message.includes("successfully") ? "alert-success" : "alert-danger"}`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="employee">Select Employee</label>
          <select
            id="employee"
            name="employee"
            className="form-control"
            onChange={handleEmployeeChange}
            required
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.nom} {emp.prenom}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date_Eval">Date</label>
          <input
            type="date"
            className="form-control"
            id="date_Eval"
            name="date_Eval"
            value={evaluation.date_Eval}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="note_Eval">Note</label>
          <input
            type="text"
            className="form-control"
            id="note_Eval"
            name="note_Eval"
            value={evaluation.note_Eval}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="commantaire">Comment</label>
          <textarea
            className="form-control"
            id="commantaire"
            name="commantaire"
            value={evaluation.commantaire}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Add Evaluation
        </button>
      </form>
    </div>
  );
};

export default AddEvaluationMain;
