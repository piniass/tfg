// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa tus componentes
import PaginaFormulario from './pages/PaginaFormulario';
import Dashboard from './pages/Dashboard';
import Tareas from './pages/Tareas';
// import CrearCliente from './pages/CrearCliente';
import ClienteDetalles from './pages/ClienteDetalles';
import Login from './pages/Login';
import PaginaRutinas from './pages/PaginaRutinas';
import PaginaRutinaId from './pages/PaginaRutinaId';
import RutaProtegida from './components/RutaProtegida';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaFormulario />} />
        <Route path="/dashboard" element={<RutaProtegida element={<Dashboard />} />} />
        <Route path="/tareas" element={<RutaProtegida element={<Tareas />} />} />
        {/* <Route path="/registrar" element={<CrearCliente />} /> */}
        <Route path="/detalles/:id" element={<RutaProtegida element={<ClienteDetalles />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rutinas" element={<RutaProtegida element={<PaginaRutinas />} />} />
        <Route path="/rutina/:id" element={<RutaProtegida element={<PaginaRutinaId />} />} />
      </Routes>
    </Router>
  );
}
