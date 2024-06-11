import React from 'react'
import Edit from '../svgs/Edit';
import DeleteIcon from '../svgs/Delete';
import Add from '../svgs/Add';
import { useNavigate } from 'react-router-dom';


export default function RutinasCard(props) {
    // const foto = props.rutina.foto
    const { id, nombre, foto } = props.rutina;
    
    const ruta = + foto;
    const navigate = useNavigate()

    const handleEliminar = () => {
        props.handleEliminar(id)
    }

    const handleEdit = () => {
        navigate(`/rutina/${id}`, { state: props.rutina })
    }

    const handleAdd = () => {
        props.setRutinaId(id)
        props.setModal(true)
        // console.log("id rutina: ",id)
    }

    return (
    <div className='border'>
        <img src={ruta} alt={nombre} className=''/>
        <h4 className='text-xl p-2 text-center'>{nombre}</h4>
        <div className='flex items-center justify-around p-2'>
        <button onClick={handleEdit}>Ver Detalles</button>
        </div>
      <div className='flex items-center justify-around p-2'>
        <button onClick={props.handleEdit} className='hover:border-yellow-400'><Edit /></button> {/* Botón de editar */}
            <button onClick={handleEliminar} className='hover:border-red-500'><DeleteIcon/></button>
            <button onClick={handleAdd} className='hover:border-green-500'><Add/></button>
        </div>
    </div>
  )
}
