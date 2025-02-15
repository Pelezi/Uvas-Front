import React from "react";

import { Field, ErrorMessage } from "formik";

import styles from "./Input.module.css";

export interface InputProps {
    label: string;
    name: string;
    type?: string;
    as?: string;
    errors?: string;
    touched?: boolean;
    className?: string;
    children?: React.ReactNode;
    hidden?: boolean;
    hiddenLabel?: boolean;
    readonly?: boolean;
    placeholder?: string;
};

const Input: React.FC<InputProps> = ({ label, name, type = "text", as, errors, touched, children, className, hidden, readonly, hiddenLabel, placeholder }) => {
    return (
        <fieldset className={`${styles.formGroup} ${hidden && styles.hidden}`}>
            <label htmlFor={name} className={`${styles.label} ${hiddenLabel && styles.hidden}`}>
                {label}:
            </label>
            <Field
                name={name}
                type={type}
                as={as ? as : undefined}
                readOnly={readonly}
                className={`${className ? className : styles.input} ${touched && errors && styles.error}`}
                placeholder={placeholder}
            >
                {children}
            </Field>
            <ErrorMessage name={name} component="div" className={styles.errorMsg} />
        </fieldset>
    );
};

export default Input;