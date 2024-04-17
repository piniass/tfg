import React, { useState } from 'react'
import axios from 'axios'
import qs from 'qs'

export default function FormularioEditarPeso(props) {
    const [peso, setPeso] = useState('')
    const id = props.state.id

    console.log("Editar",props.pesoNuevo)

    const handleSubmitEditar = async (ev) => {
        ev.preventDefault()
        try {
            const data = {
                id_cliente: id,
                peso: peso
            };

            const options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: qs.stringify(data),
                url: url, // No olvides definir esta variable url
            };

            const res = await axios(options);
            console.log(res.data);
            // window.location.reload()
            props.actualizarPeso()
        } catch (error) {
            console.error('Error al editar peso:', error);
        }
    }

    return (
        <form onSubmit={handleSubmitEditar} className='flex flex-col gap-2 p-2 w-full'>
            <h2 className='text-2xl'>Editar peso</h2>
            {
                props.pesoNuevo ? <input type="number" step="0.01" name="peso" placeholder={props.pesoNuevo.peso + "kg"} className='w-full border-2 p-2 rounded-lg' onChange={(event) => setPeso(event.target.value)} />
                    : <input type="number" step="0.01" name="peso" disabled placeholder='Introduce el peso' className='border-2 p-2 rounded-lg' onChange={(event) => setPeso(event.target.value)} />

            }
            {
                props.pesoNuevo ? <input type='submit' value="Enviar" className='p-2 rounded-lg bg-green-500 text-white cursor-pointer hover:bg-green-700' />
                    : <input type='submit' value="No puedes enviar" disabled className='p-2 rounded-lg bg-slate-400 text-white ' />

            }
        </form>
    )
}
