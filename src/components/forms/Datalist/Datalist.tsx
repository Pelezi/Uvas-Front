import React, { useState } from "react";

import { Field, ErrorMessage, useFormikContext } from "formik";

import styles from "./Datalist.module.css";

interface Options {
    id: string;
    nome: string;
}

interface DatalistProps {
    label: string;
    name: string;
    type?: string;
    as?: string;
    errors?: string;
    touched?: boolean;
    className?: string;
    children?: React.ReactNode;
    hidden?: boolean;
    options: Options[];
    optionFilter?: string[];
}

const Datalist: React.FC<DatalistProps> = ({ label, name, options, errors, touched, as, hidden, className, optionFilter }) => {
    const { setFieldValue } = useFormikContext();
    const [selectedNome, setSelectedNome] = useState("");

    const handleInputChange = (event: React.FocusEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const selectedOption = options.find(option => option.id === value);

        if (!selectedOption) {
            setFieldValue(name, "");
            setSelectedNome("");
            alert("Opção inválida, por favor selecione uma opção válida");
        } else {
            setSelectedNome(selectedOption.nome);
            setFieldValue(name, selectedOption.id);
        }
    }

    return (
        <fieldset className={`${styles.formGroup} ${hidden && styles.hidden}`}>
            <label htmlFor={name} className={styles.label}>
                {label}:
            </label>
            <Field
                id={name}
                name={name}
                as={as ? as : undefined}
                className={`${className ? className : styles.input} ${touched && errors && styles.error}`}
                list="lista"
                onChange={handleInputChange}
                placeholder="Selecione uma opção"
            >
            </Field>
            <ErrorMessage name={name} component="div" className={styles.errorMsg} />
            <datalist id="lista">
                <option value="">Selecione uma opção</option>
                {options
                .filter((option) => !optionFilter || !optionFilter.includes(option.id))
                .map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.nome}
                    </option>
                ))}
            </datalist>

            <input
                type="text"
                value={selectedNome}
                readOnly
                className={`${className ? className : styles.input} ${touched && errors && styles.error}`}
                placeholder="Nome da opção selecionada"

            />
        </fieldset>
    );
};

export default Datalist;