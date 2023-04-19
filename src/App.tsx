import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/layout';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <h1>Testando</h1>
        </Layout>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
        </Routes>
    </BrowserRouter>
  )
};

export default App;
