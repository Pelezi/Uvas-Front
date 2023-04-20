import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/layout';

import Home from './pages/home';
import CadastrarInformacoes from './pages/curriculo/CadastrarInformacoes';
import CadastrarExperiencia from './pages/curriculo/CadastrarExperiencia';

import ListaPortfolio from './pages/portfolio/ListaPortfolio';



const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/curriculo/informacoes/cadastro" element={<CadastrarInformacoes />} />
          <Route path="/curriculo/experiencia/cadastro" element={<CadastrarExperiencia />} />

          <Route path="/portfolio/lista" element={<ListaPortfolio />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
};

export default App;
