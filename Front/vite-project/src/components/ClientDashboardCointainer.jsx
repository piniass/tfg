import React from 'react';
import ClientsContainer from './ClientsContainer';
import Search from '../svgs/Search';
import { useNavigate } from 'react-router-dom';


export default function ClientDashboardContainer(props) {
  const navigate = useNavigate()
  
  const goUsuarios = async () => {
    await navigate('/registrar');
  };

  return (
    <section className="w-3/4">
      <div className='p-4 flex gap-4'>
        <div className='flex items-center relative'>
          <input type='text' className='ps-2 pr-8 py-4' id='find' placeholder='Introduce un nombre' />
          <div className='absolute left-44'>
            <Search />
          </div>
        </div>
        <button onClick={goUsuarios}>Crear Usuario</button>
      </div>
      <ClientsContainer id={props.id}/>
    </section>
  );
}

