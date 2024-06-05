import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Lider, deleteLider, getLiderById } from "../../../../services/liderService";
import { Pessoa, deletePessoa, getPessoaById, removePessoaFromCelula, removePessoaFromGrupo } from "../../../../services/pessoaService";
import { deletePhone } from "../../../../services/phoneService";
import { deleteEmail } from "../../../../services/emailService";
import { Celula, getCelulasById, getCelulasByLiderId, removeLiderFromCelula } from "../../../../services/celulaService";

import { useParams } from "react-router-dom";

import styles from "./DetalhesLider.module.css";


const DetalhesLider: React.FC = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [lider, setLider] = useState<Lider>({} as Lider);
    const [pessoa, setPessoa] = useState<Pessoa>({} as Pessoa);
    const [celulas, setCelula] = useState<Celula[]>([] as Celula[]);

    const fetchLider = async () => {
        try {
            const lider = await getLiderById(String(id));
            setLider(lider);
            const pessoa = await getPessoaById(String(lider.pessoaId?.id));
            setPessoa(pessoa);
            const celula = await getCelulasByLiderId(String(lider.id));
            setCelula(celula);
        } catch (error) {
            console.log('Erro ao buscar lider', error);

        }
    }

    useEffect(() => {
        fetchLider();
    }, []);

    const handleEditLider = (lider: Lider) => {
        navigate("/lideres/editar", { state: lider });
    }

    const handleDeleteLider = async (lider: Lider) => {
        try {
            await deleteLider(lider.id);
            fetchLider();
            alert("Lider removido com sucesso!");
        } catch (error) {
            console.log("Erro ao remover lider", error);
            alert("Erro ao remover lider. Tente novamente.");

        }
    };
    const handleRemoveLiderFromCelula = async (celulaId: string) => {
        try {
            await removeLiderFromCelula(celulaId);
            fetchLider();
            alert("Líder removido da célula com sucesso!");
        } catch (error) {
            console.log("Erro ao remover líder da célula", error);
            alert("Erro ao remover líder da célula. Tente novamente.");

        }
    }

    const handleAddPhone = () => {
        navigate(`/pessoas/phones/cadastrar/${lider.pessoaId?.id}`);
    };

    const handleAddEmail = () => {
        navigate(`/pessoas/emails/cadastrar/${lider.pessoaId?.id}`);
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
            <button className={styles.button} onClick={() => handleEditLider(lider)}>Editar</button>
            <button onClick={() => handleDeleteLider(lider)}>Deletar</button>
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
                    <p key={celula.id}>Discipulador: {celula.discipuladorId?.pessoaId?.nome}</p>
                    <p key={celula.id}>Bairro: {celula.enderecoId?.bairro}</p>
                    <p key={celula.id}>Rua: {celula.enderecoId?.rua}</p>
                    <button onClick={() => handleRemoveLiderFromCelula(String(celula.id))}>Remover Líder da célula</button>
                    <br />
                </div>
            ))}
            <br />
            <br />


        </div>
    )
};

export default DetalhesLider;