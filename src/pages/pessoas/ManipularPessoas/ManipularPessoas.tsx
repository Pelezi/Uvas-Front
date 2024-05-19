import React from "react";

import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";

import Form from "../../../components/forms/Form";
import Input from "../../../components/forms/Input/Input";
import Select from "../../../components/forms/Select/Select";
import Button from "../../../components/common/Button";
import Textarea from "../../../components/forms/Textarea/Textarea";
import Title from "../../../components/common/Title";

import { Pessoa, createOrUpdatePessoa } from "../../../services/pessoaService";

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
            addressType: "outro",
        },
        phones: [
            {
                id: "",
                numero: "",
                phoneType: "outro",
            }
        ],
        emails: [
            {
                id: "",
                email: "",
                emailType: "outro",
            }
        ]
    };

    const validationSchema = Yup.object().shape({
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
    });

    const onSubmit = async (values: Pessoa, { resetForm }: { resetForm: () => void }) => {
        try {
            await createOrUpdatePessoa(values);
            console.log(values);
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
                        errors={errors.enderecoId}
                        touched={touched.enderecoId}
                    />

                    <Input
                        label="Rua"
                        name="enderecoId.rua"
                        errors={errors.enderecoId}
                        touched={touched.enderecoId}
                    />

                    <Input
                        label="Número"
                        name="enderecoId.numero"
                        errors={errors.enderecoId}
                        touched={touched.enderecoId}
                    />

                    <Select
                        label="Tipo de endereço"
                        name="enderecoId.addressType"
                        options={[
                            { value: "casa", label: "Residencial" },
                            { value: "trabalho", label: "Comercial" },
                            { value: "outro", label: "Outro" },
                        ]}
                        errors={errors.enderecoId}
                        touched={touched.enderecoId}
                    />

                    <Button type="submit">Salvar</Button>

                </>
            )}
        </Form>
    );
};

export default ManipularPessoa;