import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import styles from "./ListaPortfolio.module.css";

import { Portfolio, deletePortfolio, getItensPortfolio } from "../../../services/portfolioService";

const ListaPortfolio: React.FC = () => {

    const navigate = useNavigate();

    const [portfolio, setItensPortfolio] = useState<Portfolio[]>([]);

    const fetchItensPortfolio = async () => {
        try {
            const portfolio = await getItensPortfolio();
            setItensPortfolio(portfolio);
        } catch (error) {
            console.log('Erro ao buscar portfolio', error);
        }
    };

    useEffect(() => {
        fetchItensPortfolio();
    }, []);

    const handleEdit = (portfolio: Portfolio) => {
        navigate("/portfolio/cadastro", { state: portfolio });
    };
    
    const handleDelete = async (id: number) => {
        try {
            await deletePortfolio(id);
            fetchItensPortfolio();
            alert("Portfolio removido com sucesso!");
        } catch (error) {
            console.log("Erro ao remover portfolio", error);
            alert("Erro ao remover portfolio. Tente novamente.");            
        }
    };


    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Imagem</th>
                    <th>Link</th>
                    <th>Descrição</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {portfolio.map((itemPortfolio, index) => (
                    <tr key={index}>
                        <td>{itemPortfolio.title}</td>
                        <td><img src={itemPortfolio.image} alt={itemPortfolio.title} className={styles.image} /></td>
                        <td><a href={itemPortfolio.link} target="_blank" rel="noreferrer">{itemPortfolio.link}</a></td>
                        <td>{itemPortfolio.description}</td>
                        <td>
                            <button onClick={() => handleEdit(itemPortfolio)}>Editar</button>
                            <button onClick={() => handleDelete(itemPortfolio.id)}>Excluir</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ListaPortfolio;