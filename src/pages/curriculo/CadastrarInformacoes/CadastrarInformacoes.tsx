import React, { useEffect, useState } from "react";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import styles from "./CadastrarInformacoes.module.css";
import Input from "../../../components/forms/Input/Input";
import Textarea from "../../../components/forms/Textarea/Textarea";
import { Informacoes, updateInfomacoes, getInformacoes } from "../../../services/informacoesService";
import InformacoesCard from "./InformacoesCard/InformacoesCard";

const CadastrarInformacoes: React.FC = () => {

    const [informacoes, setInformacoes] = useState<Informacoes>({} as Informacoes);

    const initialValues: Informacoes = {
        id: 1,
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

    const fetchInformacao = async () => {
        try {
            const informacao = await getInformacoes();
            setInformacoes(informacao);
        } catch (error) {
            console.error('Erro ao buscar informações', error);
        }
    };

    useEffect(() => {
        fetchInformacao();
    }, []);

    const onSubmit = async (values: Informacoes, { resetForm }: { resetForm: () => void }) => {
        try {
            await updateInfomacoes(values);
            setInformacoes(values);
            console.log(values);
            resetForm();
            alert('Formulário enviado com sucesso!');

        } catch (error) {

            console.error('Erro ao enviar formulário', error);
            alert('Erro ao enviar formulário. Tente novamente.')

        }
    };

    const handleDelete = async () => {
        try {
            await updateInfomacoes(initialValues);
            setInformacoes(initialValues);
            alert('Formulário deletado com sucesso!');
        } catch (error) {
            console.error('Erro ao deletar formulário', error);
            alert('Erro ao deletar formulário. Tente novamente.')
        }
    };


    return (
        <div className={styles.formWrapper}>

            <Formik 
            initialValues={informacoes} 
            enableReinitialize={true}
            validationSchema={validationSchema} 
            onSubmit={onSubmit}>
                {({ errors, touched }) => (

                    <Form className={styles.form}>

                        <h2 className={styles.title}>Cadastrar Informações</h2>

                        <Input
                            label="Foto"
                            name="foto"
                            errors={errors.foto}
                            touched={touched.foto}
                        />

                        <Input
                            label="Nome"
                            name="nome"
                            errors={errors.nome}
                            touched={touched.nome}
                        />

                        <Input
                            label="Cargo"
                            name="cargo"
                            errors={errors.cargo}
                            touched={touched.cargo}
                        />

                        <Textarea
                            label="Resumo"
                            name="resumo"
                            errors={errors.resumo}
                            touched={touched.resumo}
                        />

                        <button type="submit" className={styles.button}>Salvar</button>

                    </Form>

                )}

            </Formik>

            {informacoes &&
                Object.entries(informacoes).some(
                    ([Key, value]) => Key !== "id" && value.trim() !== ""
                ) && (
                    <div className={styles.cardContainer}>
                        <InformacoesCard informacoes={informacoes} />
                        <button type="button" onClick={handleDelete} className={`${styles.button} ${styles.deleteButton}`}>
                            Deletar
                        </button>
                    </div>
                )
            }

        </div>
    );
};

export default CadastrarInformacoes;