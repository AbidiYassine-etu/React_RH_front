import React from "react";
import Sidebar from "../components/sidebar"
import Header from "../components/Header"
import PresenceMain from "../main/PresenceMain";

const PresenceScreen = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <PresenceMain />
            </main>
        </>
    );
};

export default PresenceScreen;