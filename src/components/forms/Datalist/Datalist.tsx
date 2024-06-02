import React, { useEffect, useRef, useState } from "react";

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
    filterType: "exclude" | "include";
    initialName?: string;
}

const Datalist: React.FC<DatalistProps> = ({ label, name, options, errors, touched, as, hidden, className, optionFilter, filterType, initialName }) => {
    const { setFieldValue } = useFormikContext();
    const [selectedNome, setSelectedNome] = useState("");

    useEffect(() => {
        
    }, [])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFieldValue(name, value);

        const selectedOption = options.find(option => option.id === value);
        if (selectedOption) {
            setSelectedNome(selectedOption.nome);
        }
    }

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
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
                list={label}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Selecione uma opção"
            >
            </Field>
            <ErrorMessage name={name} component="div" className={styles.errorMsg} />
            <datalist id={label}>
                <option value="">Selecione uma opção</option>
                {options
                    .filter((option) => {
                        if (filterType === "include") {
                            return optionFilter && optionFilter.includes(option.id);
                        } else if (filterType === "exclude") {
                            return !optionFilter || !optionFilter.includes(option.id)
                        }
                    })
                    .map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.nome}
                        </option>
                    ))}
            </datalist>

            <input
                type="text"
                value={selectedNome || initialName}
                readOnly
                className={`${className ? className : styles.input} ${touched && errors && styles.error}`}
                placeholder="Nome da opção selecionada"
            />
        </fieldset>
    );
};

export default Datalist;