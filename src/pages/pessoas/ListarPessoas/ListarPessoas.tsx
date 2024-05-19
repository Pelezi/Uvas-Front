import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Table, Column } from "../../../components/common/Table";

import { Pessoa, deletePessoa, getPessoas } from "../../../services/pessoaService";


const ListarPessoa: React.FC = () => {

    const navigate = useNavigate();

    const [pessoas, setPessoas] = useState<Pessoa[]>([]);

    const fetchPessoas = async () => {
        try {
            const pessoas = await getPessoas();
            setPessoas(pessoas);
        } catch (error) {
            console.log('Erro ao buscar pessoas', error);
            
        }
    };

    useEffect(() => {
        fetchPessoas();
    }, []);
    
    const handleEdit = (pessoa: Pessoa) => {
        navigate("/pessoas/atualizar", { state: pessoa });
    }
    
    const handleDelete = async (pessoa: Pessoa) => {
        try {
            await deletePessoa(pessoa.id);
            fetchPessoas();
            alert("Pessoa removida com sucesso!");
        } catch (error) {
            console.log("Erro ao remover pessoa", error);
            alert("Erro ao remover pessoa. Tente novamente.");
            
        }
    };

    const capitalize = (str: string) => {
        if (typeof str !== 'string') return ''
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const columns: Column<Pessoa>[] = [
        { header: "Nome", accessor: (item) => item.nome },
        { header: "Cargo", accessor: (item) => item.cargo === "frequentador_assiduo" ? "Frequentador assíduo" : capitalize(item.cargo)},
        { header: "Bairro", accessor: (item) => item.enderecoId?.bairro },
        { header: "Rua", accessor: (item) => item.enderecoId?.rua },
        // { header: "Telefone", accessor: (item) => item.phones?.[0]?.numero },
        // { header: "Email", accessor: (item) => item.emails?.[0]?.email },
    ];

    return (
        <Table 
            columns={columns}
            data={pessoas}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
        
    )
};

export default ListarPessoa;