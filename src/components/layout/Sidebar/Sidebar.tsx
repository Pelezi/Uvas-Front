import React from "react";

import { NavLink } from "react-router-dom";

import styles from "./Sidebar.module.css";

import { useAuth } from "../../../contexts/AuthContext";

interface SidebarProps {
    show?: boolean;
    toggleSidebar?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({show, toggleSidebar}) => {
    
    const { logout } = useAuth();

    return (
        <div className={`${styles.sidebar} ${show && styles.show}`}>
                <nav className={styles.navigation}>

                    <ul>
                        <li>
                            <NavLink to="/" onClick={toggleSidebar}>
                                <h3>Dashboard</h3>
                            </NavLink>
                        </li>
                    </ul>

                    <h3>Pessoas</h3>
                    <ul>
                        <li>
                            <NavLink to="/pessoas/cadastrar" onClick={toggleSidebar}>
                                Cadastrar Pessoa
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/pessoas/listar" onClick={toggleSidebar}>
                                Listar Pessoas
                            </NavLink>
                        </li>
                    </ul>

                    <h3>Liderança</h3>
                    <ul>
                        <li>
                            <NavLink to="/lideres/cadastrar" onClick={toggleSidebar}>
                                Cadastrar Líder
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/lideres/listar" onClick={toggleSidebar}>
                                Listar Líderes
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