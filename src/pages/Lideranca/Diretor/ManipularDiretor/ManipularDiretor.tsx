import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Form from "../../../../components/forms/Form";
import Button from "../../../../components/common/Button";
import Title from "../../../../components/common/Title";
import Datalist from "../../../../components/forms/Datalist/Datalist";

import { Diretor , createOrUpdateDiretor, getDiretores } from "../../../../services/diretorService";

import MultipleDatalist from "../../../../components/forms/Checkbox";
import { Pessoa, getPessoas } from "../../../../services/pessoaService";
import { Grupo, getGrupos } from "../../../../services/grupoService";
import { getIn } from "formik";

const ManipularDiretor: React.FC = () => {

    const navigate = useNavigate();

    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [grupos, setGrupos] = useState<Grupo[]>([]);
    const [diretores, setDiretores] = useState<Diretor[]>([]);
    const [diretoresIds, setDiretoresIds] = useState<string[]>([]);

    const fetchPessoas = async () => {
        try {
            const pessoas = await getPessoas();
            setPessoas(pessoas);
        } catch (error) {
            console.error("Erro ao buscar pessoas", error);
            
        }
    };

    const fetchGrupos = async () => {
        try {
            const grupos = await getGrupos();
            setGrupos(grupos);
        } catch (error) {
            console.error("Erro ao buscar grupos", error);
            
        }
    };

    const fetchDiretores = async () => {
        try {
            const diretores = await getDiretores();
            setDiretores(diretores);
            if (diretores.length > 0) {
                const diretoresIdsList = diretores.map((diretor) => diretor.pessoaId.id).filter((id) => id !== undefined) as string[];
                setDiretoresIds(diretoresIdsList);
            }
        } catch (error) {
            console.error("Erro ao buscar diretores", error);
            
        }
    
    };




    useEffect(() => {
            fetchPessoas();
            fetchGrupos();
            fetchDiretores();
    }, []);

    const initialValues: Diretor = {
        id: "",
        pessoaId: {
            id: "",
        },
        grupos: []
    };

    const validationSchema = Yup.object().shape({
        id: Yup.string(),
        pessoaId: Yup.object().shape({
            id: Yup.string().required("Campo obrigatório")
        }),
        grupos: Yup.array().of(Yup.object().shape({
            id: Yup.string(),
            nome: Yup.string()
        }))
    });

    const onSubmit = async (values: Diretor, { resetForm }: { resetForm: () => void }) => {
        try {
            values.grupos = selectedGrupos.map((grupoId) => ({ id: grupoId }));
            await createOrUpdateDiretor(values);
            resetForm();
            navigate("/diretores/listar");
            alert("Líder salvo com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar líder", error);
            alert("Erro ao salvar líder. Tente novamente.");
        }
    };

    const [selectedGrupos, setSelectedGrupos] = useState<string[]>([]);

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
                        name="pessoaId"
                        options={pessoas}
                        errors={getIn(errors, "pessoaId.id")}
                        touched={getIn(touched, "pessoaId.id")}
                        optionFilter={diretoresIds}
                    />

                    <MultipleDatalist
                        label="Grupos"
                        name="grupos.id"
                        options={grupos}
                        errors={getIn(errors, "grupos.id")}
                        touched={getIn(touched, "grupos.id")}
                        selectedGrupos={selectedGrupos}
                        setSelectedGrupos={setSelectedGrupos}
                    />

                    <Button type="submit">Salvar</Button>
                </>
            )}
        </Form>
    );
};

export default ManipularDiretor;
