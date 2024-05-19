import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import Home from '../pages/home';
import ListarPessoas from '../pages/pessoas/ListarPessoas';
import ManipularPessoas from '../pages/pessoas/ManipularPessoas';

import Layout from '../components/layout';

import { useAuth } from "../contexts/AuthContext";
import DetalhesPessoa from "../pages/pessoas/DetalhesPessoa";

const AuthRoutes: React.FC = () => {
    const { authenticated, isLoading } = useAuth();

    if (isLoading) {
        return <p>Carregando...</p>
    }

    // if (!authenticated) {
    //     return <Navigate to="/login" />
    // }


    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                
                <Route path="/pessoas/cadastrar" element={<ManipularPessoas />} />
                <Route path="/pessoas/atualizar" element={<ManipularPessoas />} />
                <Route path="/pessoas/listar" element={<ListarPessoas />} />
                <Route path="/pessoa/:id" element={<DetalhesPessoa />} />
            </Routes>
        </Layout>
    )
}

export default AuthRoutes;