import React from "react";

import styles from "./Header.module.css";

const Header: React.FC = () => {
    return(
        <header className={styles.header}>
            <div className={styles.logo}>
                <p>Backoffice - Meu site pessoal</p>
            </div>
        </header>
    );
};

export default Header;