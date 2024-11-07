import React, { useEffect, useState } from "react";
import axios from "axios";

const Demandes = () => {
  const [demandes, setDemandes] = useState([]);
  const [filtreStatut, setFiltreStatut] = useState("Tous"); // État pour le statut sélectionné

  // Fonction pour récupérer les demandes de congé depuis l'API
  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const response = await axios.get("http://localhost:8082/conges/getAllConges");
        console.log("Réponse de l'API:", response.data);

        if (Array.isArray(response.data)) {
          setDemandes(response.data);
        } else {
          console.error("Les données récupérées ne sont pas un tableau :", response.data);
          setDemandes([]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des demandes de congé:", error);
        setDemandes([]);
      }
    };

    fetchDemandes();
  }, []);

  // Filtrer les demandes selon le statut sélectionné
  const demandesFiltrees = demandes.filter((demande) => {
    if (filtreStatut === "Tous") return true;
    return filtreStatut === "Accepté" ? demande.statut === "ALLOWED" : demande.statut === "REJECTED";
  });

  // Fonction pour calculer le nombre de jours restants
  const calculateRemainingDays = (dateDebut, dateFin) => {
    const startDate = new Date(dateDebut);
    const endDate = new Date(dateFin);
    const timeDifference = endDate - startDate;
    const daysRemaining = timeDifference / (1000 * 3600 * 24); // Conversion du temps en jours
    return daysRemaining;
  };

  return (
    <div className="card-body">
      <h5 className="card-title">Dernières demandes</h5>

      {/* Menu déroulant pour sélectionner le statut */}
      <div className="row gx-3 py-3">
        <div className="col-lg-4 col-md-6 me-auto">
          <input
            type="text"
            placeholder="Recherche..."
            className="form-control p-2"
          />
        </div>
        <div className="col-lg-2 col-6 col-md-3">
          <select
            className="form-select"
            value={filtreStatut}
            onChange={(e) => setFiltreStatut(e.target.value)}
          >
            <option value="Tous">Tous</option>
            <option value="Accepté">Accepté</option>
            <option value="Refusé">Refusé</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Date Début</th>
              <th>Date Fin</th>
              <th>Statut</th>
              <th>Nombre de jours restants</th> {/* Nouvelle colonne */}
            </tr>
          </thead>
          <tbody>
            {demandesFiltrees.length > 0 ? (
              demandesFiltrees.map((demande) => (
                <tr key={demande.id}>
                  <td><b>{demande.employee ? demande.employee.nom : "Employé inconnu"}</b></td>
                  <td>{demande.employee ? demande.employee.email : "Email inconnu"}</td>
                  <td>
                    <span>
                      {` ${new Date(demande.date_Debut).toLocaleDateString()} à ${new Date(demande.date_Debut).toLocaleTimeString()}`}
                    </span>
                  </td>
                  <td>
                    {` ${new Date(demande.date_Fin).toLocaleDateString()} à ${new Date(demande.date_Fin).toLocaleTimeString()}`}
                  </td>
                  <td>
                    <span className={`badge rounded-pill ${demande.statut === "ALLOWED" ? "alert-success" : "alert-danger"}`}>
                      {demande.statut === "ALLOWED" ? "Accepté" : "Refusé"}
                    </span>
                  </td>
                  <td>
                    {/* Affichage du nombre de jours restants */}
                    {calculateRemainingDays(demande.date_Debut, demande.date_Fin).toFixed(0)} jours
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">Aucune demande disponible.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Demandes;
