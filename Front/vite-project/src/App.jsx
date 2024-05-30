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
export default function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<PaginaFormulario />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tareas" element={<Tareas/>} />
              {/* <Route path="/registrar" element={<CrearCliente/>} /> */}
              <Route path="/detalles" element={<ClienteDetalles/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/rutinas" element={<PaginaRutinas/>} />
              <Route path="/rutina/:id" element={<PaginaRutinaId/>} />
          </Routes>
      </Router>
  );
}