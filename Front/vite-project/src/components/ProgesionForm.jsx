import React from 'react'

export default function ProgesionForm(props) {

    const renderState = () => {
        const { nombre, apellido, correo, password, avatar } = props.user;
      
        if (!nombre && !apellido) {
          return (
            <>
              <div className='bg-purple-300 p-2 w-1/3 border'></div>
              <div className='p-2 w-1/3 border'></div>
              <div className='p-2 w-1/3 border'></div>
            </>
          );
        } else if (nombre && apellido && (!correo || !password)) {
          return (
            <>
              <div className='bg-purple-300 p-2 w-1/3 border'></div>
              <div className='bg-purple-400 p-2 w-1/3 border'></div>
              <div className='p-2 w-1/3 border'></div>
            </>
          );
        } else if (nombre && apellido && correo && password) {
          return (
            <>
              <div className='bg-purple-300 p-2 w-1/3 border'></div>
              <div className='bg-purple-400 p-2 w-1/3 border'></div>
              <div className='bg-purple-500 p-2 w-1/3 border'></div>
            </>
          );
        }
      };
      
  return (
    <div className='w-full flex items-center justify-between gap-5 m-auto'>
        {renderState()}
    </div>
  )
}
