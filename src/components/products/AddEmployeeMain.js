import React from "react";

const AddEmployeeMain = () => {
    return (
        <>
            <section className="content-main" style={{ maxWidth: "1200px" }}>
                <form>
                    <div className="content-header">
                        <h2 className="Content-title">Ajouter Employée</h2>
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
                                        <label htmlFor="product_title" className="form-label">
                                            Nom
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Tapez ici"
                                            className="form-control"
                                            id="Nom"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="product_price" className="form-label">
                                            Prenom
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Tapez ici"
                                            className="form-control"
                                            id="Prenom"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="product_count" className="form-label">
                                            Email
                                        </label>
                                        <input
                                            type="Text"
                                            placeholder="tapez ici"
                                            className="form-control"
                                            id="Email"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label">
                                            Mot de Passe
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="tapez ici"
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