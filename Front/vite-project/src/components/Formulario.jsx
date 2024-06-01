import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';


export default function Formulario() {


  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [datosRecibidos, setDatosRecibidos] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const login = () => {
    navigate("/login");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Realizar la petición POST a la API
      const url = 'http://127.0.0.1:8000/entrenador/login';
      const data = {
        correo: correo,
        password: contrasenia
      };

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url: url,
      };

      const res = await axios(options);

      if (res.data.token) {
        const tiempo = 1800;
        const expTime = new Date(new Date().getTime() + (tiempo * 1000));

        // Establecer la cookie
        document.cookie = `token=${res.data.token}; expires=${expTime.toUTCString()}; path=/`;
        console.log(res.data.entrenador);
        sessionStorage.setItem("id", res.data.entrenador.id);
        sessionStorage.setItem("nombre", res.data.entrenador.nombre);
        sessionStorage.setItem("apellido", res.data.entrenador.apellido);
        sessionStorage.setItem("foto", res.data.entrenador.avatar);

        // Redirigir a otra página
        navigate("/dashboard");
      }else{
        alert(res.data)
      }
      setDatosRecibidos(res.data);
    } catch (error) {
      // Manejar errores de la petición
      setError(error);
    }
  };

  // Efecto para imprimir el userId cuando cambia

  return (
    <section className='p-8'>
      <form onSubmit={handleSubmit} className='border-2 w-80 flex flex-col p-8 gap-4 '>
        <h2 className='text-center text-2xl text-white'>Iniciar Sesion</h2>

        <label className='text-white' htmlFor='correo'>Introduce tu correo</label>
        <input 
          className='p-2'
          type="text" 
          placeholder="Correo electronico"
          id="correo"
          name='email'
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <label htmlFor='contrasenia' className='text-white'>Contraseña</label>
        <input 
          className='p-2'
          type="password" 
          placeholder="Contraseña"
          id="contrasenia"
          onChange={(e) => setContrasenia(e.target.value)}
          value={contrasenia} 
        />
        <input 
          type="submit" 
          value="Iniciar Sesion"
          className='rounded cursor-pointer bg-green-600 p-2 text-white'
        />
        <input
          type='button'
          value='Registrarse'
          className='rounded cursor-pointer bg-blue-600 p-2 text-white'
          onClick={login}
        />
      </form>
    </section>
  );
}
