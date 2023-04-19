import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import styles from "./CadastrarInformacoes.module.css";

interface FormValues {
    foto: string;
    nome: string;
    cargo: string;
    resumo: string;
};

const CadastrarInformacoes: React.FC = () => {

    const initialValues: FormValues = {
        foto: '',
        nome: '',
        cargo: '',
        resumo: ''
    };

    const validationSchema = Yup.object().shape({
        foto: Yup.string().required('Campo obrigatório'),
        nome: Yup.string().required('Campo obrigatório'),
        cargo: Yup.string().required('Campo obrigatório'),
        resumo: Yup.string().required('Campo obrigatório')
    });

    const onSubmit = (values: FormValues, { resetForm }: { resetForm: () => void }) => {
        //Lógica de envio para backend
        console.log(values);
        resetForm();
        alert('Formulário enviado com sucesso!');
    };


    return (
        <div className={styles.formWrapper}>

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ errors, touched }) => (

                    <Form className={styles.form}>

                        <h2 className={styles.title}>Informações pessoais</h2>

                        <fieldset className={styles.formGroup}>
                            <label htmlFor="foto" className={styles.label}>Foto</label>
                            <ErrorMessage name="foto" component="div" className={styles.errorMsg} />
                            <Field
                                type="text"
                                id="foto"
                                name="foto"
                                className={`${styles.input} ${touched.foto && errors.foto && styles.error}`}
                            />
                        </fieldset>

                        <fieldset className={styles.formGroup}>
                            <label htmlFor="nome" className={styles.label}>Nome</label>
                            <ErrorMessage name="nome" component="div" className={styles.errorMsg} />
                            <Field
                                type="text"
                                id="nome"
                                name="nome"
                                className={`${styles.input} ${touched.nome && errors.nome && styles.error}`}
                            />
                        </fieldset>

                        <fieldset className={styles.formGroup}>
                            <label htmlFor="cargo" className={styles.label}>Cargo</label>
                            <ErrorMessage name="cargo" component="div" className={styles.errorMsg} />
                            <Field
                                type="text"
                                id="cargo"
                                name="cargo"
                                className={`${styles.input} ${touched.cargo && errors.cargo && styles.error}`}
                            />
                        </fieldset>

                        <fieldset className={styles.formGroup}>
                            <label htmlFor="resumo" className={styles.label}>Resumo</label>
                            <ErrorMessage name="resumo" component="div" className={styles.errorMsg} />
                            <Field
                                as="textarea"
                                id="resumo"
                                name="resumo"
                                className={`${styles.input} ${touched.resumo && errors.resumo && styles.error}`}
                            />
                        </fieldset>

                        <button type="submit" className={styles.button}>Salvar</button>

                    </Form>

                )}

            </Formik>

        </div>
    );
};

export default CadastrarInformacoes;