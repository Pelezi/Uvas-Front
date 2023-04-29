import React from "react";

// import { Formik, Form } from "formik";
import * as Yup from "yup";

import styles from "./Login.module.css";

import Input from "../../components/forms/Input";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../../services/authService";
import { useAuth } from "../../contexts/AuthContext";

import Form from "../../components/forms/Form";
import Button from "../../components/common/Button";
import Title from "../../components/common/Title";

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
    const { login } = useAuth();

    const onSubmit = async (values: LoginValues) => {
        try {
            const user = await loginService(values.email, values.password);
            login(user);
            navigate('/');
            console.log(values);
        } catch (error) {
            console.log(error);
            alert('Erro ao realizar login');
        }
    };

    return (
        <div className={styles.loginWrapper}>
            <Form
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched }) => (
                    <>
                        <Title>Meu site pessoal</Title>

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

                        <Button type="submit" >Login</Button>
                    </>
                )}
            </Form>
        </div>
    );
};

export default Login;