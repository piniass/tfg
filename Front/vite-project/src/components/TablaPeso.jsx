import React from 'react'
import Edit from '../svgs/Edit';
import DeleteIcon from '../svgs/Delete';

export default function TablaPeso(props) {
  const {nPeso, setNuevo, nPage, currentPage, setCurrentPage, handleEliminar} = props
  // console.log(peso)

  const next = () => {
    if(currentPage !== nPage) setCurrentPage(currentPage + 1)
  }

  const prev = () => {
    if(currentPage !== 1) setCurrentPage(currentPage - 1)
  }
  const handleEditar = (peso) => {
    setNuevo(peso)
  }

  const handleDelete = (id) => {
    handleEliminar(id)
  }

  return (
    <>
    <div className='flex flex-col'>

    <table className='table-auto border border-collapse table rounded-md w-full'>
        <thead className='border'>
          <tr>
            <th className='p-2'>Peso</th>
            <th className='p-2'>Fecha</th>
            <th className='p-2'>Editar</th>
            <th className='p-2'>Eliminar</th>
          </tr>
        </thead>
        <tbody className=''>
        {nPeso.map(item => (
            <tr key={item.id} className='border-b text-center'>
              <td scope="row" className='p-2'>{item.peso} kg</td>
              <td className='p-2'>{item.fecha.substr(0,10)}</td>
              <td className='p-2 '>
                <button className='md:hidden p-1' onClick={() => handleEditar(item)}><Edit/></button>
                <button className='hidden md:block w-full' onClick={() => handleEditar(item)}>Editar</button>
              </td>
              <td className='p-2'>
                <button className='md:hidden p-1' onClick={() => handleEliminar(item.id)}><DeleteIcon/></button>
                <button className='hidden md:block w-full' onClick={() => handleDelete(item.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex items-center justify-center my-2 gap-2'>
        <button onClick={prev} className='border-0 bg-blue-600 text-white hover:bg-blue-500'>Anterior</button>
        <h3> {currentPage} / {nPage}</h3>
        <button onClick={next} className='border-0 bg-blue-600 text-white hover:bg-blue-500'>Siguiente</button>

      </div>
    </div>
      
    </>
  )
}
