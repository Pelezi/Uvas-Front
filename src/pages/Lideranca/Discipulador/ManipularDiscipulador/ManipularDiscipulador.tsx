import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Form from "../../../../components/forms/Form";
import Button from "../../../../components/common/Button";
import Title from "../../../../components/common/Title";
import Datalist from "../../../../components/forms/Datalist/Datalist";

import { Discipulador , createOrUpdateDiscipulador, getDiscipuladores } from "../../../../services/discipuladorService";

import MultipleDatalist from "../../../../components/forms/Checkbox";
import { Pessoa, getPessoas } from "../../../../services/pessoaService";
import { Celula, getCelulas } from "../../../../services/celulaService";
import { getIn } from "formik";

const ManipularDiscipulador: React.FC = () => {

    const navigate = useNavigate();

    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [celulas, setCelulas] = useState<Celula[]>([]);
    const [discipuladores, setDiscipuladores] = useState<Discipulador[]>([]);
    const [discipuladoresIds, setDiscipuladoresIds] = useState<string[]>([]);

    const fetchPessoas = async () => {
        try {
            const pessoas = await getPessoas();
            setPessoas(pessoas);
        } catch (error) {
            console.error("Erro ao buscar pessoas", error);
            
        }
    };

    const fetchCelulas = async () => {
        try {
            const celulas = await getCelulas();
            setCelulas(celulas);
        } catch (error) {
            console.error("Erro ao buscar celulas", error);
            
        }
    };

    const fetchDiscipuladores = async () => {
        try {
            const discipuladores = await getDiscipuladores();
            setDiscipuladores(discipuladores);
            if (discipuladores.length > 0) {
                const discipuladoresIdsList = discipuladores.map((discipulador) => discipulador.pessoaId.id).filter((id) => id !== undefined) as string[];
                setDiscipuladoresIds(discipuladoresIdsList);
            }
        } catch (error) {
            console.error("Erro ao buscar discipuladores", error);
            
        }
    
    };




    useEffect(() => {
            fetchPessoas();
            fetchCelulas();
            fetchDiscipuladores();
    }, []);

    const initialValues: Discipulador = {
        id: "",
        pessoaId: {
            id: "",
        },
        celulas: []
    };

    const validationSchema = Yup.object().shape({
        id: Yup.string(),
        pessoaId: Yup.object().shape({
            id: Yup.string().required("Campo obrigatório")
        }),
        celulas: Yup.array().of(Yup.object().shape({
            id: Yup.string(),
            nome: Yup.string()
        }))
    });

    const onSubmit = async (values: Discipulador, { resetForm }: { resetForm: () => void }) => {
        try {
            values.celulas = selectedCelulas.map((celulaId) => ({ id: celulaId }));
            await createOrUpdateDiscipulador(values);
            resetForm();
            navigate("/discipuladores/listar");
            alert("Líder salvo com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar líder", error);
            alert("Erro ao salvar líder. Tente novamente.");
        }
    };

    const [selectedCelulas, setSelectedCelulas] = useState<string[]>([]);

    return (
        <Form
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched }) => (
                <>
                    <Title>Adicionar Líder</Title>

                    <Datalist 
                        label="Id do membro"
                        name="pessoaId.id"
                        options={pessoas}
                        errors={getIn(errors, "pessoaId.id")}
                        touched={getIn(touched, "pessoaId.id")}
                        optionFilter={discipuladoresIds}
                    />

                    <MultipleDatalist
                        label="Celulas"
                        name="celulas.id"
                        options={celulas}
                        errors={getIn(errors, "celulas.id")}
                        touched={getIn(touched, "celulas.id")}
                        selectedGrupos={selectedCelulas}
                        setSelectedGrupos={setSelectedCelulas}
                    />

                    <Button type="submit">Salvar</Button>
                </>
            )}
        </Form>
    );
};

export default ManipularDiscipulador;
