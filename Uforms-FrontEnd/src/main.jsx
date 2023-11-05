import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Inicio';
import Formularios from './components/Formularios';
import Estudiante from './components/Estudiante';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/formularios" element={<Formularios />} />
        <Route path="/estudiante" element={<Estudiante />} />
      </Routes>
    </Router>
  </React.StrictMode>
);