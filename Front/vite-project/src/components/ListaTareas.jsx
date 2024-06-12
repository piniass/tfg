import React, { useState, useEffect } from 'react';
import FormulariosTareas from './FormulariosTareas';
import FormularioEditarTarea from './FormularioEditarTarea';
import DeleteIcon from '../svgs/Delete';
import Edit from '../svgs/Edit';
import TickIcon from '../svgs/TickIcon';
import CloseIcon from '../svgs/CloseIcon';
import axios from 'axios';

export default function ListaDeTareas(props) {
  const { id,tareas, handleEliminar, actualizarTareas, handleConfirmar} = props; // Recibiendo la función como prop
  const [taskForm, setEstadoForm] = useState(false)
  const [taskFormEdit, setEstadoFormEdit] = useState(false)
  const [tareaEdit, setTareaEdit] = useState(null);

  //const { getTareas, /*,*/ } = useTarea({ id }); //cambiar porque ya no se va a usar


  const mostrarForm = () => {
    if(!taskForm){
      setEstadoForm(true)
    } else {
      setEstadoForm(false)
    }
  }
  const mostrarFormEditar = (tarea) =>{
    if(!taskFormEdit){
      setTareaEdit(tarea);
      setEstadoFormEdit(true)
    } else {
      setEstadoFormEdit(false)
    }
  }

  
  return (
    <>
    <div className='p-2 flex'>
      <h2 className="text-xl p-4 pb-0 font-semibold mb-4">Lista de Tareas</h2>
      <button className='bg-blue-600 text-white' onClick={mostrarForm}>Crear Tarea</button>
    </div>
    {
      taskForm && <FormulariosTareas actualizarTareas={actualizarTareas} setEstadoForm={setEstadoForm}/>
    }
      
      <div className="h-full p-4 overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-auto grid-flow-row-dense">
          {tareas.map(tarea => (
            <div key={tarea.id} className="border-2 p-4 rounded-md flex items-center justify-between "> {/* Agregué la clase flex y items-center */}
              <div className='overflow-auto'>
              <p className={`text-lg font-semibold mb-2 flex-1 flex-wrap  ${tarea.confirmado ? 'line-through' : ''}`}>{tarea.tarea}</p> {/* Agregué la clase flex-1 */}
              <p className='text-lg font-semibold mb-2 flex-1'>Fecha de creacion: <br/>{tarea.fecha_creacion.substr(0,10)}</p>
              </div>
              <div className="flex items-center ms-auto flex-col md:flex-row gap-2"> {/* Mantuve esta clase flex para los botones */}
                {
                  tarea.confirmado === true ? (<button className=" text-black font-bold py-2 px-4 rounded mr-2" onClick={() => handleConfirmar(tarea.id,tareas)}><CloseIcon/></button>) :
                  <button className=" text-black font-bold py-2 px-4 rounded hover:border-green-500" onClick={() => handleConfirmar(tarea.id,tareas)}><TickIcon/></button>
                }  
                {
                  taskFormEdit && <FormularioEditarTarea actualizarTareas={actualizarTareas} setEstadoForm={setEstadoFormEdit} tarea={tareaEdit}/>
                }         
                <button className=" text-black font-bold py-2 px-4 rounded hover:border-yellow-400" onClick={() => mostrarFormEditar(tarea)}><Edit/></button>
                <button className=" text-black font-bold py-2 px-4 rounded hover:border-red-500" onClick={() => handleEliminar(tarea.id)}><DeleteIcon/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>   
  );
}