import React from 'react';
import Add from '../svgs/Add';
import DeleteIcon from '../svgs/Delete';
import Edit from '../svgs/Edit';

export default function EntrenamientoCard(props) {
    const handleEliminarEntrenamiento = async () => {
        await props.handleEliminar(props.sesion.id); // Asegúrate de que handleEliminar sea una función asíncrona si es necesario.
        props.getEntrenamiento(); // Actualizar la lista de entrenamientos
        props.getEjercicios(); // Actualizar la tabla de ejercicios
        props.handleCloseEjercicios()
    };

    const handleDetails = () => {
        props.setObj(props.sesion);
        props.handleShowFormEjercicio(true);
    };

    const handleEdit = () => {
        props.handleEditEntrenamiento(props.sesion);
    };

    return (
        <div className='p-4 flex flex-col justify-center items-center border rounded-md gap-2'>
            <h4 className='text-xl'>{props.sesion.dia_semana}</h4>
            <p>{props.sesion.nombre}</p>
            <div className='flex flex-col gap-2'>
                <button onClick={handleEdit}>Editar Entrenamiento</button>
                <button onClick={handleDetails}>Añadir Ejercicio</button>
                <button onClick={handleEliminarEntrenamiento}>Eliminar Entrenamiento</button>
            </div>
        </div>
    );
}
