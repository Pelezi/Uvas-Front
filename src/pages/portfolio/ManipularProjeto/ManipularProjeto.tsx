import React from "react";

import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";

import Form from "../../../components/forms/Form";
import Input from "../../../components/forms/Input/Input";
import Button from "../../../components/common/Button";
import Title from "../../../components/common/Title";
import Textarea from "../../../components/forms/Textarea";


import { Projeto, createOrUpdateProjeto } from "../../../services/portfolioService";


const ManipularProjeto = () => {
    const navigate = useNavigate();
    const portfolio = useLocation().state as Projeto;

    const initialValues: Projeto = {
        link: "",
        image: "",
        title: "",
        description: ""
    };
    
    const validationSchema = Yup.object().shape({
        link: Yup.string().required("Campo obrigatório"),
        image: Yup.string().required("Campo obrigatório"),
        title: Yup.string().required("Campo obrigatório"),
        description: Yup.string()
    });

    const onSubmit = async (values: Projeto, { resetForm }: { resetForm: () => void }) => {
        try {
            await createOrUpdateProjeto(values);
            console.log(values);
            resetForm();
            navigate("/portfolio/listar");
            alert("Formulário enviado com sucesso!");
        } catch (error) {
            console.log("Erro ao enviar formulário", error);
            alert("Erro ao enviar formulário. Tente novamente.");
        }
    };

    return (
            <Form
                initialValues={portfolio || initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched }) => (
                    <>

                        {
                            !portfolio ?
                                <Title>Cadastrar Projeto</Title>
                                :
                                <Title>Atualizar Projeto</Title>
                        }

                        <Input
                            label="Título"
                            name="title"
                            errors={errors.title}
                            touched={touched.title}
                        />

                        <Input
                            label="Imagem" 
                            name="image"
                            errors={errors.image}
                            touched={touched.image}
                        />

                        <Input
                            label="Link"
                            name="link"
                            errors={errors.link}
                            touched={touched.link}
                        />

                        <Textarea
                            label="Descrição"
                            name="description"
                            errors={errors.description}
                            touched={touched.description}
                        />

                        <Button type="submit">Salvar</Button>

                    </>
                )}
            </Form>
    );
};

export default ManipularProjeto;