import React from "react";

import { NavLink } from "react-router-dom";

import styles from "./Sidebar.module.css";

const Sidebar: React.FC = ({ children }) => {
    return(
        <div className={styles.sidebar}>
            <nav className={styles.navigation}>
                <ul>
                    <li>
                        <NavLink to="/">
                            <h3>Home</h3>
                        </NavLink>
                    </li>
                </ul>
                <h3>Currículo</h3>
                <ul>
                    <li>
                        <NavLink to="/curriculo/cadastro/resumo">
                            Cadastrar Resumo
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/curriculo/cadastro/experiencia-academica">
                            Cadastrar Experiência Acadêmica
                        </NavLink>
                    </li>
                    <li>
                    <NavLink to="/curriculo/cadastro/experiencia-profissional">
                        Cadastrar Experiência Profissional
                    </NavLink>
                    </li>
                </ul>
                <h3>Portfólio</h3>
                <ul>
                    <li>
                        <NavLink to="/portfolio/cadastro">
                            Cadastrar Portfólio
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/portfolio/listagem">
                            Listagem de Portfolios
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;