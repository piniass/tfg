import React from 'react'
import Add from '../svgs/Add'
import DeleteIcon from '../svgs/Delete'

export default function EntrenamientoCard(props) {
    const handleEliminarEntrenamiento = () => {
        props.handleEliminar(props.sesion.id)
    }

    const handleDetails = () => {
        props.setObj(props.sesion)
        
    }
    return (
        <div className='p-4 flex flex-col justify-center items-center border rounded-md gap-2 h-52 w-52'>
            <h4 className='text-xl'>{props.sesion.dia_semana}</h4>
            <p>{props.sesion.nombre}</p>
            <div className='flex gap-2'>
                <button onClick={handleDetails}> <Add /> </button>
                <button onClick={handleEliminarEntrenamiento}> <DeleteIcon /> </button>
            </div>
        </div>
    )
}
