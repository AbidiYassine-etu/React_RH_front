import React from "react";
import Presences from "../components/Presence";

const PresenceMain = () => {
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Liste des congés</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
           
          </div>
        </header>
        <div className="card-body">
          <div className="table-responsive">
            <Presences />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PresenceMain;
