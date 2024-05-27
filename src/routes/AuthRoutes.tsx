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

import ManipularLider from "../pages/Lideranca/Lider/ManipularLider";
import ListarLider from "../pages/Lideranca/Lider/ListarLider";


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
                <Route path="/pessoas/atualizar" element={<ManipularPessoas />} />
                <Route path="/pessoas/listar" element={<ListarPessoas />} />
                <Route path="/pessoa/:id" element={<DetalhesPessoa />} />

                <Route path="pessoas/phones/cadastrar/:pessoaId" element={<CriarPhone />}/>
                <Route path="pessoas/emails/cadastrar/:pessoaId" element={<CriarEmail />}/>

                <Route path="/lideres/cadastrar" element={<ManipularLider />} />
                <Route path="/lideres/listar" element={<ListarLider />} />
            </Routes>
        </Layout>
    )
}

export default AuthRoutes;