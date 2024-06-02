import React from "react";

import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";

import Form from "../../../components/forms/Form";
import Input from "../../../components/forms/Input/Input";
import Select from "../../../components/forms/Select/Select";
import Button from "../../../components/common/Button";
import Title from "../../../components/common/Title";

import { Pessoa, createOrUpdatePessoa } from "../../../services/pessoaService";
import { getIn } from "formik";

const ManipularPessoa: React.FC = () => {

    const navigate = useNavigate();
    const pessoa = useLocation().state as Pessoa;

    const initialValues: Pessoa = {
        id: "",
        nome: "",
        cargo: "",
        enderecoId: {
            bairro: "",
            rua: "",
            numero: "",
            addressType: "",
        },
        phones: [
            {
                id: "",
                numero: "",
                phoneType: "",
            }
        ],
        emails: [
            {
                id: "",
                email: "",
                emailType: "",
            }
        ],
        celulaId: {
            id: "",
            nome: "",
            liderId:{
                id: "",
                pessoaId: {
                    id: "",
                    nome: "",
                },
            },
        }
    };

    const validationSchema = Yup.object().shape({
        id: Yup.string(),
        nome: Yup.string().required("Campo obrigatório"),
        cargo: Yup.string().required("Campo obrigatório"),
        enderecoId: Yup.object().shape({
            id: Yup.string(),
            bairro: Yup.string(),
            rua: Yup.string(),
            numero: Yup.string(),
            addressType: Yup.string(),
        }),
        phones: Yup.array().of(
            Yup.object().shape({
                id: Yup.string(),
                numero: Yup.string(),
                phoneType: Yup.string(),
            })
        ),
        emails: Yup.array().of(
            Yup.object().shape({
                id: Yup.string(),
                email: Yup.string(),
                emailType: Yup.string(),
            })
        ),
        celulaId: Yup.object().shape({
            id: Yup.string(),
            nome: Yup.string(),
            liderId: Yup.object().shape({
                id: Yup.string(),
                pessoaId: Yup.object().shape({
                    id: Yup.string(),
                    nome: Yup.string(),
                })
            })
        }),
    });

    const onSubmit = async (values: Pessoa, { resetForm }: { resetForm: () => void }) => {
        try {
            if (values.celulaId?.id === "") {
                delete values.celulaId
            }
            if (values.enderecoId?.id === "") {
                delete values.enderecoId
            }
            if (values.phones?.[0]?.id === "") {
                delete values.phones
            }
            if (values.emails?.[0]?.id === "") {
                delete values.emails
            }
            await createOrUpdatePessoa(values);
            resetForm();
            navigate("/pessoas/listar");
            alert("Formulário enviado com sucesso!");
        } catch (error) {
            console.error("Erro ao enviar formulário", error);
            alert("Erro ao enviar formulário. Tente novamente.");
        }
    }

    return (
        <Form
            initialValues={pessoa || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched }) => (
                <>

                    {
                        !pessoa ?
                            <Title>Cadastrar Pessoa</Title>
                            :
                            <Title>Atualizar Pessoa</Title>
                    }

                    <Input
                        label="Nome"
                        name="nome"
                        errors={errors.nome}
                        touched={touched.nome}
                    />

                    <Select
                        label="Cargo"
                        name="cargo"
                        options={[
                            { value: "visitante", label: "Visitante" },
                            { value: "frequentador_assiduo", label: "Frequentador assíduo" },
                            { value: "membro", label: "Membro" },
                        ]}
                        errors={errors.cargo}
                        touched={touched.cargo}
                    />

                    <Input
                        label="id"
                        name="enderecoId.id"
                        errors={errors.enderecoId}
                        touched={touched.enderecoId}
                        hidden
                    />


                    <Input
                        label="Bairro"
                        name="enderecoId.bairro"
                        // errors={errors.enderecoId}
                        // touched={touched.enderecoId}
                        errors={getIn(errors, "enderecoId.bairro")}
                        touched={getIn(touched, "enderecoId.bairro")}
                    />

                    <Input
                        label="Rua"
                        name="enderecoId.rua"
                        // errors={errors.enderecoId}
                        // touched={touched.enderecoId}
                        errors={getIn(errors, "enderecoId.rua")}
                        touched={getIn(touched, "enderecoId.rua")}
                    />

                    <Input
                        label="Número"
                        name="enderecoId.numero"
                        // errors={errors.enderecoId}
                        // touched={touched.enderecoId}
                        errors={getIn(errors, "enderecoId.numero")}
                        touched={getIn(touched, "enderecoId.numero")}
                    />

                    <Select
                        label="Tipo de endereço"
                        name="enderecoId.addressType"
                        options={[
                            { value: "casa", label: "Residencial" },
                            { value: "trabalho", label: "Comercial" },
                            { value: "outro", label: "Outro" },
                        ]}
                        // errors={errors.enderecoId.addressType} 
                        errors={getIn(errors, "enderecoId.addressType")}
                        // touched={touched.enderecoId}
                        touched={getIn(touched, "enderecoId.addressType")}
                    />

                    <Button type="submit">Salvar</Button>

                </>
            )}
        </Form>
    );
};

export default ManipularPessoa;