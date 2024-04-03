import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

export default function FormularioCrearCliente(props) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellidos] = useState('');
  const [edad, setEdad] = useState('');
  const [altura, setAltura] = useState('');
  const [patologias, setPatologias] = useState(' ');
  const url = 'http://127.0.0.1:8000/cliente';
  const navigate = useNavigate()
  
  const handleSubmit = async (ev) => {
    ev.preventDefault();
  
    try {
      const data = {
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        altura: altura,
        patologias: patologias,
        id_entrenador: 1
      };
  
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url,
      };
      
      const res = await axios(options);
      console.log(res.data);

      navigate('/dashboard')
  
    } catch(error) {
      console.log(error.response);
    }
  }
  
  return (
    <form className='flex flex-col p-4 bg-slate-400 gap-4'>
      <input className='p-2' type="text" name="nombre" id="nombre" placeholder='Nombre' onChange={(e) => setNombre(e.target.value)}/>
      <input className='p-2' type="text" name="apellidos" id="apellidos" placeholder='Apellidos' onChange={(e) => setApellidos(e.target.value)}/>
      <input className='p-2' type="number" name="edad" id="edad" placeholder='Edad' onChange={(e) => setEdad(e.target.value)}/>
      <input className='p-2' type="number" step="0.01" name="altura" id="altura" placeholder='Altura' onChange={(e) => setAltura(e.target.value)}/>
      <textarea className='p-2' name="patologias" id="patologias" placeholder='Introduce las posibles patologias' onChange={(e) => e.target.value === '' ? setPatologias(' ') : setPatologias(e.target.value)}></textarea>
      <input className='p-2' type="button" value="Enviar" onClick={handleSubmit}/>
    </form>
  );
}