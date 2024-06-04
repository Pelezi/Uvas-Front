import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Table, Column } from "../../../../components/common/Table";

import { Lider, deleteLider, getLideres } from "../../../../services/liderService";
import { Celula } from "../../../../services/celulaService";

const ListarLider: React.FC = () => {

    const navigate = useNavigate();

    const [lideres, setLideres] = useState<Lider[]>([]);
    const [celulas, setCelulas] = useState<Celula[]>([]);

    const fetchLideres = async () => {
        try {
            const lideres = await getLideres();
            setLideres(lideres);
        } catch (error) {
            console.log('Erro ao buscar líderes', error);
            
        }
    };

    useEffect(() => {
        fetchLideres();
    }, []);

    const handleEdit = (lider: Lider) => {
        navigate("/lideres/editar", { state: lider });
    }
    
    const handleDelete = async (lider: Lider) => {
        try {
            await deleteLider(lider.id);
            fetchLideres();
            alert("Lider removido com sucesso!");
        } catch (error) {
            console.log("Erro ao remover lider", error);
            alert("Erro ao remover lider. Tente novamente.");
            
        }
    };

    const columns: Column<Lider>[] = [
        { header: "Nome", accessor: (item) => item.pessoaId.nome, linkAccessor: (item) => item.pessoaId.id },
        { header: "Células", accessor: (item) => item.celulas?.map((celula) => celula.nome).join(", ") },
    ];

    return (
        <Table 
            columns={columns}
            data={lideres}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
        />
        
    )
};

export default ListarLider;