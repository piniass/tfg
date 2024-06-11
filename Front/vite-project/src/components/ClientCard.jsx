import React, { useState, useEffect } from 'react';
import Edit from '../svgs/Edit';
import DeleteIcon from '../svgs/Delete';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function ClientCard(props) {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('')
    const navigate = useNavigate(); 
    const ruta = props.cliente.avatar


    useEffect(() => {
        if (props.cliente) {
            setNombre(props.cliente.nombre);
            setApellido(props.cliente.apellido);
        }
    }, [props.cliente]);

    const borrarCliente = () => {
        // console.log(props.cliente.id)
        props.handleEliminar(props.cliente.id)
    }

    const verDetalles = () => {
        navigate(`/detalles/${props.cliente.id}`, { state: props.cliente });
    }
 
    const handleEdit = () => {
        props.setEdit(true)
        props.setSelectedClientId(props.cliente.id); // Pasar la ID del cliente al componente padre

    }

    return (
        <div className='border-solid border-2 rounded-lg p-2 flex flex-col justify-center items-center gap-2 hover:shadow-md'>
            <img 
                src={ruta}
                className='h-20 w-20 rounded-full'/>
            <p className='text-xl'>{nombre} {apellido}</p>
            <div className='flex flex-col items-center justify-center gap-2'>
            <button className='px-10 py-1' onClick={verDetalles}>Ver detalles</button>
            {/* <button className=''>Ver detalles</button> */}
            <div className='flex text-black justify-between w-full'>
                <button className="px-6 py-2" onClick={handleEdit}><Edit/></button>
                <button className="px-6 py-2" onClick={borrarCliente}><DeleteIcon/></button>
            </div>
            </div>
            
        </div>
    );
}
