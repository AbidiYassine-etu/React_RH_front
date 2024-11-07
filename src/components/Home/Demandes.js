import React, { useEffect, useState } from "react";
import axios from "axios";

const Demandes = () => {
  const [demandes, setDemandes] = useState([]);

  // Fonction pour récupérer les demandes de congé depuis l'API
  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const response = await axios.get("http://localhost:8082/conges/getAllConges");
        console.log("Réponse de l'API:", response.data); // Vérifiez ce que renvoie l'API

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

  return (
    <div className="card-body">
      <h5 className="card-title">Dernières demandes</h5>
      <div className="table-responsive">
        <table className="table">
          <tbody>
            {Array.isArray(demandes) && demandes.length > 0 ? (
              demandes.map((demande) => (
                <tr key={demande.id}>
                  <td><b>{demande.employee ? demande.employee.nom : "Employé inconnu"}</b></td>
                  <td>{demande.employee ? demande.employee.email : "Email inconnu"}</td>
                  <td>
                    <span className={`badge rounded-pill ${demande.statut === "ALLOWED" ? "alert-success" : "alert-danger"}`}>
                      {`Créé à ${new Date(demande.date_Debut).toLocaleDateString()} à ${new Date(demande.date_Debut).toLocaleTimeString()}`}
                    </span>
                  </td>
                  <td>{`Fin à ${new Date(demande.date_Fin).toLocaleDateString()} à ${new Date(demande.date_Fin).toLocaleTimeString()}`}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Aucune demande disponible.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Demandes;
