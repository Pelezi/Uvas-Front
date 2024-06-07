import React from "react";

// import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css";

import Input from "../../components/forms/Input";
import Form from "../../components/forms/Form";
import Button from "../../components/common/Button";
import Title from "../../components/common/Title";

import { User, login as loginService } from "../../services/authService";

import { useAuth } from "../../contexts/AuthContext";

const Login = () => {

    const navigate = useNavigate();

    const onSubmit = async () => {
        navigate('/home');
    };

    return (
        <div className={styles.loginWrapper}>
            <div className={styles.imgBox}>
                <img src="https://raw.githubusercontent.com/Pelezi/React-vite-typescript/Uvas/login.svg" />
            </div>
            <div className={styles.contentBox}>
                <div className={styles.formBox}>
                    <div className={styles.logo}>
                        <img src="https://i.imgur.com/VQDMsMa.png" />
                    </div>
                    <h2>Login</h2>
                    <form>
                        <div className={styles.inputBox}>
                            <span>E-mail</span>
                            <input type="email" placeholder="@mail.com" />
                        </div>

                        <div className={styles.inputBox}>
                            <span>Senha</span>
                            <input type="password" placeholder="senha..." />
                        </div>

                        <div className={styles.remember}>
                            <label>
                                <input type="checkbox" /> Lembre de mim
                            </label>
                            <a href="#">Esqueci a Senha</a>
                        </div>

                        <div className={styles.inputBox}>
                            <input onClick={onSubmit} type="submit" value="Entrar" />
                        </div>

                        <div className={styles.inputBox}>
                            <p>Não Tem Uma Conta? <a href="#">Inscrever-se</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;