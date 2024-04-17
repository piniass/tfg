import React from 'react'

export default function TablaPeso(props) {
  const {nPeso, setNuevo, nPage, currentPage, setCurrentPage} = props
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

  return (
    <><div className='flex flex-col'>

    <table className='table-auto border-collapse table rounded-md w-full'>
        <thead className=''>
          <tr>
            <th>Peso</th>
            <th>Fecha</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody className=''>
        {nPeso.map(item => (
            <tr key={item.id} className='border-b text-center'>
              <th scope="row" className='p-2'>{item.peso} kg</th>
              <td className='p-2'>{item.fecha.substr(0,10)}</td>
              <td className='p-2'>
                <button onClick={() => handleEditar(item)}>Editar</button>
              </td>
              <td className='p-2'>
                <button onClick={() => handleEliminar(item.id)}>Eliminar</button>
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
