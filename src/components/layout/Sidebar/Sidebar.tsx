import React from "react";

import { NavLink } from "react-router-dom";

import styles from "./Sidebar.module.css";

import { useAuth } from "../../../contexts/AuthContext";

const Sidebar = () => {
    const { logout } = useAuth();
    
    return(
        <div className={styles.sidebar}>
            <nav className={styles.navigation}>

                <ul>
                    <li>
                        <NavLink to="/">
                            <h3>Dashboard</h3>
                        </NavLink>
                    </li>
                </ul>

                <h3>Pessoas</h3>
                <ul>
                    <li>
                        <NavLink to="/pessoas/cadastrar">
                            Cadastrar Pessoa
                        </NavLink>
                    </li>
                    <li>
                    <NavLink to="/pessoas/listar">
                        Listar Pessoas
                    </NavLink>
                    </li>
                </ul>

                <ul>
                    <li>
                        <NavLink onClick={logout} to="/Login">
                            <h3>Logout</h3>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;