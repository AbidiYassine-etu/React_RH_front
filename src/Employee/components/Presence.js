import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Presences = () => {
  const [presences, setPresences] = useState([]);
  const token = localStorage.getItem("token");
  const payload = jwtDecode(token);
  const emp_id = payload.id;

  // Function to fetch presences from the API
  useEffect(() => {
    const fetchPresences = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/presences/employee/${emp_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Response from API:", response.data);

        if (Array.isArray(response.data)) {
          setPresences(response.data);
        } else {
          console.error("The fetched data is not an array:", response.data);
          setPresences([]);
        }
      } catch (error) {
        console.error("Error fetching presences:", error);
        setPresences([]);
      }
    };

    fetchPresences();
  }, [emp_id, token]);

  // Export presences (you can customize this function)
  const exportPresences = async () => {
    try {
      const response = await axios.get(`http://localhost:8082/employee/exportPresence/${emp_id}`, {
        responseType: "arraybuffer",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `presences_employee_${emp_id}.xlsx`;
      link.click();
    } catch (error) {
      console.error("Error exporting presences:", error);
    }
  };

  return (
    <div className="card-body">
      <h5 className="card-title">Presences</h5>

      {/* Button to export presences */}
      <div className="mb-3">
        <button className="btn btn-primary" onClick={exportPresences}>
          Exporter Presences
        </button>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Heure de connexion</th>
            </tr>
          </thead>
          <tbody>
            {presences.length > 0 ? (
              presences.map((presence) => (
                <tr key={presence.id}>
                  <td><b>{presence.employee ? presence.employee.nom : "Employee not found"}</b></td>
                  <td>{presence.employee ? presence.employee.email : "Email not found"}</td>
                  <td>{new Date(presence.loginTime).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No presence data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Presences;
