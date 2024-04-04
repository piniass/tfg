import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

export default function FormulariosTareas(props) {
  const { id } = props;
  const [tareaNueva, setTareaNueva] = useState('');
  const url = 'http://127.0.0.1:8000/tareas';
  const navigate = useNavigate();

 
  const handleSubmitCrear = async (event) => {
    event.preventDefault();
    try {
      const data = {
        tarea: tareaNueva,
        id_entrenador: id
      };

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url: url,
      };

      const res = await axios(options);
      console.log(res.data);

    } catch (error) {
      console.error('Error al crear tarea:', error);
    }
  };

  return (
    <div className='p-4 flex flex-col w-2/4'>
      <form className='bg-yellow-400 flex flex-col p-2 mb-2 h-1/2 hover:bg-yellow-500'>
        <textarea className='p-2 border-solid border-2 rounded-lg resize-none' name="tareaNueva" id="tareaNueva" placeholder='Introduce las posibles patologias' onChange={(e) => e.target.value !== '' ? setTareaNueva(e.target.value):null}></textarea>
        <input className='p-2 rounded-lg bg-green-500 text-white cursor-pointer hover:bg-green-700' type="button" value="Enviar" onClick={handleSubmitCrear}/>
      </form>
    </div>
  );
}
