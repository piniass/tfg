import React from 'react'
import axios from 'axios';
import qs from 'qs';
import { useState } from 'react';

export default function FormularioPeso(props) {
    const [peso, setPeso] = useState('')
    const [id, setId] = useState(props.state.id)
    // console.log(props.state.id)
    const url = `http://127.0.0.1:8000/pesos/cliente`;

    const handleSubmitCrear = async(ev) => {
        ev.preventDefault()
        try {
            const data = {
                id_cliente: id,
                peso: peso
            };
      
            const options = {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              data: qs.stringify(data),
              url: url,
            };
      
            const res = await axios(options);
            console.log(res.data);
            // window.location.reload()
            props.actualizarPeso()
          } catch (error) {
            console.error('Error al crear tarea:', error);
          }
    }
  return (
    <form onSubmit={handleSubmitCrear} className='flex flex-col gap-2 p-2 w-full'>
      <h2 className='text-2xl'>Añadir peso</h2>
            <div className='flex w-full gap-2'>
              <input type="number" step="0.01" name="peso" placeholder='Introduce el peso' className='border-2 p-2 rounded-lg w-full' onChange={(event) => setPeso(event.target.value)}/>
              <input type='submit' value="Enviar" className='p-2 rounded-lg bg-green-500 text-white cursor-pointer hover:bg-green-700'/>
            </div>
            
    </form>
  )
}
