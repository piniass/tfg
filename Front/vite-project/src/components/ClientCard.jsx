import React, { useState, useEffect } from 'react';
import Edit from '../svgs/Edit';
import DeleteIcon from '../svgs/Delete';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function ClientCard(props) {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('')
    const navigate = useNavigate(); 

    useEffect(() => {
        if (props.cliente) {
            setNombre(props.cliente.nombre);
            setApellido(props.cliente.apellido);
        }
    }, [props.cliente]);

    const borrarCliente = () => {
        axios.delete(`http://127.0.0.1:8000/cliente/${props.cliente.id}`)
        .then(response => {
            console.log(`Cliente eliminado`);
            props.actualizarClientes();
          })
          .catch(error => {
            console.error(error);
          });
    }

    const verDetalles = () => {
        navigate(`/detalles/`, { state: props.cliente });
    }
 
    return (
        <div className='border-solid border-2 rounded-lg p-2 flex flex-col justify-center items-center gap-2 hover:shadow-md'>
            <div className='h-20 w-20 bg-cyan-400 rounded-full'></div>
            <p className='text-xl'>{nombre} {apellido}</p>
            <div className='flex flex-col items-center justify-center gap-2'>
            <button className='px-10 py-1' onClick={verDetalles}>Ver detalles</button>
            {/* <button className=''>Ver detalles</button> */}
            <div className='flex text-black justify-between w-full'>
                <button className="px-6 py-2"><Edit/></button>
                <button className="px-6 py-2" onClick={borrarCliente}><DeleteIcon/></button>
            </div>
            </div>
            
        </div>
    );
}
