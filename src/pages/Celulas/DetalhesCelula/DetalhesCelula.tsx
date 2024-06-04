import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Pessoa, deletePessoa, getPessoasByCelulaId, getPessoaById, removePessoaFromCelula, addPessoaToCelula } from "../../../services/pessoaService";
import { deletePhone } from "../../../services/phoneService";
import { deleteEmail } from "../../../services/emailService";
import { Celula, deleteCelula, getCelulasById } from "../../../services/celulaService";
import { Grupo, getGruposByIntegranteId } from "../../../services/grupoService";

import { useParams } from "react-router-dom";

import styles from "./DetalhesCelula.module.css";


const DetalhesCelula: React.FC = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [celula, setCelula] = useState<Celula>({} as Celula);
    const [pessoas, setPessoas] = useState<Pessoa[]>([] as Pessoa[]);

    const fetchCelula = async () => {
        try {
            const celula = await getCelulasById(String(id));
            setCelula(celula);
            const pessoa = await getPessoasByCelulaId(String(celula.id));
            setPessoas(pessoa);
        } catch (error) {
            console.log('Erro ao buscar celulas', error);

        }
    };

    useEffect(() => {
        fetchCelula();
    }, []);

    const handleEditCelula = (celula: Celula) => {
        navigate("/celulas/editar", { state: celula });
    }

    const handleDeleteCelula = async (celula: Celula) => {
        try {
            await deleteCelula(celula.id);
            fetchCelula();
            alert("Celula removida com sucesso!");
        } catch (error) {
            console.log("Erro ao remover celula", error);
            alert("Erro ao remover celula. Tente novamente.");

        }
    };

    const handleRemovePessoa = async (id: string) => {
        try {
            await removePessoaFromCelula(id);
            fetchCelula();
            alert("Pessoa removida com sucesso!");
        } catch (error) {
            console.log("Erro ao remover pessoa", error);
            alert("Erro ao remover pessoa. Tente novamente.");

        }
    }

    const handleaddPessoaToCelula = async (id: string) => {
        try {
            await addPessoaToCelula(id, celula.id);
            fetchCelula();
            alert("Pessoa adicionada com sucesso!");
        } catch (error) {
            console.log("Erro ao adicionar pessoa", error);
            alert("Erro ao adicionar pessoa. Tente novamente.");

        }
    }

    const handleRemoveFromCelula = async (id: string) => {
        try {
            await removePessoaFromCelula(id);
            fetchCelula();
            alert("Pessoa removida da célula com sucesso!");
        } catch (error) {
            console.log("Erro ao remover pessoa da célula", error);
            alert("Erro ao remover pessoa da célula. Tente novamente.");

        }
    }

    return (
        <div>
            <h1>{celula.nome}</h1>
            <p>Dia da Semana: {celula.diaDaSemana}</p>
            <p>Horário: {celula.horario}</p>
            <p>Líder: {celula.liderId?.pessoaId?.nome}</p>
            <p>Discipulador: {celula.discipuladorId?.pessoaId?.nome}</p>
            <br />
            <h3>Endereço:</h3>
            <p>Bairro: {celula.enderecoId?.bairro}</p>
            <p>Rua: {celula.enderecoId?.rua}</p>
            <p>Número: {celula.enderecoId?.numero}</p>
            <p>Tipo de endereço: {celula.enderecoId?.addressType}</p>
            <button className={styles.button} onClick={() => handleEditCelula(celula)}>Editar</button>
            <button onClick={() => handleDeleteCelula(celula)}>Deletar</button>
            <br /><br />
            <h3>Membros:</h3>
            {pessoas.map((pessoa) => (
                <div>
                    <p key={pessoa.id}>Nome: {pessoa.nome}</p>
                    <p key={pessoa.id}>Cargo: {pessoa.cargo}</p>
                    <p>Bairro: {pessoa.enderecoId?.bairro}</p>
                    <br />
                    <button onClick={() => handleRemovePessoa(String(pessoa.id))}>Remover</button>
                    <button onClick={() => handleaddPessoaToCelula(String(pessoa.id))}>Adicionar</button>
                    <br />
                    <br />
                </div>
            ))}
        </div>
    )
};

export default DetalhesCelula;