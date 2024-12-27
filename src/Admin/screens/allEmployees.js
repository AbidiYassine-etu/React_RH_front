import React from 'react';
import Header from '../Header';
import Sidebar from '../sidebar';
import AllEmployeesMain from '../main/allEmployeesMain';

const AllEmployee = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <AllEmployeesMain />
            </main>
        </>
    );
};

export default AllEmployee;