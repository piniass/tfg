import React, { useState } from 'react'
import axios from 'axios'
import qs from 'qs'
import useValidaciones from '../hooks/HooksValidaciones';

export default function FormularioEditarPeso(props) {
    const [peso, setPeso] = useState('')
    const id = props.state.id
    const url = `http://tfg-backend-piniass-projects.vercel.app/pesos/${props.pesoNuevo?.id || ''}`;
    const { errores, validarCampo } = useValidaciones();

    const handleCancelar = () => {
        props.setNuevo('');
    }

    const handleSubmitEditar = async (ev) => {
        ev.preventDefault()
        try {
            const pesoValido = validarCampo('peso', peso);
          if (!pesoValido) {
              return alert("El peso tiene que ser entre 0 y 150");
          }
            const data = {
                id: props.pesoNuevo.id,
                peso: peso
            };

            const options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: qs.stringify(data),
                url: url,
            };

            const res = await axios(options);
            console.log(res.data);
            props.actualizarPeso()
        } catch (error) {
            console.error('Error al editar peso:', error);
        }
    }

    return (
        <form onSubmit={handleSubmitEditar} className='flex flex-col gap-2 p-2 w-full'>
            <h2 className='text-2xl'>Editar peso</h2>
            <div className='flex gap-5 w-full'>
            {
                props.pesoNuevo ? <input type="number" step="0.01" autoFocus name="peso" placeholder={props.pesoNuevo.peso + "kg"} className='w-full border-2 p-2 rounded-lg' onChange={(event) => setPeso(event.target.value)} />
                    : <input type="number" step="0.01" name="peso" disabled placeholder='Haz click sobre editar peso' className='w-full border-2 p-2 rounded-lg' onChange={(event) => setPeso(event.target.value)} />

            }
            {
                props.pesoNuevo ? 
                    <div className='flex items-center justify-center gap-2 text-center'>
                        <input type='submit' value="Enviar" className='p-2 rounded-lg bg-green-500 text-white cursor-pointer hover:bg-green-700' />
                        <button onClick={handleCancelar} className='p-2 rounded-lg bg-red-500 text-white cursor-pointer hover:bg-red-700'>Cancelar</button>
                    </div>
                    :<input type='submit' value="Enviar" disabled className='cursor-not-allowed p-2 rounded-lg bg-slate-400 text-white ' />                    
                    
            }
            </div>
        </form>
    )
}
