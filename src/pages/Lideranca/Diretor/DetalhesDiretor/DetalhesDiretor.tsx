import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Diretor, deleteDiretor, getDiretorById } from "../../../../services/diretorService";
import { Pessoa, deletePessoa, getPessoaById, removePessoaFromGrupo } from "../../../../services/pessoaService";
import { deletePhone } from "../../../../services/phoneService";
import { deleteEmail } from "../../../../services/emailService";
import { Grupo, getGruposById, getGruposByDiretorId, removeDiretorFromGrupo } from "../../../../services/grupoService";

import { useParams } from "react-router-dom";

import styles from "./DetalhesDiretor.module.css";


const DetalhesDiretor: React.FC = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [diretor, setDiretor] = useState<Diretor>({} as Diretor);
    const [pessoa, setPessoa] = useState<Pessoa>({} as Pessoa);
    const [grupos, setGrupo] = useState<Grupo[]>([] as Grupo[]);

    const fetchDiretor = async () => {
        try {
            const diretor = await getDiretorById(String(id));
            setDiretor(diretor);
            const pessoa = await getPessoaById(String(diretor.pessoaId?.id));
            setPessoa(pessoa);
            const grupo = await getGruposByDiretorId(String(diretor.id));
            setGrupo(grupo);
        } catch (error) {
            console.log('Erro ao buscar diretor', error);

        }
    }

    useEffect(() => {
        fetchDiretor();
    }, []);

    const handleEditDiretor = (diretor: Diretor) => {
        navigate("/diretores/editar", { state: diretor });
    }

    const handleDeleteDiretor = async (diretor: Diretor) => {
        try {
            await deleteDiretor(diretor.id);
            fetchDiretor();
            alert("Diretor removido com sucesso!");
        } catch (error) {
            console.log("Erro ao remover diretor", error);
            alert("Erro ao remover diretor. Tente novamente.");

        }
    };
    const handleRemoveDiretorFromGrupo = async (grupoId: string) => {
        try {
            await removeDiretorFromGrupo(grupoId);
            fetchDiretor();
            alert("Diretor removido da célula com sucesso!");
        } catch (error) {
            console.log("Erro ao remover diretor da célula", error);
            alert("Erro ao remover diretor da célula. Tente novamente.");

        }
    }

    const handleAddPhone = () => {
        navigate(`/pessoas/phones/cadastrar/${diretor.pessoaId?.id}`);
    };

    const handleAddEmail = () => {
        navigate(`/pessoas/emails/cadastrar/${diretor.pessoaId?.id}`);
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
            <button className={styles.button} onClick={() => handleEditDiretor(diretor)}>Editar</button>
            <button onClick={() => handleDeleteDiretor(diretor)}>Deletar</button>
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
            <h3>Grupos:</h3>
            {grupos.map((grupo) => (
                <div>
                    <p key={grupo.id}>Nome do grupo: {grupo.nome}</p>
                    <p key={grupo.id}>Tipo de grupo: {grupo.grupoType}</p>
                    <p key={grupo.id}>Diretor: {grupo.diretorId?.pessoaId?.nome}</p>
                    <button onClick={() => handleRemoveDiretorFromGrupo(String(grupo.id))}>Remover do grupo</button>
                    <br />
                </div>
            ))}
            <br />
            <br />


        </div>
    )
};

export default DetalhesDiretor;