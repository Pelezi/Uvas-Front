import React, { useEffect, useState} from "react";

import styles from "./Home.module.css";

import { FaUser } from "react-icons/fa";

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
            <Title className={styles.title}>Bem-vindo ao BackOffice do Meu site pessoal</Title>
            <p>Esta é a página inicial onde podemos encontrar algumas estatísticas.</p>
            <div className={styles.infoBoxContainer}>
                <InfoBox 
                    title="Experiências Acadêmicas"
                    value={pessoas.length}
                    icon={<FaUser size={65} />}
                />
            </div>
        </main>
    )
};

export default Home;