import React from "react";

const Conges = () => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Nom</th>
          <th scope="col">Email</th>
          <th scope="col">Date</th>
          <th>Status</th>
          <th scope="col" className="text-end">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <b>Yasine</b>
          </td>
          <td>user@example.com</td>
          <td>
            <span className="badge rounded-pill alert-success">
              Créé à aujourd'hui
            </span>
            </td>
            <td>
            <span className="badge btn-success">Accepté</span>
          </td>
        </tr>
        <tr>
          <td>
            <b>Eya</b>
          </td>
          <td>user@example.com</td>
          <td>
            <span className="badge rounded-pill alert-success">
              Créé à aujourd'hui
            </span>
            </td>
            <td>
            <span className="badge btn-success">Accepté</span>
          </td>
          <td className="d-flex justify-content-end align-item-center">
          </td>
        </tr>
      </tbody>
      
    </table>
  );
};

export default Conges;
