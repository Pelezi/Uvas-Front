import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Table, Column } from "../../../components/common/Table";

import { Pessoa, deletePessoa, getPessoasById } from "../../../services/pessoaService";

import { useParams } from "react-router-dom";


const DetalhesPessoa: React.FC = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [pessoa, setPessoa] = useState<Pessoa>({} as Pessoa);

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
    
    const handleEdit = (pessoa: Pessoa) => {
        navigate("/pessoas/atualizar", { state: pessoa });
    }
    
    const handleDelete = async (pessoa: Pessoa) => {
        try {
            await deletePessoa(pessoa.id);
            fetchPessoa();
            alert("Pessoa removida com sucesso!");
        } catch (error) {
            console.log("Erro ao remover pessoa", error);
            alert("Erro ao remover pessoa. Tente novamente.");
            
        }
    };

    return (
        <div>
            <div>Teste</div>
            <p>Nome: {pessoa.nome}</p>
            <p>Cargo: {pessoa.cargo}</p>
            <br />
            <p>Bairro: {pessoa.enderecoId?.bairro}</p>
            <p>Rua: {pessoa.enderecoId?.rua}</p>
            <p>Número: {pessoa.enderecoId?.numero}</p>
            <p>Tipo de endereço: {pessoa.enderecoId?.addressType}</p>
            <button onClick={() => handleEdit(pessoa)}>Editar</button>
            <button onClick={() => handleDelete(pessoa)}>Deletar</button>
            <br /><br />
            {pessoa.phones?.map((phone) => (
                <div>
                    <p key={phone.id}>Telefone: {phone.numero}</p>
                    <p key={phone.id}>Tipo de telefone: {phone.phoneType}</p>
                </div>
            ))}
            <br />
            {pessoa.emails?.map((email) => (
                <div>
                    <p key={email.id}>Email: {email.email}</p>
                    <p key={email.id}>Tipo de email: {email.emailType}</p>
                </div>
            ))}
            <br />


        </div>
    )
};

export default DetalhesPessoa;