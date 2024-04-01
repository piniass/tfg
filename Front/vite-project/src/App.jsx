import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa tus componentes
import PaginaFormulario from './pages/PaginaFormulario';
import Dashboard from './pages/Dashboard';
import Tareas from './pages/Tareas';
import CrearCliente from './pages/CrearCliente';
export default function App() {
  return (
      <Router>
          <Routes>
              {/* Define tus rutas */}
              <Route path="/" element={<PaginaFormulario />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tareas" element={<Tareas/>} />
              <Route path="/registrar" element={<CrearCliente/>} />

          </Routes>
      </Router>
  );
}