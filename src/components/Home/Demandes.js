import React from "react";
import { Link } from "react-router-dom";

const Demandes = () => {
  return (
    <div className="card-body">
      <h5 className="card-title">Dernières demandes</h5>
      <div className="table-responsive">
        <table className="table">
          <tbody>
            <tr>
              <td>
                <b>Emlpoyee</b>
              </td>
              <td>user@example.com</td>
              <td>
                <span className="badge rounded-pill alert-success">
                  Créé à aujourd'hui à 10h13
                </span>
              </td>
              <td>aujourd'hui à 10h13</td>
              <td className="d-flex justify-content-end align-item-center">
                <Link to={`/order`} className="text-success">
                  <i className="fas fa-eye"></i>
                </Link>
              </td>
            </tr>
            {/* Not Paid */}
            <tr>
              <td>
                <b>Employee</b>
              </td>
              <td>user@example.com</td>
              <td>
                <span className="badge rounded-pill alert-danger">
                Créé à aujourd'hui à 10h13
                </span>
              </td>
              <td>aujourd'hui à 10h13</td>
              <td className="d-flex justify-content-end align-item-center">
                <Link to={`/order`} className="text-success">
                  <i className="fas fa-eye"></i>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Demandes;
