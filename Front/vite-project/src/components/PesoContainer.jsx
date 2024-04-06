import React from 'react'
import FormularioPeso from './FormularioPeso'
import GraficaPeso from './GraficaPeso'
import usePeso from '../hooks/HookPeso'
import { useEffect } from 'react'

export default function PesoContainer(props) {
    const id = props.state.id
    const {peso, getPeso, actualizarPeso} = usePeso(id)

    useEffect(() => {
        if (id) {
            getPeso(); // Llamar a getPeso solo si id es válido
        }
    }, [id]);

    console.log(peso)

  return (
    <div className='flex flex-col md:flex-row border-2 items-center justify-around p-2 w-full'>
        <FormularioPeso state={props.state} peso={peso}  actualizarPeso={actualizarPeso}/>
        <GraficaPeso peso={peso}/>
    </div>
  )
}
