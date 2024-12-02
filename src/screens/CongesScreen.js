import React from "react";
import Sidebar from "../components/products/Sidebar"
import Header from "../components/Header"
import CongesMain from "../components/orders/CongesMain";

const CongesScreen = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                
                <CongesMain />
            </main>
        </>
    );
};

export default CongesScreen;