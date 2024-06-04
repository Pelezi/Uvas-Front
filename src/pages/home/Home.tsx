import React, { useEffect, useState} from "react";

import styles from "./Home.module.css";

import { FaUser } from "react-icons/fa6";

import Title from "../../components/common/Title";
import InfoBox from "../../components/common/InfoBox";

import { Pessoa, getPessoas } from "../../services/pessoaService";

const Home = () => {
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);

    const fetchPessoas = async () => {
        try {
            const response = await getPessoas();
            setPessoas(response);
        } catch (error) {
            console.log(error);
        }
    
    }

    useEffect(() => {
        fetchPessoas();
    }, []);

    return (
        <main className={styles.container}>
            <Title className={styles.title}>Bem-vindo ao Uvas</Title>
            <p>Esta é a página inicial onde podemos encontrar algumas estatísticas.</p>
            <div className={styles.infoBoxContainer}>
                <InfoBox 
                    title="Pessoas cadastradas"
                    value={pessoas.length}
                    icon={<FaUser size={65} />}
                />
            </div>
        </main>
    )
};

export default Home;