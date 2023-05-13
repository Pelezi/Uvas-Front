import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Table, Column } from "../../../components/common/Table";

import { Projeto, deleteProjeto, getPortfolio } from "../../../services/portfolioService";

const ListarPortfolio: React.FC = () => {

    const navigate = useNavigate();

    const [portfolio, setPortfolio] = useState<Projeto[]>([]);

    const fetchPortfolio = async () => {
        try {
            const portfolio = await getPortfolio();
            setPortfolio(portfolio);
        } catch (error) {
            console.log(error);
            alert("Erro ao buscar portfolio.");
        }
    };

    useEffect(() => {
        fetchPortfolio();
    }, []);

    const handleEdit = (itemPortfolio: Projeto) => {
        navigate("/projeto/atualizar", { state: itemPortfolio });
    };

    const handleDelete = async (portfolio: Projeto) => {
        try {
            await deleteProjeto(portfolio.id);
            fetchPortfolio();
            alert("Portfolio removido com sucesso!");
        } catch (error) {
            console.log(error);
            alert("Erro ao remover portfolio.");
        }
    };

    const columns: Column<Projeto>[] = [
        { header: "Título", accessor: "title" },
        { header: "Imagem", accessor: "image" },
        { header: "Link", accessor: "link" },
    ];


    return (
        <Table
            columns={columns}
            data={portfolio}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default ListarPortfolio;