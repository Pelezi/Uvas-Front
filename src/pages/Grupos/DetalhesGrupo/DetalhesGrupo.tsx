import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Pessoa, deletePessoa, getPessoasByGrupoId, getPessoaById, removePessoaFromGrupo, addPessoaToGrupo } from "../../../services/pessoaService";
import { deletePhone } from "../../../services/phoneService";
import { deleteEmail } from "../../../services/emailService";
import { Grupo, deleteGrupo, getGruposById } from "../../../services/grupoService";

import { useParams } from "react-router-dom";

import styles from "./DetalhesGrupo.module.css";


const DetalhesGrupo: React.FC = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [grupo, setGrupo] = useState<Grupo>({} as Grupo);
    const [pessoas, setPessoas] = useState<Pessoa[]>([] as Pessoa[]);

    const fetchGrupo = async () => {
        try {
            const grupo = await getGruposById(String(id));
            setGrupo(grupo);
            const pessoa = await getPessoasByGrupoId(String(grupo.id));
            setPessoas(pessoa);
        } catch (error) {
            console.log('Erro ao buscar grupos', error);

        }
    };

    useEffect(() => {
        fetchGrupo();
    }, []);

    const handleEditGrupo = (grupo: Grupo) => {
        navigate("/grupos/editar", { state: grupo });
    }

    const handleDeleteGrupo = async (grupo: Grupo) => {
        try {
            await deleteGrupo(grupo.id);
            fetchGrupo();
            alert("Grupo removida com sucesso!");
        } catch (error) {
            console.log("Erro ao remover grupo", error);
            alert("Erro ao remover grupo. Tente novamente.");

        }
    };

    const handleRemovePessoa = async (id: string) => {
        try {
            await removePessoaFromGrupo(id, grupo.id);
            fetchGrupo();
            alert("Pessoa removida com sucesso!");
        } catch (error) {
            console.log("Erro ao remover pessoa", error);
            alert("Erro ao remover pessoa. Tente novamente.");

        }
    }

    const handleaddPessoaToGrupo = async (id: string) => {
        try {
            await addPessoaToGrupo(id, grupo.id);
            fetchGrupo();
            alert("Pessoa adicionada com sucesso!");
        } catch (error) {
            console.log("Erro ao adicionar pessoa", error);
            alert("Erro ao adicionar pessoa. Tente novamente.");

        }
    }

    const handleRemoveFromGrupo = async (id: string) => {
        try {
            await removePessoaFromGrupo(id, grupo.id);
            fetchGrupo();
            alert("Pessoa removida da célula com sucesso!");
        } catch (error) {
            console.log("Erro ao remover pessoa da célula", error);
            alert("Erro ao remover pessoa da célula. Tente novamente.");

        }
    }

    return (
        <div>
            <h1>{grupo.nome}</h1>
            <p>Tipo: {grupo.grupoType}</p>
            <p>Diretor: {grupo.diretorId?.pessoaId?.nome}</p>
            <br />
            <button className={styles.button} onClick={() => handleEditGrupo(grupo)}>Editar</button>
            <button onClick={() => handleDeleteGrupo(grupo)}>Deletar</button>
            <br /><br />
            <h3>Membros:</h3>
            {pessoas.map((pessoa) => (
                <div>
                    <p key={pessoa.id}>Nome: {pessoa.nome}</p>
                    <p key={pessoa.id}>Cargo: {pessoa.cargo}</p>
                    <p>Bairro: {pessoa.enderecoId?.bairro}</p>
                    <br />
                    <button onClick={() => handleRemovePessoa(String(pessoa.id))}>Remover</button>
                    <button onClick={() => handleaddPessoaToGrupo(String(pessoa.id))}>Adicionar</button>
                    <br />
                    <br />
                </div>
            ))}
        </div>
    )
};

export default DetalhesGrupo;