import React, { useState } from 'react'
import FormularioPeso from './FormularioPeso'
import FormularioEditarPeso from './FormularioEditarPeso'
import GraficaPeso from './GraficaPeso'
import usePeso from '../hooks/HookPeso'
import { useEffect } from 'react'
import TablaPeso from './TablaPeso'

export default function PesoContainer(props) {
    const id = props.state.id
    const {peso, getPeso, actualizarPeso} = usePeso(id)
    const [pesoNuevo, setNuevo] = useState()

    const [pesoQt, setPesoQt] = useState(3)
    const [currentPage, setCurrentPage] = useState(1)


    const indexFin = currentPage * pesoQt
    const indexIni = indexFin - pesoQt

    const nPeso = peso.slice(indexIni,indexFin)
    const nPage = Math.ceil(peso.length / pesoQt)

    useEffect(() => {
        if (id) {
            getPeso(); // Llamar a getPeso solo si id es válido
        }
    }, [id]);

  return (
    <div className='flex flex-col border-2 items-center justify-around p-2 w-full'>
        <div className='grid grid-cols-1 md:grid-cols-2 w-full'>
          <FormularioPeso state={props.state} peso={peso}  actualizarPeso={actualizarPeso} />
          <FormularioEditarPeso state={props.state} peso={peso}  actualizarPeso={actualizarPeso} pesoNuevo={pesoNuevo}/>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 w-full'>
          <TablaPeso nPeso={nPeso} setNuevo={setNuevo} setCurrentPage={setCurrentPage} currentPage={currentPage} nPage={nPage}/>
          <GraficaPeso peso={peso} />
        </div>
    </div>
  )
}
