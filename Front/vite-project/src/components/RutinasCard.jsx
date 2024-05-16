import React from 'react'
import Edit from '../svgs/Edit';
import DeleteIcon from '../svgs/Delete';
import Add from '../svgs/Add';
import { useNavigate } from 'react-router-dom';


export default function RutinasCard(props) {
    // const foto = props.rutina.foto
    const { id, nombre, foto, fecha_creacion, id_entrenador } = props.rutina;
    // const ruta = '../../public/img-rutinas/'+foto
    const ruta = '/img-rutinas/'+foto

    const navigate = useNavigate()

    const handleEliminar = () => {
        props.handleEliminar(id)
    }

    const handleEdit = () => {
        navigate(`/rutina/${id}`, { state: props.rutina })
    }

    return (
    <div className='border'>
        <img src={ruta} alt={nombre} className=''/>
        <h4 className='text-xl p-2 text-center'>{nombre}</h4>
        <div className='flex items-center justify-around p-2'>
            <button onClick={handleEdit}><Edit/></button>
            <button onClick={handleEliminar}><DeleteIcon/></button>
            <button><Add/></button>
        </div>
    </div>
  )
}
