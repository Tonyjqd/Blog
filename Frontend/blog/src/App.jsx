import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import { Formulario } from './Pages/Formulario/Formulario';
import { Publicaciones } from './Componentes/Publicaciones';
import { DetallePublicacion } from './Componentes/DetallePublicacion';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/entrada" element={<Formulario/>} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/publicaciones" element={<Publicaciones />} />
          <Route path="/publicaciones/:id_publicacion" element={<DetallePublicacion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;