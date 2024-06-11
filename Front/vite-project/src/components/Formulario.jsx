import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import useHasheo from '../hooks/HookHasheo';
import Spinner from '../svgs/Spinner';


export default function Formulario() {


  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [datosRecibidos, setDatosRecibidos] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(false);
  const {  encryptData } = useHasheo();

  const login = () => {
    navigate("/login");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(correo != '' && contrasenia != ''){
      try {
        setLoading(true)
        // Realizar la petición POST a la API
        const url = 'https://tfg-backend-piniass-projects.vercel.app/entrenador/login';
        
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
        setLoading(false)
        if (res.data.token) {
          const tiempo = 1800;
          const expTime = new Date(new Date().getTime() + (tiempo * 1000));
  
          // Establecer la cookie
          document.cookie = `token=${res.data.token}; expires=${expTime.toUTCString()}; path=/`;
          const encryptedId = encryptData(res.data.entrenador.id.toString());
          const encryptedNombre = encryptData(res.data.entrenador.nombre);
          const encryptedApellido = encryptData(res.data.entrenador.apellido);
          const encryptedFoto = encryptData(res.data.entrenador.avatar);
      
          // Almacenar en sessionStorage
          sessionStorage.setItem("id", encryptedId);
          sessionStorage.setItem("nombre", encryptedNombre);
          sessionStorage.setItem("apellido", encryptedApellido);
          sessionStorage.setItem("foto", encryptedFoto);
          setError(null)
  
          // Redirigir a otra página
          navigate("/dashboard");
        }else{
          setError(res.data)
          // alert(res.data)
        }
        setDatosRecibidos(res.data);
      } catch (error) {
        // Manejar errores de la petición
        setError(error);
        console.log(error)
      }
    } else {
      setError('Rellena los campos vacios')
    }
   
  };

  // Efecto para imprimir el userId cuando cambia

  return (
    <section className=''>
      <form onSubmit={handleSubmit} className=' w-80 flex flex-col p-8 gap-4 '>
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
        { error && <p className='text-white'>{error}</p>}
        { loading ? <button 
          type="button" 
          disabled
          className='rounded flex items-center justify-center cursor-pointer bg-gray-300 p-2 text-white'
        ><Spinner/></button>
        :
        <input 
        type="submit" 
        value="Iniciar Sesion"
        className='rounded cursor-pointer bg-green-600 p-2 text-white'
      />
        }
        
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
