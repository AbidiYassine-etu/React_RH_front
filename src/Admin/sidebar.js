import React from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      <aside
        className="navbar-aside"
        id="offcanvas_aside"
        style={styles.sidebar}
      >
        <div style={styles.asideTop}>
          <Link to="/" className="brand-wrap" style={styles.brand}>
            <img
              src="/images/black.png"
              style={styles.logo}
              className="logo"
              alt="Ecommerce dashboard template"
            />
          </Link>
          <div>
            <button className="btn btn-icon btn-aside-minimize">
              <i className="text-muted fas fa-stream"></i>
            </button>
          </div>
        </div>
        <nav>
          <ul className="menu-aside" style={styles.menu}>
            {menuItems.map((item, index) => (
              <li key={index} className="menu-item" style={styles.menuItem}>
                <NavLink
                  activeClassName="active"
                  className="menu-link"
                  to={item.path}
                  style={({ isActive }) =>
                    isActive ? styles.activeLink : styles.link
                  }
                >
                  <i className={`icon ${item.icon}`} style={styles.icon}></i>
                  <span className="text" style={styles.text}>
                    {item.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

const menuItems = [
  { label: "Dashboard", path: "/admin", icon: "fas fa-home" },
  { label: "Ajouter Employée", path: "/addEmployee", icon: "fas fa-cart-plus" },
  { label: "Ajouter Evaluation", path: "/evaluation", icon: "fas fa-edit" },
  { label: "Validation Congés", path: "/validateConge", icon: "fas fa-calendar-check" },
  { label: "Validation Feuille", path: "/validateFeuille", icon: "fas fa-clipboard-check" },
  { label: "Employées", path: "/employee", icon: "fas fa-user" },
];

const styles = {
  sidebar: {
    backgroundColor: "#1E3A8A", // Dark Blue
    height: "100vh",
    width: "250px",
    color: "#fff",
    position: "fixed",
    top: 0,
    left: 0,
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
    overflowY: "auto",
    overflowX: "hidden", // Prevents horizontal scroll
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
    backgroundColor: "#2563EB", // Active color
    color: "#fff",
    fontWeight: "bold",
    borderLeft: "4px solid #93C5FD", // Active indicator
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
