import React, { useEffect, useState} from "react";

import styles from "./Home.module.css";

import { FaGraduationCap, FaBriefcase, FaFolder } from "react-icons/fa";

import Title from "../../components/common/Title";
import InfoBox from "../../components/common/InfoBox";

import { Projeto, getPortfolio } from "../../services/portfolioService";
import { Experiencia, getExperienciasByType} from "../../services/experienciaService";

const Home = () => {
    const [experienciasAcademicas, setExperienciasAcademicas] = useState<Experiencia[]>([]);
    const [experienciasProfissionais, setExperienciasProfissionais] = useState<Experiencia[]>([]);
    const [portfolio, setPortfolio] = useState<Projeto[]>([]);

    const fetchExperienciasAcademicas = async () => {
        try {
            const response = await getExperienciasByType("academico");
            setExperienciasAcademicas(response);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchExperienciasProfissionais = async () => {
        try {
            const response = await getExperienciasByType("profissional");
            setExperienciasProfissionais(response);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPortfolio = async () => {
        try {
            const response = await getPortfolio();
            setPortfolio(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchExperienciasAcademicas();
        fetchExperienciasProfissionais();
        fetchPortfolio();
    }, []);

    return (
        <main className={styles.container}>
            <Title className={styles.title}>Bem-vindo ao BackOffice do Meu site pessoal</Title>
            <p>Esta é a página inicial onde podemos encontrar algumas estatísticas.</p>
            <div className={styles.infoBoxContainer}>
                <InfoBox 
                    title="Experiências Acadêmicas"
                    value={experienciasAcademicas.length}
                    icon={<FaGraduationCap size={65} />}
                />
                <InfoBox
                    title="Experiências Profissionais"
                    value={experienciasProfissionais.length}
                    icon={<FaBriefcase size={65} />}
                />
                <InfoBox
                    title="Projetos no Portfólio"
                    value={portfolio.length}
                    icon={<FaFolder size={65} />}
                />

            </div>
        </main>
    )
};

export default Home;