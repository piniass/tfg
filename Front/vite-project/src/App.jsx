import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserProvider';

// Importa tus componentes
import PaginaFormulario from './pages/PaginaFormulario';
import Dashboard from './pages/Dashboard';
import Tareas from './pages/Tareas';
import CrearCliente from './pages/CrearCliente';
import ClienteDetalles from './pages/ClienteDetalles';
import Login from './pages/Login';
import PaginaRutinas from './pages/PaginaRutinas';

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Define tus rutas */}
          <Route path="/" element={<PaginaFormulario />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tareas" element={<Tareas />} />
          <Route path="/registrar" element={<CrearCliente />} />
          <Route path="/detalles" element={<ClienteDetalles />} />
          <Route path="/login" element={<Login />} />
          <Route path="/rutinas" element={<PaginaRutinas />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}
