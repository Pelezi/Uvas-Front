import React from "react";

import Home from '../pages/home';

import CadastrarInformacoes from '../pages/curriculo/CadastrarInformacoes';
import CadastrarExperiencia from '../pages/curriculo/CadastrarExperiencia';
import ListaExperiencia from '../pages/curriculo/ListaExperiencia';

import CadastrarPortfolio from '../pages/portfolio/CadastrarPortfolio';
import ListaPortfolio from '../pages/portfolio/ListaPortfolio';
import Layout from '../components/layout';

import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AuthRoutes: React.FC = () => {
    const { authenticated, isLoading } = useAuth();

    if (isLoading) {
        return <p>Carregando...</p>
    }

    if (!authenticated) {
        return <Navigate to="/login" />
    }


    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/curriculo/informacoes/cadastro" element={<CadastrarInformacoes />} />
                <Route path="/curriculo/experiencia/cadastro" element={<CadastrarExperiencia />} />
                <Route path="/curriculo/experiencia/lista" element={<ListaExperiencia />} />

                <Route path="/portfolio/cadastro" element={<CadastrarPortfolio />} />
                <Route path="/portfolio/lista" element={<ListaPortfolio />} />
            </Routes>
        </Layout>
    )
}

export default AuthRoutes;