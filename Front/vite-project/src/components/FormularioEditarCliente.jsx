import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import AvataresContainer from './AvataresContainer';
import CloseIcon from '../svgs/CloseIcon';

export default function FormularioEditarCliente(props) {
    const [nombre, setNombre] = useState('');
  const [apellido, setApellidos] = useState('');
  const [edad, setEdad] = useState('');
  const [altura, setAltura] = useState('');
  const [patologias, setPatologias] = useState(' ');
  const [avatarSeleccionado, setAvatarSeleccionado] = useState('');

  console.log("Props edit:", props)

  const url = `http://127.0.0.1:8000/cliente/${props.cliente.id}`;
  
  const handleSubmit = async (ev) => {
    ev.preventDefault();
  
    try {
      const data = {
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        altura: altura,
        patologias: patologias,
        avatar: avatarSeleccionado,
      };
  

      console.log("data:",data)

      const options = {
        method: 'PUT',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url,
      };
      
      const res = await axios(options);
      console.log(res.data);
      props.getClientes();
      props.setEdit(false);
  
    } catch(error) {
      console.log("Errores:",error.response.data.detail);

    }
  }

  const sacarImagen = (src) => {
    const recortado = src.substring(13);

    setAvatarSeleccionado(recortado);
  };

  const handleClose = () => {
    props.setEdit(false)
  }

  console.log("Sacar imagen: ",avatarSeleccionado)
  return (
    <section className='w-[450px] border-2 p-2 bg-white flex flex-col absolute top-11 right-0 left-0 ml-auto mr-auto'>
      
      
      <button className='bg-transparent self-end' onClick={handleClose}>
        <CloseIcon/>
      </button>
      <h2 className='text-xl p-2 pt-0 pb-0 text-center'>Editar Cliente</h2>

      
      <form className='flex flex-col p-4 gap-4 w-full'>
        <input className='p-2 border-solid border-2 rounded-lg' type="text" name="nombre" id="nombre" placeholder='Nombre' onChange={(e) => setNombre(e.target.value)}/>
        <input className='p-2 border-solid border-2 rounded-lg' type="text" name="apellidos" id="apellidos" placeholder='Apellidos' onChange={(e) => setApellidos(e.target.value)}/>
        <input className='p-2 border-solid border-2 rounded-lg' type="number" name="edad" id="edad" placeholder='Edad' onChange={(e) => setEdad(e.target.value)}/>
        <input className='p-2 border-solid border-2 rounded-lg' type="number" step="0.01" name="altura" id="altura" placeholder='Altura' onChange={(e) => setAltura(e.target.value)}/>
        <textarea className='p-2 border-solid border-2 rounded-lg resize-none' name="patologias" id="patologias" placeholder='Introduce las posibles patologias' onChange={(e) => e.target.value === '' ? setPatologias(' ') : setPatologias(e.target.value)}></textarea>
        <fieldset className='border-2 border-solid overflow-auto h-64'>
          <legend className='text-xl text-center'>Elige un avatar</legend>
          <AvataresContainer sacarImagen={sacarImagen} />
        </fieldset>
        <input className='p-2 rounded-lg bg-green-500 text-white cursor-pointer hover:bg-green-700' type="button" value="Enviar" onClick={handleSubmit}/>
      </form>
    </section>
    
  )
}
