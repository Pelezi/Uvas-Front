import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Grupo, deleteGrupo, getGrupos } from "../../../services/grupoService";
import { Column, Table } from "../../../components/common/Table";


const ListarGrupos: React.FC = () => {
    const navigate = useNavigate();
    const [grupos, setGrupos] = useState<Grupo[]>([]);

    const fetchGrupos = async () => {
        try {
            const grupos = await getGrupos();
            setGrupos(grupos);
        } catch (error) {
            console.log('Erro ao buscar grupos', error);
        }
    };

    useEffect(() => {
        fetchGrupos();
    }, []);

    const handleEdit = (grupo: Grupo) => {
        navigate("/grupos/editar", { state: grupo });
    }

    const handleDelete = async (grupo: Grupo) => {
        try {
            await deleteGrupo(grupo.id);
            fetchGrupos();
            alert("Grupo removida com sucesso!");
        } catch (error) {
            console.log("Erro ao remover grupo", error);
            alert("Erro ao remover grupo. Tente novamente.");
        }
    };

    const capitalize = (str: string) => {
        if (typeof str !== 'string') return ''
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const columns: Column<Grupo>[] = [
        { header: "Nome", accessor: (item) => item.nome, type: "grupo", linkAccessor: (item) => item.id},
        { header: "Diretor", accessor: (item) => item.diretorId?.pessoaId?.nome},
        { header: "Tipo", accessor: (item) => item.grupoType },
    ];
    return (
        <Table
            columns={columns}
            data={grupos}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
};

export default ListarGrupos;