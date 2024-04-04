import React from 'react'
import Aside from '../components/Aside';
import FormulariosTareas from '../components/FormulariosTareas';
import ListaDeTareas from '../components/ListaTareas';
export default function Tareas() {
    var id = sessionStorage.getItem("id");
    console.log("idd")
    console.log(id)
  return (
    <div className='flex'>
      <Aside id={id}/>
      <main className='w-4/5 h-screen bg-blue-500 flex'>
        <FormulariosTareas id={id}/>
        <ListaDeTareas id={id}/>
      </main> 
    </div>
  )
}