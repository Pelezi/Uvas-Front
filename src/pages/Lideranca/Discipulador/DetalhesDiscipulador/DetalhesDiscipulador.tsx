import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Discipulador, deleteDiscipulador, getDiscipuladorById } from "../../../../services/discipuladorService";
import { Pessoa, deletePessoa, getPessoaById, removePessoaFromCelula, removePessoaFromGrupo } from "../../../../services/pessoaService";
import { deletePhone } from "../../../../services/phoneService";
import { deleteEmail } from "../../../../services/emailService";
import { Celula, getCelulasById, getCelulasByDiscipuladorId, removeDiscipuladorFromCelula } from "../../../../services/celulaService";

import { useParams } from "react-router-dom";

import styles from "./DetalhesDiscipulador.module.css";


const DetalhesDiscipulador: React.FC = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [discipulador, setDiscipulador] = useState<Discipulador>({} as Discipulador);
    const [pessoa, setPessoa] = useState<Pessoa>({} as Pessoa);
    const [celulas, setCelula] = useState<Celula[]>([] as Celula[]);

    const fetchDiscipulador = async () => {
        try {
            const discipulador = await getDiscipuladorById(String(id));
            setDiscipulador(discipulador);
            const pessoa = await getPessoaById(String(discipulador.pessoaId?.id));
            setPessoa(pessoa);
            const celula = await getCelulasByDiscipuladorId(String(discipulador.id));
            setCelula(celula);
        } catch (error) {
            console.log('Erro ao buscar discipulador', error);

        }
    }

    useEffect(() => {
        fetchDiscipulador();
    }, []);

    const handleEditDiscipulador = (discipulador: Discipulador) => {
        navigate("/discipuladores/editar", { state: discipulador });
    }

    const handleDeleteDiscipulador = async (discipulador: Discipulador) => {
        try {
            await deleteDiscipulador(discipulador.id);
            fetchDiscipulador();
            alert("Discipulador removido com sucesso!");
        } catch (error) {
            console.log("Erro ao remover discipulador", error);
            alert("Erro ao remover discipulador. Tente novamente.");

        }
    };
    const handleRemoveDiscipuladorFromCelula = async (celulaId: string) => {
        try {
            await removeDiscipuladorFromCelula(celulaId);
            fetchDiscipulador();
            alert("Discipulador removido da célula com sucesso!");
        } catch (error) {
            console.log("Erro ao remover discipulador da célula", error);
            alert("Erro ao remover discipulador da célula. Tente novamente.");

        }
    }

    const handleAddPhone = () => {
        navigate(`/pessoas/phones/cadastrar/${discipulador.pessoaId?.id}`);
    };

    const handleAddEmail = () => {
        navigate(`/pessoas/emails/cadastrar/${discipulador.pessoaId?.id}`);
    };

    return (
        <div>
            <h1>{pessoa.nome}</h1>
            <p>Cargo: {pessoa.cargo}</p>
            <br />
            <h3>Endereço:</h3>
            <p>Bairro: {pessoa.enderecoId?.bairro}</p>
            <p>Rua: {pessoa.enderecoId?.rua}</p>
            <p>Número: {pessoa.enderecoId?.numero}</p>
            <button className={styles.button} onClick={() => handleEditDiscipulador(discipulador)}>Editar</button>
            <button onClick={() => handleDeleteDiscipulador(discipulador)}>Deletar</button>
            <br /><br />
            <h3>Contatos:</h3>
            {pessoa.phones?.map((phone) => (
                <div>
                    <p key={phone.id}>Telefone: {phone.numero}</p>
                    <button onClick={() => deletePhone(phone.id)}>Remover</button>
                </div>
            ))}
            <button onClick={handleAddPhone}>Adicionar Telefone</button>
            <br />
            <br />
            {pessoa.emails?.map((email) => (
                <div>
                    <p key={email.id}>Email: {email.email}</p>
                    <button onClick={() => deleteEmail(email.id)}>Remover</button>
                </div>
            ))}
            <button onClick={handleAddEmail}>Adicionar Email</button>
            <h3>Células:</h3>
            {celulas.map((celula) => (
                <div>
                    <p key={celula.id}>Nome da célula: {celula.nome}</p>
                    <p key={celula.id}>Dia da semana: {celula.diaDaSemana}</p>
                    <p key={celula.id}>Horário: {celula.horario}</p>
                    <p key={celula.id}>Líder: {celula.liderId?.pessoaId?.nome}</p>
                    <p key={celula.id}>Bairro: {celula.enderecoId?.bairro}</p>
                    <p key={celula.id}>Rua: {celula.enderecoId?.rua}</p>
                    <button onClick={() => handleRemoveDiscipuladorFromCelula(String(celula.id))}>Remover Discipulador da célula</button>
                    <br />
                    <br />
                    <br />
                </div>
            ))}
            <br />
            <br />


        </div>
    )
};

export default DetalhesDiscipulador;