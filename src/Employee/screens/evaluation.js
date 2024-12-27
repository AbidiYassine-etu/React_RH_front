import React from "react";
import Sidebar from "../components/sidebar"
import Header from "../components/Header"
import ListeEvaluationMain from "../main/listeEvaluationMain";
const ListEvaluationScreen = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <ListeEvaluationMain />
            </main>
        </>
    );
};

export default ListEvaluationScreen;