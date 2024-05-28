import React, { useState } from 'react'
import InfoDetalles from './InfoDetalles'
import PesoContainer from './PesoContainer'
import EjerciciosContainer from './EjerciciosContainer'

export default function DetallesContainer(props) {
  return (
    <section className='flex flex-col p-3 md:p-5 w-4/5 gap-2 h-screen overflow-auto'>
        <InfoDetalles state={props.state}/>
        <PesoContainer state={props.state}/>
        <EjerciciosContainer state={props.state}/>
    </section>
  )
}
