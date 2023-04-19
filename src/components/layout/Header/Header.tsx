import React from "react";

import styles from "./Header.module.css";

const Header: React.FC = ({ children }) => {
    return(
        <header className={styles.header}>
            <div className={styles.logo}>
                <h1>Dashboard site essoal</h1>
            </div>
        </header>
    );
};

export default Header;