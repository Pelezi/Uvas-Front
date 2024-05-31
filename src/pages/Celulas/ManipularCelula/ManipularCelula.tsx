import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";

import Form from "../../../components/forms/Form";
import Input from "../../../components/forms/Input/Input";
import Select from "../../../components/forms/Select/Select";
import Button from "../../../components/common/Button";
import Title from "../../../components/common/Title";
import { Celula, createOrUpdateCelula } from "../../../services/celulaService";
import { getIn } from "formik";
import Datalist from "../../../components/forms/Datalist";
import { Lider, getLideres } from "../../../services/liderService";
import { Discipulador, getDiscipuladores } from "../../../services/discipuladorService";
import { Pessoa, getPessoas } from "../../../services/pessoaService";

const ManipularCelula: React.FC = () => {
    
    const navigate = useNavigate();
    const celula = useLocation().state as Celula;

    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [lideres, setLideres] = useState<Lider[]>([]);
    const [lideresIds, setLideresIds] = useState<string[]>([]);
    const [discipuladores, setDiscipuladores] = useState<Discipulador[]>([]);
    const [discipuladoresIds, setDiscipuladoresIds] = useState<string[]>([]);
    
    const fetchLideres = async () => {
        try {
            const lideres = await getLideres();
            setLideres(lideres);
            if (lideres.length > 0) {
                const lideresIdsList = lideres.map((lider) => lider.pessoaId.id).filter((id) => id !== undefined) as string[];
                setLideresIds(lideresIdsList);
            }
        } catch (error) {
            console.error("Erro ao buscar líderes", error);
        }
    }

    const fetchDiscipuladores = async () => {
        try {
            const discipuladores = await getDiscipuladores();
            setDiscipuladores(discipuladores);
            if (discipuladores.length > 0) {
                const discipuladoresIdsList = discipuladores.map((discipulador) => discipulador.pessoaId.id).filter((id) => id !== undefined) as string[];
                setDiscipuladoresIds(discipuladoresIdsList);
                console.log(discipuladoresIdsList);
            }
        } catch (error) {
            console.error("Erro ao buscar discipuladores", error);
        }
    }

    const fetchPessoas = async () => {
        try {
            const pessoas = await getPessoas();
            setPessoas(pessoas);
        } catch (error) {
            console.error("Erro ao buscar pessoas", error);
        }
    
    }

    useEffect(() => {
        fetchLideres();
        fetchDiscipuladores();
        fetchPessoas();
    }, []);
    

    const initialValues: Celula = {
        id: "",
        nome: "",
        diaDaSemana: "",
        horario: "",
        enderecoId: {
            id: "",
            bairro: "",
            rua: "",
            numero: "",
            addressType: "",
        },
        liderId: {
            id: "",
            pessoaId: {
                id: "",
                nome: "",
            },
        },
        discipuladorId: {
            id: "",
            pessoaId: {
                id: "",
                nome: "",
            },
        },
        pessoas: [],
    };

    const validationSchema = Yup.object().shape({
        id: Yup.string(),
        nome: Yup.string().required("Campo obrigatório"),
        diaDaSemana: Yup.string(),
        horario: Yup.string(),
        enderecoId: Yup.object().shape({
            id: Yup.string(),
            bairro: Yup.string(),
            rua: Yup.string(),
            numero: Yup.string(),
            addressType: Yup.string(),
        }),
        liderId: Yup.object().shape({
            id: Yup.string(),
            pessoaId: Yup.object().shape({
                id: Yup.string(),
                nome: Yup.string(),
            }),
        }),
        discipuladorId: Yup.object().shape({
            id: Yup.string(),
            pessoaId: Yup.object().shape({
                id: Yup.string(),
                nome: Yup.string(),
            }),
        }),
        pessoas: Yup.array(),

    });

    const onSubmit = async (values: Celula, { resetForm}: { resetForm: () => void }) => {
        try {
            await createOrUpdateCelula(values);
            resetForm();
            navigate("/celulas/listar");
            alert("Célula salva com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar célula", error);
            alert("Erro ao salvar célula. Tente novamente.");
        }
    }

    return (
        <Form
            initialValues={celula || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched }) => (
                <>
                    {
                        celula ? <Title>Atualizar Célula</Title> : <Title>Cadastrar Célula</Title>
                    }

                    <Input
                        label="Nome"
                        name="nome"
                        errors={errors.nome}
                        touched={touched.nome}
                    />

                    <Select
                        label="Dia da semana"
                        name="diaDaSemana"
                        options={[
                            { value: "domingo", label: "Domingo" },
                            { value: "segunda", label: "Segunda" },
                            { value: "terça", label: "Terça" },
                            { value: "quarta", label: "Quarta" },
                            { value: "quinta", label: "Quinta" },
                            { value: "sexta", label: "Sexta" },
                            { value: "sabado", label: "Sábado" },
                        ]}
                        errors={errors.diaDaSemana}
                        touched={touched.diaDaSemana}
                    />

                    <Input
                        label="Horário"
                        name="horario"
                        errors={errors.horario}
                        touched={touched.horario}
                    />

                    <Input
                        label="Bairro"
                        name="enderecoId.bairro"
                        errors={getIn(errors, "enderecoId.bairro")}
                        touched={getIn(touched, "enderecoId.bairro")}
                    />

                    <Input
                        label="Rua"
                        name="enderecoId.rua"
                        errors={getIn(errors, "enderecoId.rua")}
                        touched={getIn(touched, "enderecoId.rua")}
                    />

                    <Input
                        label="Número"
                        name="enderecoId.numero"
                        errors={getIn(errors, "enderecoId.numero")}
                        touched={getIn(touched, "enderecoId.numero")}
                    />

                    <Select
                        label="Tipo de endereço"
                        name="enderecoId.addressType"
                        options={[
                            { value: "casa", label: "Casa" },
                            { value: "apartamento", label: "Apartamento" },
                            { value: "outro", label: "Outro" },
                        ]}
                        errors={getIn(errors, "enderecoId.addressType")}
                        touched={getIn(touched, "enderecoId.addressType")}
                    />

                    <Datalist 
                        label="Líder"
                        name="liderId.pessoaId.id"
                        options={pessoas}
                        optionFilter={lideresIds}
                        filterType="include"
                        errors={getIn(errors, "liderId.pessoaId.id")}
                        touched={getIn(touched, "liderId.pessoaId.id")}
                    />

                    <Datalist 
                        label="Discipulador"
                        name="discipuladorId.pessoaId.id"
                        options={pessoas}
                        optionFilter={discipuladoresIds}
                        filterType="include"
                        errors={getIn(errors, "discipuladorId.pessoaId.id")}
                        touched={getIn(touched, "discipuladorId.pessoaId.id")}
                    />

                    <Button type="submit">Salvar</Button>
                </>
            )}
        </Form>
    );
};

export default ManipularCelula;