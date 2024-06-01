import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAutenticacion() {
  const [autenticado, setAutenticado] = useState(() => {
    const token = getCookie('token');
    console.log(token);
    return !!token; // Convierte el token en un valor booleano
  });


  return autenticado;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}
