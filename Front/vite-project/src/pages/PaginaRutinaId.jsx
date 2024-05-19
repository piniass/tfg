import React, { useEffect, useState } from 'react';
import Aside from '../components/Aside';
import { useLocation } from 'react-router-dom';
import FormularioCrearEntrenamiento from '../components/FormularioCrearEntrenamiento';
import useEntrenamiento from '../hooks/HookEntrenamiento';
import useEjercicio from '../hooks/HookEjercicio';
import EntrenamientoCard from '../components/EntrenamientoCard';
import FormularioCrearEjercicio from '../components/FormularioCrearEjercicio';
import TablaEjercicios from '../components/TablaEjercicios';

export default function PaginaRutinaId() {
    const location = useLocation();
    const rutina = location.state;
    const nombreRutina = rutina.nombre;
    const rutinaId = Number(rutina.id);
    const [showForm, setForm] = useState(false);
    const {entrenamiento, getEntrenamiento, handleEliminar} = useEntrenamiento({rutinaId});
    const [entrenamientoId, setEntrenamientoId] = useState('');
    const {ejercicio, getEjercicios} = useEjercicio({entrenamientoId});

    const [entrenamientoObj, setObj] = useState('');

    const handleShowForm = () => {
        setForm(true);
    };

    const getEntrenamientoId = (id) => {
        setEntrenamientoId(id);
    };

    useEffect(() => {
        getEntrenamiento();
    }, []);

    useEffect(() => {
        if (entrenamientoId) {

            getEjercicios();
        }
    }, [entrenamientoId]);

    return (
        <div className='flex'>
            <Aside />
            <main className='w-4/5 h-screen flex flex-col relative overflow-auto'>
                <section className='p-4 '>
                    <h2 className='text-2xl'>Nombre de la rutina: {nombreRutina}</h2>
                </section>
                <section className='p-4 '>
                    <div className='flex gap-4 items-center mb-4 flex-col sm:flex-row'>
                        <h2 className='text-2xl mb-2'>Entrenamientos</h2>
                        <button className='flex flex-col justify-center items-center w-full sm:w-auto' onClick={handleShowForm}>
                            <span>Añadir entrenamiento</span>
                        </button>
                    </div>
                    <article className='flex gap-4 overflow-x-auto'>
                        {
                            entrenamiento.map((sesion) => 
                                <EntrenamientoCard key={sesion.id} sesion={sesion} setObj={setObj} handleEliminar={handleEliminar} />
                            )
                        }
                    </article>
                </section>
                {showForm && <FormularioCrearEntrenamiento getEntrenamiento={getEntrenamiento} rutina={rutina} setForm={setForm} />}
                {entrenamientoObj && <FormularioCrearEjercicio entrenamientoObj={entrenamientoObj} getEjercicios={getEjercicios} setForm={setForm} />}
                {entrenamiento && (
                    <section className='p-4 flex flex-col gap-2'>
                        <h3 className='text-xl'>Visualiza un entrenamiento: </h3>
                        <div className='flex gap-4'>
                            {entrenamiento.map((boton) => 
                                <button key={boton.id} onClick={() => getEntrenamientoId(boton.id)}>{boton.nombre}</button>
                            )}
                        </div>
                    </section>
                )}
                {
                  entrenamientoId ? (
                    <TablaEjercicios entrenamientoId={entrenamientoId} ejercicio={ejercicio}/>
                  ) :
                  (
                    <p className='p-4'>Selecciona un entrenamiento</p>
                  )
                }
            </main> 
        </div>
    );
}
