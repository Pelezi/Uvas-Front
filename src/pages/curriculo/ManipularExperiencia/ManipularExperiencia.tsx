import React from "react";

import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";

import Form from "../../../components/forms/Form";
import Input from "../../../components/forms/Input/Input";
import Select from "../../../components/forms/Select/Select";
import Button from "../../../components/common/Button";
import Textarea from "../../../components/forms/Textarea/Textarea";
import Title from "../../../components/common/Title";

import { Experiencia, createOrUpdateExperiencia } from "../../../services/experienciaService";

const ManipularExperiencia: React.FC = () => {

    const navigate = useNavigate();
    const experiencia = useLocation().state as Experiencia;

    const initialValues: Experiencia = {
        titulo: "",
        descricao: "",
        tipo: "",
        anoInicio: "",
        anoFim: "",
    };

    const validationSchema = Yup.object().shape({
        titulo: Yup.string().required("Campo obrigatório"),
        descricao: Yup.string(),
        tipo: Yup.string().required("Campo obrigatório"),
        anoInicio: Yup.number().required("Campo obrigatório").typeError("Um número é obrigatório"),
        anoFim: Yup.number().required("Campo obrigatório").typeError("Um número é obrigatório"),
    });

    const onSubmit = async (values: Experiencia, { resetForm }: { resetForm: () => void }) => {
        try {
            await createOrUpdateExperiencia(values);
            console.log(values);
            resetForm();
            navigate("/curriculo/experiencia/listar");
            alert("Formulário enviado com sucesso!");
        } catch (error) {
            console.error("Erro ao enviar formulário", error);
            alert("Erro ao enviar formulário. Tente novamente.");
        }
    }

    return (
        <Form
            initialValues={experiencia || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched }) => (
                <>

                    {
                        !experiencia ?
                            <Title>Cadastrar Experiência</Title>
                            :
                            <Title>Atualizar Experiência</Title>
                    }

                    <Input
                        label="Título"
                        name="titulo"
                        errors={errors.titulo}
                        touched={touched.titulo}
                    />

                    <Input
                        label="Ano Início"
                        name="anoInicio"
                        errors={errors.anoInicio}
                        touched={touched.anoInicio}
                    />

                    <Input
                        label="Ano Fim"
                        name="anoFim"
                        errors={errors.anoFim}
                        touched={touched.anoFim}
                    />

                    <Select
                        label="Tipo de experiência"
                        name="tipo"
                        options={[
                            { value: "profissional", label: "Profissional" },
                            { value: "academico", label: "Acadêmico" },
                        ]}
                        errors={errors.tipo}
                        touched={touched.tipo}
                    />

                    <Textarea
                        label="Descrição"
                        name="descricao"
                        errors={errors.descricao}
                        touched={touched.descricao}
                    />

                    <Button type="submit">Salvar</Button>

                </>
            )}
        </Form>
    );
};

export default ManipularExperiencia;