import React from 'react'
import Edit from '../svgs/Edit';
import DeleteIcon from '../svgs/Delete';
import Add from '../svgs/Add';

export default function RutinasCard(props) {
    // const foto = props.rutina.foto
    const { id, nombre, foto, fecha_creacion, id_entrenador } = props.rutina;
    const ruta = '../../public/img-rutinas/'+foto

    return (
    <div className='border w-52 md:w-72'>
        <img src={ruta} alt={nombre} className=''/>
        <h4 className='text-xl p-2 text-center'>{nombre}</h4>
        <div className='flex items-center justify-around p-2'>
            <button><Edit/></button>
            <button><DeleteIcon/></button>
            <button><Add/></button>
        </div>
    </div>
  )
}
