import React from "react";

import styles from "./Header.module.css";

const Header: React.FC = () => {
    return(
        <header className={styles.header}>
            <div className={styles.logo}>
                <p>Uvas - Gerenciamento de membros</p>
            </div>
        </header>
    );
};

export default Header;