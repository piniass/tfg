import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAutenticacion() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = getCookie('token');
    console.log(token);
    token  ? setIsAuthenticated(true) : setIsAuthenticated(true)
  },[]);
  useEffect(()=>{
    console.log('depsues del usefeect',isAuthenticated)
  },[])
  
  return isAuthenticated;
}


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }
