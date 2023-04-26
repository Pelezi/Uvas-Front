import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import AppRoutes from './routes/AppRoutes';

import Home from './pages/home';

import CadastrarInformacoes from './pages/curriculo/CadastrarInformacoes';
import CadastrarExperiencia from './pages/curriculo/CadastrarExperiencia';
import ListaExperiencia from './pages/curriculo/ListaExperiencia';

import CadastrarPortfolio from './pages/portfolio/CadastrarPortfolio';
import ListaPortfolio from './pages/portfolio/ListaPortfolio';
import Layout from './components/layout';



const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/*" element={
          <AppRoutes> 
            <Route path="/" element={<Home />} />
            <Route path="/curriculo/informacoes/cadastro" element={<CadastrarInformacoes />} />
            <Route path="/curriculo/experiencia/cadastro" element={<CadastrarExperiencia />} />
            <Route path="/curriculo/experiencia/lista" element={<ListaExperiencia />} />

            <Route path="/portfolio/cadastro" element={<CadastrarPortfolio />} />
            <Route path="/portfolio/lista" element={<ListaPortfolio />} />
          </AppRoutes> 
      } />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
