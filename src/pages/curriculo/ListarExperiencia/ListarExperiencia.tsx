import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Table, Column } from "../../../components/common/Table";

import { Experiencia, deleteExperiencia, getExperiencias } from "../../../services/experienciaService";


const ListarExperiencia: React.FC = () => {

    const navigate = useNavigate();

    const [experiencias, setExperiencias] = useState<Experiencia[]>([]);

    const fetchExperiencias = async () => {
        try {
            const experiencias = await getExperiencias();
            setExperiencias(experiencias);
        } catch (error) {
            console.log('Erro ao buscar experiencias', error);
            
        }
    };

    useEffect(() => {
        fetchExperiencias();
    }, []);
    
    const handleEdit = (experiencia: Experiencia) => {
        navigate("/curriculo/experiencia/atualizar", { state: experiencia });
    }
    
    const handleDelete = async (experiencia: Experiencia) => {
        try {
            await deleteExperiencia(experiencia.id);
            fetchExperiencias();
            alert("Experiência removida com sucesso!");
        } catch (error) {
            console.log("Erro ao remover experiência", error);
            alert("Erro ao remover experiência. Tente novamente.");
            
        }
    };

    const columns: Column<Experiencia>[] = [
        { header: "Título", accessor: "titulo" },
        { header: "Descrição", accessor: "descricao" },
        { header: "Tipo", accessor: "tipo" },
        { header: "Ano Início", accessor: "anoInicio" },
        { header: "Ano Fim", accessor: "anoFim" },
    ];

    return (
        <Table 
            columns={columns}
            data={experiencias}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
        
    )
};

export default ListarExperiencia;