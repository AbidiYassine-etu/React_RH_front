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
import Demandes from "./components/Home/Demandes";
import Profile from "./screens/Profile";
import AddFeuilleTemps from "./components/products/AddFeuille";
import AddFeuille from "./components/products/AddFeuille";
import ListFeuilleTemps from "./components/products/Feuille";




function App() {
  return (
    <>
      <Router>
        <Routes>

          <Route path="/" element={<Profile/>} exact />
          <Route path="/conges" element={<OrderScreen/>} />
          <Route path="/addemployee" element={<AddEmployee/>} />
          <Route path="/users" element={<UsersScreen/>} />
          <Route path="/login" element={<LoginScreen/>} />
          <Route path="/demandes" element={<Demandes/>} />
          <Route path="/addfeuille" element={<AddFeuilleTemps/>} />
          <Route path="/list-feuilles" element={<ListFeuilleTemps />} />






        </Routes>
      </Router>
    </>
  );
}

export default App;
