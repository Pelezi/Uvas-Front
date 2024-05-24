import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Pessoa, deletePessoa, getPessoasById } from "../../../services/pessoaService";
import { Phone, deletePhone, createOrUpdatePhone } from "../../../services/phoneService";
import { Email, deleteEmail, createOrUpdateEmail } from "../../../services/emailService";

import { useParams } from "react-router-dom";

import styles from "./DetalhesPessoa.module.css";


const DetalhesPessoa: React.FC = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [pessoa, setPessoa] = useState<Pessoa>({} as Pessoa);
    const [phone, setPhone] = useState<Phone>({} as Phone);
    const [email, setEmail] = useState<Email>({} as Email);

    const fetchPessoa = async () => {
        try {
            const pessoa = await getPessoasById(String(id));
            setPessoa(pessoa);
        } catch (error) {
            console.log('Erro ao buscar pessoas', error);
            
        }
    };

    useEffect(() => {
        fetchPessoa();
    }, []);
    
    const handleEditPessoa = (pessoa: Pessoa) => {
        navigate("/pessoas/atualizar", { state: pessoa });
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

    return (
        <div>
            <p>Nome: {pessoa.nome}</p>
            <p>Cargo: {pessoa.cargo}</p>
            <br />
            <p>Bairro: {pessoa.enderecoId?.bairro}</p>
            <p>Rua: {pessoa.enderecoId?.rua}</p>
            <p>Número: {pessoa.enderecoId?.numero}</p>
            <p>Tipo de endereço: {pessoa.enderecoId?.addressType}</p>
            <button className={styles.button} onClick={() => handleEditPessoa(pessoa)}>Editar</button>
            <button onClick={() => handleDeletePessoa(pessoa)}>Deletar</button>
            <br /><br />
            {pessoa.phones?.map((phone) => (
                <div>
                    <p key={phone.id}>Telefone: {phone.numero}</p>
                    <p key={phone.id}>Tipo de telefone: {phone.phoneType}</p>
                    <button onClick={() => handleDeletePhone(phone.id)}>Deletar telefone</button>
                </div>
            ))}
            <br />
            {pessoa.emails?.map((email) => (
                <div>
                    <p key={email.id}>Email: {email.email}</p>
                    <p key={email.id}>Tipo de email: {email.emailType}</p>
                    <button onClick={() => handleDeleteEmail(email.id)}>Deletar email</button>
                </div>
            ))}
            <br />


        </div>
    )
};

export default DetalhesPessoa;