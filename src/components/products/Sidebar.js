import React from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div>
            <aside className="navbar-aside" id="offcanvas_aside" style={styles.sidebar}>
                <div style={styles.asideTop}>
                    <Link to="/" className="brand-wrap" style={styles.brand}>
                        <img
                            src="/images/black.png"
                            style={styles.logo}
                            alt="Ecommerce dashboard template"
                        />
                    </Link>
                </div>

                <nav>
                    <ul className="menu-aside" style={styles.menu}>
                        <li className="menu-item" style={styles.menuItem}>
                            <NavLink
                                activeClassName="active"
                                className="menu-link"
                                to="/"
                                exact={true}
                                style={({ isActive }) =>
                                    isActive
                                        ? { ...styles.link, ...styles.activeLink }
                                        : styles.link
                                }
                            >
                                <i className="icon fas fa-home" style={styles.icon}></i>
                                <span style={styles.text}>Profile</span>
                            </NavLink>
                        </li>
                        <li className="menu-item" style={styles.menuItem}>
                            <NavLink
                                activeClassName="active"
                                className="menu-link"
                                to="/addemployee"
                                style={({ isActive }) =>
                                    isActive
                                        ? { ...styles.link, ...styles.activeLink }
                                        : styles.link
                                }
                            >
                                <i className="icon fas fa-calendar-plus" style={styles.icon}></i>
                                <span style={styles.text}>Ajouter Congé</span>
                            </NavLink>
                        </li>
                        <li className="menu-item" style={styles.menuItem}>
                            <NavLink
                                activeClassName="active"
                                className="menu-link"
                                to="/conges"
                                style={({ isActive }) =>
                                    isActive
                                        ? { ...styles.link, ...styles.activeLink }
                                        : styles.link
                                }
                            >
                                <i className="icon fas fa-suitcase-rolling" style={styles.icon}></i>
                                <span style={styles.text}>Congés</span>
                            </NavLink>
                        </li>
                        <li className="menu-item" style={styles.menuItem}>
                            <NavLink
                                activeClassName="active"
                                className="menu-link"
                                to="/list-feuilles"
                                style={({ isActive }) =>
                                    isActive
                                        ? { ...styles.link, ...styles.activeLink }
                                        : styles.link
                                }
                            >
                                <i className="icon fas fa-list" style={styles.icon}></i>
                                <span style={styles.text}>Liste Feuille</span>
                            </NavLink>
                        </li>
                        <li className="menu-item" style={styles.menuItem}>
                            <NavLink
                                activeClassName="active"
                                className="menu-link"
                                to="/addfeuille"
                                style={({ isActive }) =>
                                    isActive
                                        ? { ...styles.link, ...styles.activeLink }
                                        : styles.link
                                }
                            >
                                <i className="icon fas fa-plus" style={styles.icon}></i>
                                <span style={styles.text}>Ajouter Feuille</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
    );
};

// Styles Object
const styles = {
    sidebar: {
        backgroundColor: "#1E3A8A", // Bleu sombre
        height: "100vh",
        width: "250px",
        color: "#fff",
        position: "fixed",
        top: 0,
        left: 0,
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        overflowY: "auto",
    },
    asideTop: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "15px 20px",
    },
    brand: {
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
    },
    logo: {
        height: "50px",
        margin: "auto",
    },
    menu: {
        listStyleType: "none",
        padding: 0,
        margin: 0,
    },
    menuItem: {
        marginBottom: "10px",
    },
    link: {
        display: "flex",
        alignItems: "center",
        padding: "10px 20px",
        textDecoration: "none",
        color: "#B0C4DE",
        transition: "all 0.3s ease",
    },
    activeLink: {
        backgroundColor: "#2563EB", // Couleur active
        color: "#fff",
        fontWeight: "bold",
        borderLeft: "4px solid #93C5FD", // Indicateur actif
    },
    icon: {
        marginRight: "10px",
        fontSize: "16px",
    },
    text: {
        fontSize: "14px",
    },
};

export default Sidebar;
