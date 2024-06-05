import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Pessoa, deletePessoa, getPessoaById, removePessoaFromCelula, removePessoaFromGrupo } from "../../../services/pessoaService";
import { deletePhone } from "../../../services/phoneService";
import { deleteEmail } from "../../../services/emailService";
import { Celula, getCelulasById } from "../../../services/celulaService";
import { Grupo, getGruposByIntegranteId } from "../../../services/grupoService";
import { Lider, getLiderByPessoaId } from "../../../services/liderService";
import { Discipulador, getDiscipuladorByPessoaId } from "../../../services/discipuladorService";
import { Diretor, getDiretorByPessoaId } from "../../../services/diretorService";
import Button from "../../../components/common/Button";

import { useParams } from "react-router-dom";

import styles from "./DetalhesPessoa.module.css";
import { FaPencil, FaPlus, FaRegTrashCan } from "react-icons/fa6";


const DetalhesPessoa: React.FC = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [pessoa, setPessoa] = useState<Pessoa>({} as Pessoa);
    const [celula, setCelula] = useState<Celula>({} as Celula);
    const [grupos, setGrupos] = useState<Grupo[]>([] as Grupo[]);
    const [lider, setLider] = useState<Lider>({} as Lider);
    const [discipulador, setDiscipulador] = useState<Discipulador>({} as Discipulador);
    const [diretor, setDiretor] = useState<Diretor>({} as Diretor);

    const fetchPessoa = async () => {
        try {
            const pessoa = await getPessoaById(String(id));
            setPessoa(pessoa);
            const celula = await getCelulasById(String(pessoa.celulaId?.id));
            setCelula(celula);
            const lider = await getLiderByPessoaId(String(pessoa.id));
            setLider(lider);
            const discipulador = await getDiscipuladorByPessoaId(String(pessoa.id));
            setDiscipulador(discipulador);
            const diretor = await getDiretorByPessoaId(String(pessoa.id));
            setDiretor(diretor);
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

    const handleLiderProfile = () => {
        navigate(`/lider/${lider.id}`);
    }

    const handleDiscipuladorProfile = () => {
        navigate(`/discipulador/${discipulador.id}`);
    }

    const handleDiretorProfile = () => {
        navigate(`/diretor/${diretor.id}`);
    }

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
        <div className={styles.detalhesPage}>
            <div className={styles.section}>
                <h1>{pessoa.nome}</h1>
                <div className={styles.profiles}>
                    {/* <p className={styles.cargo}>{pessoa.cargo}</p> */}
                    <Button selected>{pessoa.cargo}</Button>
                    {lider.id ? <Button onClick={handleLiderProfile}>Líder</Button> : null}
                    {discipulador.id ? <Button onClick={handleDiscipuladorProfile}>Discipulador</Button> : null}
                    {diretor.id ? <Button onClick={handleDiretorProfile}>Diretor</Button> : null}
                </div>
                <div className={styles.endereco}>
                    <p>Rua: {pessoa.enderecoId?.rua}, {pessoa.enderecoId?.numero}</p>
                    <p>Bairro: {pessoa.enderecoId?.bairro}</p>
                </div>
            </div>
            <div className={styles.buttons}>
                <Button onClick={() => handleEditPessoa(pessoa)}><FaPencil /></Button>
                <Button onClick={() => handleDeletePessoa(pessoa)}><FaRegTrashCan /></Button>
            </div>
            <div className={styles.section}>
                <div className={styles.contactSection}>
                    <div className={styles.contactBlock}>
                        <div className={styles.contactTitle}>
                            <h3>Telefones:</h3>
                            <Button green onClick={handleAddPhone}><FaPlus /></Button>
                        </div>
                        {pessoa.phones?.map((phone) => (
                            <div className={styles.contactRow}>
                                <p key={phone.id}>{phone.numero}</p>
                                <p key={phone.id}>{phone.phoneType}</p>
                                <Button deleteButton onClick={() => handleDeletePhone(phone.id)}><FaRegTrashCan /></Button>
                            </div>
                        ))}
                    </div>
                    <div className={styles.contactBlock}>
                        <div className={styles.contactTitle}>
                            <h3>Emails:</h3>
                            <Button green onClick={handleAddEmail}><FaPlus /></Button>
                        </div>
                        {pessoa.emails?.map((email) => (
                            <div className={styles.contactRow}>
                                <p key={email.id}>{email.email}</p>
                                <p key={email.id}>{email.emailType}</p>
                                <Button deleteButton onClick={() => handleDeleteEmail(email.id)}><FaRegTrashCan /></Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
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