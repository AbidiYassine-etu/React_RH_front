import React from "react";
import Sidebar from "../components/products/Sidebar"
import Header from "./../components/Header"
import UserComponent from "./../components/users/UserComponent";
import AddFeuilleTemps from "../components/products/AddFeuille";

const AddFeuille = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <AddFeuilleTemps />
            </main>
        </>
    );
};

export default AddFeuilleTemps;