import React from "react";
import Sidebar from "../components/products/Sidebar"
import Header from "../components/Header"
import AddEmployeeMain from "../components/products/AddEmployeeMain";

const AddEmployee = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                
                <AddEmployeeMain />
            </main>
        </>
    );
};

export default AddEmployee;