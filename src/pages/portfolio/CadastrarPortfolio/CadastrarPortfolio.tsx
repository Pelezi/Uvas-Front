import React from "react";

import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";


import Input from "../../../components/forms/Input/Input";

import { Portfolio, createOrUpdatePortfolio } from "../../../services/portfolioService";
import Form from "../../../components/forms/Form";
import Title from "../../../components/common/Title";
import Button from "../../../components/common/Button";

const ListaPortfolio: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const portfolio = location.state as Portfolio;

    const initialValues: Portfolio = {
        id: 0,
        link: "",
        image: "",
        title: "",
        description: "",
    }
    
    const validationSchema = Yup.object().shape({
        id: Yup.number(),
        link: Yup.string().required("Campo obrigatório"),
        image: Yup.string().required("Campo obrigatório"),
        title: Yup.string().required("Campo obrigatório"),
        description: Yup.string(),
    })

    const onSubmit = async (values: Portfolio, { resetForm }: { resetForm: () => void }) => {
        try {
            await createOrUpdatePortfolio(values);
            console.log(values);
            resetForm();
            navigate("/portfolio/lista");
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

                        <Title>Cadastro de Portfolio</Title>

                        <Input
                            label="Link"
                            name="link"
                            errors={errors.link}
                            touched={touched.link}
                        />

                        <Input
                            label="Imagem"
                            name="image"
                            errors={errors.image}
                            touched={touched.image}
                        />

                        <Input 
                            label="Título"
                            name="title"
                            errors={errors.title}
                            touched={touched.title}
                        />

                        <Input
                            label="Descrição"
                            name="description"
                            errors={errors.description}
                            touched={touched.description}
                        />

                        <Button>Enviar</Button>

                    </>
                )}
            </Form>
    )
}

export default ListaPortfolio;