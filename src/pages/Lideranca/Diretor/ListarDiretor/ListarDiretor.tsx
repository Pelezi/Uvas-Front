import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Table, Column } from "../../../../components/common/Table";

import { Diretor, deleteDiretor, getDiretores } from "../../../../services/diretorService";
import { Grupo } from "../../../../services/grupoService";

const ListarDiretor: React.FC = () => {

    const navigate = useNavigate();

    const [diretores, setDiretores] = useState<Diretor[]>([]);
    const [grupos, setGrupos] = useState<Grupo[]>([]);

    const fetchDiretores = async () => {
        try {
            const diretores = await getDiretores();
            setDiretores(diretores);
        } catch (error) {
            console.log('Erro ao buscar líderes', error);
            
        }
    };

    useEffect(() => {
        fetchDiretores();
    }, []);
    
    const handleDelete = async (diretor: Diretor) => {
        try {
            await deleteDiretor(diretor.id);
            fetchDiretores();
            alert("Diretor removida com sucesso!");
        } catch (error) {
            console.log("Erro ao remover diretor", error);
            alert("Erro ao remover diretor. Tente novamente.");
            
        }
    };

    const columns: Column<Diretor>[] = [
        { header: "Nome", accessor: (item) => item.pessoaId.nome, linkAccessor: (item) => item.pessoaId.id },
        { header: "Grupos", accessor: (item) => item.grupos?.map((grupo) => grupo.nome).join(", ") },
    ];

    return (
        <Table 
            columns={columns}
            data={diretores}
            handleDelete={handleDelete}
        />
        
    )
};

export default ListarDiretor;