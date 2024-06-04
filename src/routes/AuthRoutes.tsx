import React from "react";

import { Route, Routes } from "react-router-dom";

import Home from '../pages/home';
import ListarPessoas from '../pages/pessoas/ListarPessoas';
import ManipularPessoas from '../pages/pessoas/ManipularPessoas';

import Layout from '../components/layout';

import { useAuth } from "../contexts/AuthContext";
import DetalhesPessoa from "../pages/pessoas/DetalhesPessoa";
import CriarPhone from "../pages/pessoas/Phone/CriarPhone";
import CriarEmail from "../pages/pessoas/Email/CriarEmail";

import ManipularCelula from "../pages/Celulas/ManipularCelula";
import ListarCelulas from "../pages/Celulas/ListarCelulas";

import ManipularGrupo from "../pages/Grupos/ManipularGrupo";
import ListarGrupos from "../pages/Grupos/ListarGrupos";

import ManipularLider from "../pages/Lideranca/Lider/ManipularLider";
import ListarLider from "../pages/Lideranca/Lider/ListarLider";

import ManipularDiscipulador from "../pages/Lideranca/Discipulador/ManipularDiscipulador";
import ListarDiscipulador from "../pages/Lideranca/Discipulador/ListarDiscipulador";

import ManipularDiretor from "../pages/Lideranca/Diretor/ManipularDiretor";
import ListarDiretor from "../pages/Lideranca/Diretor/ListarDiretor";


const AuthRoutes: React.FC = () => {
    const { isLoading } = useAuth();

    if (isLoading) {
        return <p>Carregando...</p>
    }


    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                
                <Route path="/pessoas/cadastrar" element={<ManipularPessoas />} />
                <Route path="/pessoas/editar" element={<ManipularPessoas />} />
                <Route path="/pessoas/listar" element={<ListarPessoas />} />
                <Route path="/pessoa/:id" element={<DetalhesPessoa />} />

                <Route path="pessoas/phones/cadastrar/:pessoaId" element={<CriarPhone />}/>
                <Route path="pessoas/emails/cadastrar/:pessoaId" element={<CriarEmail />}/>

                <Route path="/celulas/cadastrar" element={<ManipularCelula />} />
                <Route path="/celulas/editar" element={<ManipularCelula />} />
                <Route path="/celulas/listar" element={<ListarCelulas />} />

                <Route path="/grupos/cadastrar" element={<ManipularGrupo />} />
                <Route path="/grupos/editar" element={<ManipularGrupo />} />
                <Route path="/grupos/listar" element={<ListarGrupos />} />

                <Route path="/lideres/cadastrar" element={<ManipularLider />} />
                <Route path="/lideres/editar" element={<ManipularLider />} />
                <Route path="/lideres/listar" element={<ListarLider />} />
                
                <Route path="/discipuladores/cadastrar" element={<ManipularDiscipulador />} />
                <Route path="/discipuladores/editar" element={<ManipularDiscipulador />} />
                <Route path="/discipuladores/listar" element={<ListarDiscipulador />} />

                <Route path="/diretores/cadastrar" element={<ManipularDiretor />} />
                <Route path="/diretores/editar" element={<ManipularDiretor />} />
                <Route path="/diretores/listar" element={<ListarDiretor />} />
            </Routes>
        </Layout>
    )
}

export default AuthRoutes;