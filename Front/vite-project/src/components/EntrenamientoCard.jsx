import React from 'react'
import Add from '../svgs/Add'
import DeleteIcon from '../svgs/Delete'
import Edit from '../svgs/Edit';


export default function EntrenamientoCard(props) {
    const handleEliminarEntrenamiento = () => {
        props.handleEliminar(props.sesion.id)
    }

    const handleDetails = () => {
        props.setObj(props.sesion)
        
    }
    const handleEdit = () => {
        props.handleEditForm(props.sesion); 
    };
    return (
        <div className='p-4 flex flex-col justify-center items-center border rounded-md gap-2 h-52 w-52'>
            <h4 className='text-xl'>{props.sesion.dia_semana}</h4>
            <p>{props.sesion.nombre}</p>
            <div className='flex gap-2'>
                <button onClick={handleEdit}><Edit /></button>
                <button onClick={handleDetails}> <Add /> </button>              
                <button onClick={handleEliminarEntrenamiento}> <DeleteIcon /> </button>
            </div>
        </div>
    )
}
