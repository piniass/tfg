import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import AvataresContainer from './AvataresContainer';
import CloseIcon from '../svgs/CloseIcon';
import useValidaciones from '../hooks/HooksValidaciones';

export default function FormularioCrearCliente(props) {
  const id = sessionStorage.getItem('id');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellidos] = useState('');
  const [edad, setEdad] = useState('');
  const [altura, setAltura] = useState('');
  const [patologias, setPatologias] = useState(' ');
  const [avatarSeleccionado, setAvatarSeleccionado] = useState('');

  const { errores, validarCampo } = useValidaciones();
  const url = 'http://tfg-backend-piniass-projects.vercel.app/cliente';

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    console.log("foto: ",avatarSeleccionado)

    const esNombreValido = validarCampo('nombre', nombre);
    const esApellidoValido = validarCampo('apellido', apellido);
    const esEdadValido = validarCampo('edad', edad);
    const esAlturaValido = validarCampo('altura', altura);
    const esAvatarValido = validarCampo('avatar', avatarSeleccionado);

    if (!esNombreValido) {
      console.log(nombre)
      return alert("El nombre debe empezar por mayúscula y no contener ninguna más.");
  }
  
  if (!esApellidoValido) {
      alert('El apellido ha de empezar por mayuscula.');
      return;
  }
  
  if (!esEdadValido) {
      alert('La edad no puede ser negativa ni superior a 100');
      return;
  }
  
  if (!esAlturaValido) {
      alert('La altura no puede ser superior a 273 o negativa');
      return;
  }
  
  if (!esAvatarValido) {
      alert('Por favor, selecciona un avatar.');
      return;
  }


    try {
      const data = {
        nombre,
        apellido,
        edad,
        altura,
        patologias,
        avatar: avatarSeleccionado,
        id_entrenador: id,
      };

      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url,
      };

      const res = await axios(options);
      console.log(res.data);
      props.getClientes();
      props.setForm(false);

    } catch (error) {
      console.log("Errores:", error.response.data.detail);
    }
  };

  const sacarImagen = (src) => {
    // const recortado = src.substring(13);
    setAvatarSeleccionado(src);
  };

  const handleClose = () => {
    props.setForm(false);
  };

  return (
    <section className='w-[450px] border-2 p-2 bg-white flex flex-col absolute top-11 right-0 left-0 ml-auto mr-auto'>
      <button className='bg-transparent self-end' onClick={handleClose}>
        <CloseIcon />
      </button>
      <h2 className='text-xl p-2 pt-0 pb-0 text-center'>Crear Cliente</h2>
      <form className='flex flex-col p-4 gap-4 w-full' onSubmit={handleSubmit}>
        <input
          className='p-2 border-solid border-2 rounded-lg'
          type="text"
          name="nombre"
          id="nombre"
          placeholder='Nombre'
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        {errores.nombre && <span className="error">{errores.nombre}</span>}
        <input
          className='p-2 border-solid border-2 rounded-lg'
          type="text"
          name="apellidos"
          id="apellidos"
          placeholder='Apellidos'
          value={apellido}
          onChange={(e) => setApellidos(e.target.value)}
        />
        {errores.apellido && <span className="error">{errores.apellido}</span>}
        <input
          className='p-2 border-solid border-2 rounded-lg'
          type="number"
          name="edad"
          id="edad"
          placeholder='Edad'
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
        />
        {errores.edad && <span className="error">{errores.edad}</span>}
        <input
          className='p-2 border-solid border-2 rounded-lg'
          type="number"
          step="0.01"
          name="altura"
          id="altura"
          placeholder='Altura'
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
        />
        {errores.altura && <span className="error">{errores.altura}</span>}
        <textarea
          className='p-2 border-solid border-2 rounded-lg resize-none'
          name="patologias"
          id="patologias"
          placeholder='Introduce las posibles patologias'
          value={patologias}
          onChange={(e) => setPatologias(e.target.value === '' ? ' ' : e.target.value)}
        ></textarea>
        {errores.patologia && <span className="error">{errores.patologia}</span>}
        <fieldset className='border-2 border-solid overflow-auto h-64'>
          <legend className='text-xl text-center'>Elige un avatar</legend>
          <AvataresContainer sacarImagen={sacarImagen} />
        </fieldset>
        {errores.avatar && <span className="error">{errores.avatar}</span>}
        <input
          className='p-2 rounded-lg bg-green-500 text-white cursor-pointer hover:bg-green-700'
          type="submit"
          value="Enviar"
        />
      </form>
    </section>
  );
}
