import React from 'react'

export default function TablaEjercicios(props) {
    console.log(props)
    const ejercicios = props.ejercicio
    console.log("ej: ",ejercicios)

    // const {id, nombre, grupo_muscular, series, repeticiones} = props.ejercicios;
  return (
    <section className='p-4'>
        <table className='table-auto border border-collapse table rounded-md w-full'>
            <thead className='border'>
                <tr>
                    <th className='p-2'>Nombre</th>
                    <th className='p-2'>Grupo Muscular</th>
                    <th className='p-2'>Series</th>
                    <th className='p-2'>Repeticiones</th>
                </tr>
            </thead>
            <tbody>
                    {ejercicios.map((ejercicio) => (
                        <tr key={ejercicio.id} className='border-b text-center'> {/* Agrega el atributo key aquí */}
                            <td className='p-2'>{ejercicio.nombre}</td>
                            <td className='p-2'>{ejercicio.grupo_muscular}</td>
                            <td className='p-2'>{ejercicio.series}</td>
                            <td className='p-2'>{ejercicio.repeticiones}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
    </section>
  )
}
