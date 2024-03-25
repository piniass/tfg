import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa tus componentes
import PaginaFormulario from './pages/PaginaFormulario';
import Dashboard from './pages/Dashboard';
export default function App() {
  return (
      <Router>
          <Routes>
              {/* Define tus rutas */}
              <Route path="/" element={<PaginaFormulario />} />
              <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
      </Router>
  );
}