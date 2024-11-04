import React from "react";
import Sidebar from "../components/sidebar"
import Header from "../components/Header"
import CongesMain from "../components/orders/CongesMain";

const CongesScreen = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <CongesMain />
            </main>
        </>
    );
};

export default CongesScreen;