import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/products/Sidebar";
import Header from "../components/Header"; // Import du Header

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("http://localhost:8082/employees/me"); // URL à adapter selon votre API
        setUserInfo(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des informations personnelles:", error);
      }
    };

    fetchUserInfo();
  }, []);

  if (!userInfo) return <p>Chargement des informations...</p>;

  return (
    <div className="app-container" style={{ display: "flex" }}>
      <Sidebar />
      <div className="content" style={{ flex: 1, marginLeft: "200px" }}>
        <Header /> {/* Ajout du Header ici */}
        <div className="profile">
          <h2>Informations Personnelles</h2>
          
          <div className="profile-item">
            <strong>Nom:</strong> <span>{userInfo.nom}</span>
          </div>
          <div className="profile-item">
            <strong>Email:</strong> <span>{userInfo.email}</span>
          </div>
          <div className="profile-item">
            <strong>Poste:</strong> <span>{userInfo.poste}</span>
          </div>
          <div className="profile-item">
            <strong>Adresse:</strong> <span>{userInfo.adresse}</span>
          </div>
          <div className="profile-item">
            <strong>Numéro de téléphone:</strong> <span>{userInfo.telephone}</span>
          </div>
          <div className="profile-item">
            <strong>Date d'inscription:</strong> <span>{new Date(userInfo.dateInscription).toLocaleDateString()}</span>
          </div>
          <div className="profile-item">
            <strong>Département:</strong> <span>{userInfo.departement}</span>
          </div>
          <div className="profile-item">
            <strong>Expérience professionnelle:</strong> <span>{userInfo.experience} ans</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
