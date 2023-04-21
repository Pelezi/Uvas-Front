import React from "react";

import styles from "./Select.module.css";

interface Options {
    value: string;
    label: string;
}

interface SelectProps {
    label: string;
    name: string;
    options: Options[];
    errors?: string;
    touched?: boolean;
}

const Select: React.FC < SelectProps > = ({ label, name, options, errors, touched }) => {
    const errorstyle = errors && touched ? styles.error : "";

    return ( 
        <div className={styles.formGroup}>
            <label htmlFor={name} className={styles.label}>
                {label}:
            </label>
            <select name={name} id={name} className={`${styles.input} ${errorstyle}`}>
                <option value="">Selecione uma opção</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {errors && touched && <div className={styles.errorMsg}>{errors}</div>}

        </div>
    );
};

export default Select;