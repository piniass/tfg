import React from 'react'
import FormularioPeso from './FormularioPeso'
import GraficaPeso from './GraficaPeso'
export default function PesoContainer(props) {
  return (
    <div className='flex flex-col md:flex-row border-2 items-center justify-between p-2 w-full'>
        <FormularioPeso state={props.state}/>
        <GraficaPeso />
    </div>
  )
}
