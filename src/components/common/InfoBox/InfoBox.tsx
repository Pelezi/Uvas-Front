import React from "react";

import styles from "./InfoBox.module.css";

interface InfoboxProps {
    title: string;
    value: number | string;
    icon?: React.ReactNode;
}

const InfoBox: React.FC<InfoboxProps> = ({ title, value, icon }) => {
    return (
        <div className={styles.infoBox}>
            <h3>{title}</h3>
            <div className={styles.infoBoxContainer}>
                {icon}
                <h1>{value}</h1>
            </div>
        </div>
    );
};

export default InfoBox;