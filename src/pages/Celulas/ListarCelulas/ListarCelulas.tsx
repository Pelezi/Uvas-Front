import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Celula, deleteCelula, getCelulas } from "../../../services/celulaService";
import { Column, Table } from "../../../components/common/Table";


const ListarCelulas: React.FC = () => {
    const navigate = useNavigate();
    const [celulas, setCelulas] = useState<Celula[]>([]);

    const fetchCelulas = async () => {
        try {
            const celulas = await getCelulas();
            setCelulas(celulas);
        } catch (error) {
            console.log('Erro ao buscar celulas', error);
        }
    };

    useEffect(() => {
        fetchCelulas();
    }, []);

    const handleEdit = (celula: Celula) => {
        navigate("/celulas/editar", { state: celula });
    }

    const handleDelete = async (celula: Celula) => {
        try {
            await deleteCelula(celula.id);
            fetchCelulas();
            alert("Celula removida com sucesso!");
        } catch (error) {
            console.log("Erro ao remover celula", error);
            alert("Erro ao remover celula. Tente novamente.");
        }
    };

    const capitalize = (str: string) => {
        if (typeof str !== 'string') return ''
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const columns: Column<Celula>[] = [
        { header: "Nome", accessor: (item) => item.nome, type: "celula/", linkAccessor: (item) => item.id},
        { header: "Discipulador", accessor: (item) => item.discipuladorId?.pessoaId?.nome},
        { header: "Lider", accessor: (item) => item.liderId?.pessoaId?.nome},
        { header: "Dia", accessor: (item) => item.diaDaSemana },
        { header: "Horário", accessor: (item) => item.horario },
        { header: "Bairro", accessor: (item) => item.enderecoId?.bairro },
    ];
    return (
        <Table
            columns={columns}
            data={celulas}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
};

export default ListarCelulas;