import React from 'react'
import Aside from '../components/Aside';
import FormularioCrearCliente from '../components/FormularioCrearCliente';

export default function CrearCliente() {
    var id = sessionStorage.getItem("id");

  return (
    <div className='flex'>
      <Aside id={id}/>
      <FormularioCrearCliente id={id}/>
    </div>
  )
}