import React from "react";
import Conges from "./Conges";

const CongesMain = () => {
    return (
        <section className="content-main">
            <div className="content-header">
                <h2 className="content-title">Congés List</h2>
            </div>

            <div className="card mb-4b shadow-sm">
                <header className="card-header bg-white">
                    <div className="row gx-3 py-3">
                        <div className="col-lg-4 col-md-6 me-auto">
                            <input
                                type="text"
                                placeholder="Recherche..."
                                className="form-control p-2"
                            />
                        </div>
                        <div className="col-lg-2 col-6 col-md-3">
                            <select className="form-select">
                                <option>Status</option>
                                <option>Actif</option>
                                <option>Refusé</option>
                                <option>Tous</option>
                            </select>
                        </div>
                    </div>
                </header>
                <div className="card-body">
                    <div className="table-responsive">
                        <Conges />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CongesMain;