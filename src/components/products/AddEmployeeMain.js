import React, { useState } from "react";

const AddEmployeeMain = () => {
    // Déclaration des états pour chaque champ du formulaire
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [dateDebut, setDateDebut] = useState("");
    const [dateFin, setDateFin] = useState("");

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault(); // Empêcher le rechargement de la page

        // Affichage des valeurs soumises (tu peux les envoyer à un backend ici)
        console.log({
            nom,
            prenom,
            email,
            dateDebut,
            dateFin
        });

        // Réinitialiser les champs après soumission (optionnel)
        setNom("");
        setPrenom("");
        setEmail("");
        setDateDebut("");
        setDateFin("");
    };

    return (
        <>
            <section className="content-main" style={{ maxWidth: "1200px" }}>
                <form onSubmit={handleSubmit}>
                    <div className="content-header">
                        <h2 className="Content-title">Ajouter Congé</h2>
                        <div>
                            <button type="submit" className="btn btn-primary">
                                Ajout
                            </button>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-xl-8 col-lg-8">
                            <div className="card mb-4 shadow-sm">
                                <div className="card-body">
                                    <div className="mb-4">
                                        <label htmlFor="Nom" className="form-label">
                                            Nom
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Tapez ici"
                                            className="form-control"
                                            id="Nom"
                                            value={nom}
                                            onChange={(e) => setNom(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="Prenom" className="form-label">
                                            Prénom
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Tapez ici"
                                            className="form-control"
                                            id="Prenom"
                                            value={prenom}
                                            onChange={(e) => setPrenom(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="Email" className="form-label">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="Tapez ici"
                                            className="form-control"
                                            id="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label">
                                            Date De Début
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="Date_Debut"
                                            value={dateDebut}
                                            onChange={(e) => setDateDebut(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label">
                                            Date Fin
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="Date_fin"
                                            value={dateFin}
                                            onChange={(e) => setDateFin(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
};

export default AddEmployeeMain;
