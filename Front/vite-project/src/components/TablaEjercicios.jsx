import React from 'react';
import DeleteIcon from '../svgs/Delete';
import Edit from '../svgs/Edit';

export default function TablaEjercicios(props) {
  const { ejercicio, handleEliminar, handleEditEjercicio } = props;

  return (
    <section className='p-4'>
      <table className='table-auto border border-collapse table rounded-md w-full'>
        <thead className='border'>
          <tr>
            <th className='p-2'>Nombre</th>
            <th className='p-2'>Grupo Muscular</th>
            <th className='p-2'>Series</th>
            <th className='p-2'>Repeticiones</th>
            <th className='p-2'>Editar</th>
            <th className='p-2'>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {ejercicio.map((ej) => (
            <tr key={ej.id} className='border-b text-center'>
              <td className='p-2'>{ej.nombre}</td>
              <td className='p-2'>{ej.grupo_muscular}</td>
              <td className='p-2'>{ej.series}</td>
              <td className='p-2'>{ej.repeticiones}</td>
              <td className='p-2'>
                <button onClick={() => handleEditEjercicio(ej)}><Edit/></button>
              </td>
              <td className='p-2'>
                <button onClick={() => handleEliminar(ej.id)}><DeleteIcon/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
