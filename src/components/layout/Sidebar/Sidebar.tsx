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
                            <NavLink to="/home" onClick={toggleSidebar}>
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

                    <h3>Células</h3>
                    <ul>
                        <li>
                            <NavLink to="/celulas/cadastrar" onClick={toggleSidebar}>
                                Cadastrar Célula
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/celulas/listar" onClick={toggleSidebar}>
                                Listar Células
                            </NavLink>
                        </li>
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
                        <li>
                            <NavLink to="/discipuladores/cadastrar" onClick={toggleSidebar}>
                                Cadastrar Discipulador
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/discipuladores/listar" onClick={toggleSidebar}>
                                Listar Discipuladores
                            </NavLink>
                        </li>
                    </ul>
                    <h3>Grupos</h3>
                    <ul>
                        <li>
                            <NavLink to="/grupos/cadastrar" onClick={toggleSidebar}>
                                Cadastrar Grupo
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/grupos/listar" onClick={toggleSidebar}>
                                Listar Grupos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/diretores/cadastrar" onClick={toggleSidebar}>
                                Cadastrar Diretor
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/diretores/listar" onClick={toggleSidebar}>
                                Listar Diretores
                            </NavLink>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <NavLink onClick={logout} to="/">
                                <h3>Logout</h3>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
    );
};

export default Sidebar;