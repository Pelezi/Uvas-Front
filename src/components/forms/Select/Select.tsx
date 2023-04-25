import React from "react";

import styles from "./Select.module.css";
import { ErrorMessage, Field } from "formik";

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
    return ( 
        <div className={styles.formGroup}>

            <label htmlFor={name} className={styles.label}>
                {label}:
            </label>

            <Field
                as="select"
                name={name}
                id={name}
                className={`${styles.input} ${touched && errors && styles.error}`}
            >
                <option value="">Selecione uma opção</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Field>

            <ErrorMessage name={name} className={styles.errorMsg} component="div" />

        </div>
    );
};

export default Select;