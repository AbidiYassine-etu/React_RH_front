import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar"; // Si vous avez une barre latérale

const ListeFeuille = () => {
  const [feuilles, setFeuilles] = useState([]);
  const [filtreStatut, setFiltreStatut] = useState("Tous");

  // Récupérer les feuilles de temps depuis l'API
  useEffect(() => {
    const fetchFeuilles = async () => {
      try {
        const response = await axios.get("http://localhost:8082/feuilles/getAllFeuilles");
        console.log("Réponse de l'API:", response.data);
        setFeuilles(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des feuilles de temps:", error);
      }
    };

    fetchFeuilles();
  }, []);

  // Filtrer les feuilles selon le statut sélectionné
  const feuillesFiltrees = feuilles.filter((feuille) => {
    if (filtreStatut === "Tous") return true;
    return filtreStatut === "Validée" ? feuille.statut === "VALIDATED" : feuille.statut === "PENDING";
  });

  return (
    <div className="card-body">
      <Sidebar /> {/* Inclure la barre latérale */}
      <div className="card" style={{ marginLeft: "250px", width: "calc(100% - 250px)", padding: "20px" }}>
        <h5 className="card-title text-center mb-4">Liste des Feuilles de Temps</h5>

        <div className="d-flex justify-content-between mb-3">
          <div className="col-lg-4 col-md-6 me-auto">
           
            
          </div>
          <div className="col-lg-2 col-md-3">
            <select
              className="form-select"
              value={filtreStatut}
              onChange={(e) => setFiltreStatut(e.target.value)}
            >
              <option value="Tous">Tous</option>
              <option value="Validée">Validée</option>
              <option value="En attente">En attente</option>
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Date</th>
                <th>Heures travaillées</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {feuillesFiltrees.length > 0 ? (
                feuillesFiltrees.map((feuille) => (
                  <tr key={feuille.id}>
                    <td><b>{feuille.employee ? feuille.employee.nom : "Employé inconnu"}</b></td>
                    <td>{feuille.employee ? feuille.employee.email : "Email inconnu"}</td>
                    <td>{new Date(feuille.date).toLocaleDateString()}</td>
                    <td>{feuille.heures_travaillees} heures</td>
                    <td>
                      <span className={`badge rounded-pill ${feuille.statut === "VALIDATED" ? "alert-success" : "alert-warning"}`}>
                        {feuille.statut === "VALIDATED" ? "Validée" : "En attente"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">Aucune feuille disponible.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListeFeuille;
