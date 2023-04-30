import React from "react";

import styles from "./Header.module.css";

const Header: React.FC = ({ children }) => {
    return(
        <header className={styles.header}>
            <div className={styles.logo}>
                <p>Dashboard site pessoal</p>
            </div>
        </header>
    );
};

export default Header;