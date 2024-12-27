import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AddFeuilleMain = () => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [taskDescription, setTaskDescription] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const payload = jwtDecode(token);
  const employeeId = payload.id;
  const status = "UNDECIDED";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Validate date
    if (selectedDate < today) {
      setError("La date ne peut pas être dans le passé.");
      return;
    }

    // Validate task description
    if (!taskDescription.trim()) {
      setError("La description de la tâche ne peut pas être vide.");
      return;
    }

    // Validate start and end times
    const start = new Date(`1970-01-01T${startTime}`); 
    const end = new Date(`1970-01-01T${endTime}`); 
    const eightHoursInMilliseconds = 8 * 60 * 60 * 1000; 

    if (end <= start) {
      setError("L'heure de fin doit être supérieure à l'heure de début.");
      return;
    }

    if (Math.abs(end - start) !== eightHoursInMilliseconds) {
      setError("La durée de travail doit être de 8 heures.");
      return;
    }

    setError(""); 

    const feuilleTempsData = {
      date: selectedDate.toISOString().split("T")[0],
      startTime: startTime,
      endTime: endTime,
      taskDescription,
      status,
      employeeId,
    };

    try {
      const response = await axios.post(
        "http://localhost:8082/api/feuille-temps/addFeuille/",
        feuilleTempsData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Feuille de temps ajoutée avec succès:", response.data);

      // Reset the form
      setDate("");
      setStartTime("09:00");
      setEndTime("17:00");
      setTaskDescription("");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la feuille de temps:", error.response || error);
      setError("Une erreur est survenue lors de l'ajout de la feuille de temps.");
    }
  };

  return (
    <section className="content-main" style={{ maxWidth: "1200px" }}>
      <form onSubmit={handleSubmit}>
        <div className="content-header">
          <h2 className="content-title">Ajouter Feuille de Temps</h2>
          <div>
            <button type="submit" className="btn btn-primary">
              Ajouter
            </button>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-xl-8 col-lg-8">
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="mb-4">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Heure de début</label>
                  <input
                    type="time"
                    className="form-control"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Heure de fin</label>
                  <input
                    type="time"
                    className="form-control"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    placeholder="Décrivez la tâche accomplie"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddFeuilleMain;