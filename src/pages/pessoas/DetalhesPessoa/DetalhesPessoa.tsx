import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Pessoa, deletePessoa, getPessoaById, removePessoaFromCelula, removePessoaFromGrupo } from "../../../services/pessoaService";
import { deletePhone } from "../../../services/phoneService";
import { deleteEmail } from "../../../services/emailService";
import { Celula, getCelulasById } from "../../../services/celulaService";
import { Grupo, getGruposByIntegranteId } from "../../../services/grupoService";

import { useParams } from "react-router-dom";

import styles from "./DetalhesPessoa.module.css";


const DetalhesPessoa: React.FC = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [pessoa, setPessoa] = useState<Pessoa>({} as Pessoa);
    const [celula, setCelula] = useState<Celula>({} as Celula);
    const [grupos, setGrupos] = useState<Grupo[]>([] as Grupo[]);

    const fetchPessoa = async () => {
        try {
            const pessoa = await getPessoaById(String(id));
            setPessoa(pessoa);
            const celula = await getCelulasById(String(pessoa.celulaId?.id));
            setCelula(celula);
        } catch (error) {
            console.log('Erro ao buscar pessoas', error);

        }
    };

    const fetchGrupos = async () => {
        try {
            const grupos = await getGruposByIntegranteId(String(id));
            setGrupos(grupos);
        } catch (error) {
            console.log('Erro ao buscar grupos', error);

        }
    }

    useEffect(() => {
        fetchPessoa();
        fetchGrupos();
    }, []);

    const handleEditPessoa = (pessoa: Pessoa) => {
        navigate("/pessoas/editar", { state: pessoa });
    }

    const handleDeletePessoa = async (pessoa: Pessoa) => {
        try {
            await deletePessoa(pessoa.id);
            fetchPessoa();
            alert("Pessoa removida com sucesso!");
        } catch (error) {
            console.log("Erro ao remover pessoa", error);
            alert("Erro ao remover pessoa. Tente novamente.");

        }
    };
    const handleDeletePhone = async (phone: string | undefined) => {
        try {
            await deletePhone(phone);
            fetchPessoa();
            alert("Telefone removido com sucesso!");
        } catch (error) {
            console.log("Erro ao remover telefone", error);
            alert("Erro ao remover telefone. Tente novamente.");

        }
    }
    const handleDeleteEmail = async (email: string | undefined) => {
        try {
            await deleteEmail(email);
            fetchPessoa();
            alert("Email removido com sucesso!");
        } catch (error) {
            console.log("Erro ao remover email", error);
            alert("Erro ao remover email. Tente novamente.");

        }
    }

    const handleAddPhone = () => {
        navigate(`/pessoas/phones/cadastrar/${id}`);
    };

    const handleAddEmail = () => {
        navigate(`/pessoas/emails/cadastrar/${id}`);
    };

    const handleRemoveFromCelula = async (id: string) => {
        try {
            await removePessoaFromCelula(id);
            fetchPessoa();
            alert("Pessoa removida da célula com sucesso!");
        } catch (error) {
            console.log("Erro ao remover pessoa da célula", error);
            alert("Erro ao remover pessoa da célula. Tente novamente.");

        }
    }

    const handleRemoveFromGrupo = async (id: string, grupoId: string) => {
        try {
            await removePessoaFromGrupo(id, grupoId);
            fetchPessoa();
            alert("Pessoa removida do grupo com sucesso!");
        } catch (error) {
            console.log("Erro ao remover pessoa do grupo", error);
            alert("Erro ao remover pessoa do grupo. Tente novamente.");

        }
    }

    return (
        <div>
            <h1>{pessoa.nome}</h1>
            <p>Cargo: {pessoa.cargo}</p>
            <br />
            <h3>Endereço:</h3>
            <p>Bairro: {pessoa.enderecoId?.bairro}</p>
            <p>Rua: {pessoa.enderecoId?.rua}</p>
            <p>Número: {pessoa.enderecoId?.numero}</p>
            <p>Tipo de endereço: {pessoa.enderecoId?.addressType}</p>
            <button className={styles.button} onClick={() => handleEditPessoa(pessoa)}>Editar</button>
            <button onClick={() => handleDeletePessoa(pessoa)}>Deletar</button>
            <br /><br />
            <h3>Telefones:</h3>
            {pessoa.phones?.map((phone) => (
                <div>
                    <p key={phone.id}>Telefone: {phone.numero}</p>
                    <p key={phone.id}>Tipo de telefone: {phone.phoneType}</p>
                    <button onClick={() => handleDeletePhone(phone.id)}>Deletar telefone</button>
                </div>
            ))}
            <br />
            <button onClick={handleAddPhone}>Adicionar telefone</button>
            <br />
            <br />
            <h3>Emails:</h3>
            {pessoa.emails?.map((email) => (
                <div>
                    <p key={email.id}>Email: {email.email}</p>
                    <p key={email.id}>Tipo de email: {email.emailType}</p>
                    <button onClick={() => handleDeleteEmail(email.id)}>Deletar email</button>
                </div>
            ))}
            <br />
            <button onClick={handleAddEmail}>Adicionar email</button>
            <br />
            <br />
            <h3>Célula:</h3>
            {pessoa.celulaId ?
                <div>
                    <p>Célula: {celula.nome}</p>
                    <p>Líder: {celula.liderId?.pessoaId?.nome}</p>
                    <p>Bairro: {celula.enderecoId?.bairro}</p>
                    <p>Rua: {celula.enderecoId?.rua}</p>
                    <button onClick={() => handleRemoveFromCelula(String(pessoa.id))}>Remover da célula</button>
                    <br />
                </div>

                :
                null
            }
            <br />
            <br />
            <h3>Grupos:</h3>
            {grupos.map((grupo) => (
                <div>
                    <p key={grupo.id}>Nome do grupo: {grupo.nome}</p>
                    <p key={grupo.id}>Tipo de grupo: {grupo.grupoType}</p>
                    <p key={grupo.id}>Diretor: {grupo.diretorId?.pessoaId?.nome}</p>
                    <button onClick={() => handleRemoveFromGrupo(String(pessoa.id), String(grupo.id))}>Remover do grupo</button>
                    <br />
                </div>
            ))}
            <br />
            <br />


        </div>
    )
};

export default DetalhesPessoa;