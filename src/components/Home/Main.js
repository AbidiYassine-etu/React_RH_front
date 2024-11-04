import React from "react";
import Demandes from "./Demandes";

const Main = () => {
  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title"> Dashboard </h2>
        </div>
        <div className="card mb-4 shadow-sm">
          <Demandes />
        </div>
      </section>
    </>
  );
};

export default Main;
