import React, { useState, useEffect } from "react";
import axios from "axios";

const AllEmployeesMain = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [message, setMessage] = useState("");

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
        console.log(response.data);  // Log the data to ensure it has ids
        setEmployees(response.data);
      } catch (error) {
        setMessage("Error fetching employees.");
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Update employee information
  const handleUpdateEmployee = async (id, updatedEmployee) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8082/employee/updateEmp/${id}`,
        updatedEmployee,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setMessage("Employee updated successfully!");
        setEmployees((prevEmployees) =>
          prevEmployees.map((emp) =>
            emp.id === id ? { ...emp, ...updatedEmployee } : emp
          )
        );
      }
    } catch (error) {
      setMessage("Error updating employee.");
      console.error("Error updating employee:", error);
    }
  };

  // Delete employee
  const handleDeleteEmployee = async (id) => {
    if (!id) {
      console.error("Invalid employee ID"); // Log error if id is invalid
      setMessage("Invalid employee ID");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8082/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Employee deleted successfully!");
      setEmployees((prevEmployees) =>
        prevEmployees.filter((emp) => emp.id !== id)
      );
    } catch (error) {
        console.log(id);
        setMessage("Error deleting employee.");
        console.error("Error deleting employee:", error);
    }
  };

  // Form for editing an employee's details
  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee); // Fill form with employee's details
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    if (selectedEmployee) {
      handleUpdateEmployee(selectedEmployee.id, selectedEmployee);
      setSelectedEmployee(null); // Clear form
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Manage Employees</h1>

      {message && (
        <div
          className={`alert mt-4 ${message.includes("successfully") ? "alert-success" : "alert-danger"}`}
        >
          {message}
        </div>
      )}

      <h2>Employee List</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No employees available
              </td>
            </tr>
          ) : (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.nom} {employee.prenom}</td>
                <td>{employee.email}</td>
                <td>{employee.departement}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEditEmployee(employee)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ml-2"
                    onClick={() => {
                        console.log("Deleting employee with ID:", employee.id); // Log the ID
                        handleDeleteEmployee(employee.id);  // Ensure employee.id is passed
                      }}
                    >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selectedEmployee && (
        <div className="mt-4">
          <h2>Edit Employee</h2>
          <form onSubmit={handleSubmitUpdate}>
            <div className="form-group">
              <label htmlFor="nom">Name</label>
              <input
                type="text"
                className="form-control"
                id="nom"
                name="nom"
                value={selectedEmployee.nom}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="prenom">Surname</label>
              <input
                type="text"
                className="form-control"
                id="prenom"
                name="prenom"
                value={selectedEmployee.prenom}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={selectedEmployee.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="departement">Department</label>
              <input
                type="text"
                className="form-control"
                id="departement"
                name="departement"
                value={selectedEmployee.departement}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={selectedEmployee.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Update Employee
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AllEmployeesMain;
