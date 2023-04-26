import React from "react";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import styles from "./Login.module.css";

import Input from "../../components/forms/Input";
import { useNavigate } from "react-router-dom";

interface LoginValues {
    email: string;
    password: string;
}

const initialValues: LoginValues = {
    email: "",
    password: "",
};

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("E-mail inválido")
        .required("E-mail é obrigatório"),
    password: Yup.string()
        .min(6, "A senha deve ter no mínimo 6 caracteres")
        .required("Senha é obrigatória"),
});

const Login = () => {

    const navigate = useNavigate();

    const onSubmit = async (values: LoginValues) => {
        try {
            navigate('/');
            console.log(values);
        } catch (error) {
            console.log(error);            
        }
    };

    return (
        <div className={styles.loginWrapper}>
            <div className={styles.formWrapper}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className={styles.form}>
                            <h1 className={styles.title}>Meu site pessoal</h1>

                            <Input
                                label="E-mail"
                                name="email"
                                type="email"
                                errors={errors.email}
                                touched={touched.email}
                            />

                            <Input
                                label="Password"
                                name="password"
                                type="password"
                                errors={errors.password}
                                touched={touched.password}
                            />

                            <button type="submit" className={styles.button}>
                                Login
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;