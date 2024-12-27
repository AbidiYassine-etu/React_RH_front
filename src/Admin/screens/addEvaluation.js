import React from 'react';
import Header from '../Header';
import Sidebar from '../sidebar';
import AddEvaluationMain from '../main/addEvaluationMain';

const AddEvaluation = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <AddEvaluationMain />
            </main>
        </>
    );
};

export default AddEvaluation;