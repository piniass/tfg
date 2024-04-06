import React from 'react'
import Aside from '../components/Aside'
import { useLocation } from 'react-router-dom';
import DetallesContainer from '../components/DetallesContainer';

export default function ClienteDetalles(props) {
    var id = sessionStorage.getItem("id");
    const { state } = useLocation(); // Obtener el estado de la ubicación
    // console.log(state); // Verificar que recibes los datos correctamente

   
  return (
    <div className='flex'>
      <Aside id={id}/>
      <DetallesContainer state={state} className="flex flex-col"/>
    </div>
  )
}
