// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAutenticacion } from '../hooks/HookAutenticacion';

const RutaProtegida = ({ element }) => {
  const autenticado = useAutenticacion();

  if (!autenticado) {
    return <Navigate to="/" />;
  }

  return element;
};

export default RutaProtegida;
