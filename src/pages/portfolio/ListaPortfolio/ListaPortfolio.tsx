import React, { useState } from "react";

import styles from "./ListaPortfolio.module.css";

interface Portfolio {
    link: string;
    image: string;
    title: string;
};

const ListaPortfolio: React.FC = () => {

    const [portfolio, setPortfolio] = useState<Portfolio[]>([
        {
            link: "https://academy.comeialabs.com.br/",
            image: "https://picsum.photos/300/200?random=1",
            title: "Portfólio 1"
        },
        {
            link: "https://academy.comeialabs.com.br/",
            image: "https://picsum.photos/300/200?random=2",
            title: "Portfólio 2"
        },
        {
            link: "https://academy.comeialabs.com.br/",
            image: "https://picsum.photos/300/200?random=3",
            title: "Portfólio 3"
        }
    ]);

    const handleEdit = (index: number) => {
        // lógica para lidar com a edição do item do indice "index"
    };
    
    const handleDelete = (index: number) => {
        // lógica para lidar com a exclusão do item do indice "index"
    };


    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Imagem</th>
                    <th>Link</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {portfolio.map((itemPortfolio, index) => (
                    <tr key={index}>
                        <td>{itemPortfolio.title}</td>
                        <td><img src={itemPortfolio.image} alt={itemPortfolio.title} className={styles.image} /></td>
                        <td><a href={itemPortfolio.link} target="_blank" rel="noreferrer">{itemPortfolio.link}</a></td>
                        <td>
                            <button onClick={() => handleEdit(index)}>Editar</button>
                            <button onClick={() => handleDelete(index)}>Excluir</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ListaPortfolio;