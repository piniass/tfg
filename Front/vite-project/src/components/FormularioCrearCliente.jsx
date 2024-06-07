import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import AvataresContainer from './AvataresContainer';
import CloseIcon from '../svgs/CloseIcon';
import useValidaciones from '../hooks/HooksValidaciones';
import useHasheo from '../hooks/HookHasheo';

export default function FormularioCrearCliente(props) {
  const {decryptData } = useHasheo();
  const id = decryptData(sessionStorage.getItem("id"));
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    edad: '',
    altura: '',
    patologias: ' ',
    avatar: ''
  });
  const [validation, setValidation] = useState({
    nombre: true,
    apellido: true,
    edad: true,
    altura: true,
    avatar: true
  });

  const { errores, validarCampo } = useValidaciones();
  const url = 'http://127.0.0.1:8000/cliente';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const campos = ['nombre', 'apellido', 'edad', 'altura', 'avatar'];
    const nuevoEstadoValidacion = {};

    campos.forEach((campo) => {
      nuevoEstadoValidacion[campo] = validarCampo(campo, formData[campo]);
    });

    setValidation(nuevoEstadoValidacion);

    if (Object.values(nuevoEstadoValidacion).every(Boolean)) {
      try {
        const data = {
          ...formData,
          id_entrenador: id
        };
        console.log(data)

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
    }
  };

  const sacarImagen = (src) => {
    const recortado = src.substring(13);
    console.log(recortado)
    setFormData({
      ...formData,
      avatar: recortado
    });
  };

  const handleClose = () => {
    props.setForm(false);
  };

  return (
    <section className='w-[450px] border-2 p-2 bg-white flex flex-col absolute top-11 right-0 left-0 ml-auto mr-auto overflow-auto'>
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
          value={formData.nombre}
          onChange={handleChange}
        />
        {!validation.nombre && <p className='bg-red-500 text-white p-1 rounded-md'>El nombre debe empezar por mayúscula y no contener ninguna más.</p>}
        <input
          className='p-2 border-solid border-2 rounded-lg'
          type="text"
          name="apellido"
          id="apellido"
          placeholder='Apellidos'
          value={formData.apellido}
          onChange={handleChange}
        />
        {!validation.apellido && <p className='bg-red-500 text-white p-1 rounded-md'>El apellido debe empezar por mayúscula.</p>}

        <input
          className='p-2 border-solid border-2 rounded-lg'
          type="number"
          name="edad"
          id="edad"
          placeholder='Edad'
          value={formData.edad}
          onChange={handleChange}
        />
        {!validation.edad && <p className='bg-red-500 text-white p-1 rounded-md'>La edad no puede ser negativa ni superior a 100.</p>}

        <input
          className='p-2 border-solid border-2 rounded-lg'
          type="number"
          step="0.01"
          name="altura"
          id="altura"
          placeholder='Altura'
          value={formData.altura}
          onChange={handleChange}
        />
        {!validation.altura && <p className='bg-red-500 text-white p-1 rounded-md'>La altura no puede ser superior a 273 o negativa.</p>}

        <textarea
          className='p-2 border-solid border-2 rounded-lg resize-none'
          name="patologias"
          id="patologias"
          placeholder='Introduce las posibles patologias'
          value={formData.patologias}
          onChange={handleChange}
        ></textarea>
        <fieldset className='border-2 border-solid overflow-auto h-64'>
          <legend className='text-xl text-center'>Elige un avatar</legend>
          <AvataresContainer sacarImagen={sacarImagen} />

        </fieldset>
        {!validation.avatar&& <p className='bg-red-500 text-white p-1 rounded-md'>Por favor, selecciona un avatar.</p>}

        <input
          className='p-2 rounded-lg bg-green-500 text-white cursor-pointer hover:bg-green-700'
          type="submit"
          value="Enviar"
        />
      </form>
    </section>
  );
}
