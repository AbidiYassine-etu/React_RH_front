import React from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import OrderScreen from "./screens/CongesScreen";
import UsersScreen from "./screens/UsersScreen";
import AddEmployee from "./screens/AddEmployee";
import LoginScreen from "./screens/LoginScreen";
import Demandes from "./components/Home/Demandes"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen/>} exact />
          <Route path="/conges" element={<OrderScreen/>} />
          <Route path="/addemployee" element={<AddEmployee/>} />
          <Route path="/users" element={<UsersScreen/>} />
          <Route path="/login" element={<LoginScreen/>} />
          <Route path="/demandes" element={<Demandes/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
