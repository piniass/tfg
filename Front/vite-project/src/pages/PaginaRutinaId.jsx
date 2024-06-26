import React, { useEffect, useState } from 'react';
import Aside from '../components/Aside';
import { useLocation } from 'react-router-dom';
import FormularioCrearEntrenamiento from '../components/FormularioCrearEntrenamiento';
import FormularioEditarEntrenamiento from '../components/FormularioEditarEntrenamiento';
import useEntrenamiento from '../hooks/HookEntrenamiento';
import useEjercicio from '../hooks/HookEjercicio';
import EntrenamientoCard from '../components/EntrenamientoCard';
import FormularioCrearEjercicio from '../components/FormularioCrearEjercicio';
import FormularioEditarEjercicio from '../components/FormularioEditarEjercicio';
import TablaEjercicios from '../components/TablaEjercicios';

export default function PaginaRutinaId() {
    const location = useLocation();
    const rutina = location.state;
    const nombreRutina = rutina.nombre;
    const rutinaId = Number(rutina.id);
    const [showForm, setForm] = useState(false);
    const [showFormEjercicio, setFormEjercicio] = useState(false);
    const [showFormEditEntrenamiento, setFormEditEntrenamiento] = useState(false);
    const [showFormEditEjercicio, setFormEditEjercicio] = useState(false);
    const { entrenamiento, getEntrenamiento, handleEliminar } = useEntrenamiento({ rutinaId });
    const [entrenamientoId, setEntrenamientoId] = useState('');
    const { ejercicio, getEjercicios, handleEliminarEjercicio } = useEjercicio({ entrenamientoId });
    const [entrenamientoObj, setObj] = useState(null);

    const handleShowForm = () => {
        setForm(true);
    };

    const handleShowFormEjercicio = () => {
        setFormEjercicio(true);
        setFormEditEjercicio(false);
    };

    const getEntrenamientoId = (id) => {
        setEntrenamientoId(id);
    };

    const handleEditEntrenamiento = (entrenamiento) => {
        setObj(entrenamiento);
        setFormEditEntrenamiento(true);

    };

    const handleCloseEjercicios=()=>{
        setFormEditEjercicio(false);
        setFormEjercicio(false);
    }

    const handleEditEjercicio = (ejercicio) => {
        setObj(ejercicio);
        setFormEditEjercicio(true);
        setFormEjercicio(false);
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
                        {entrenamiento.map((sesion) => 
                            <EntrenamientoCard 
                                key={sesion.id} 
                                sesion={sesion} 
                                setObj={setObj} 
                                handleEliminar={handleEliminar} 
                                getEntrenamiento={getEntrenamiento} // Pasa getEntrenamiento
                                getEjercicios={getEjercicios} // Pasa getEjercicios
                                handleEditEntrenamiento={handleEditEntrenamiento}
                                handleShowFormEjercicio={handleShowFormEjercicio}  
                                handleCloseEjercicios={handleCloseEjercicios}
                            />
                        )}
                    </article>
                </section>
                {showForm && <FormularioCrearEntrenamiento getEntrenamiento={getEntrenamiento} rutina={rutina} setForm={setForm} />}
                {showFormEditEntrenamiento && <FormularioEditarEntrenamiento getEntrenamiento={getEntrenamiento} rutina={rutina} setFormEdit={setFormEditEntrenamiento} entrenamiento={entrenamientoObj} />}
                {showFormEditEjercicio && <FormularioEditarEjercicio ejercicio={entrenamientoObj} getEjercicios={getEjercicios} setFormEditEjercicio={setFormEditEjercicio} />}
                {showFormEjercicio && <FormularioCrearEjercicio entrenamientoObj={entrenamientoObj} getEjercicios={getEjercicios} setFormEjercicio={setFormEjercicio} />}
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
                {entrenamientoId  && ejercicio.length > 0 ?(
                    <TablaEjercicios entrenamientoId={entrenamientoId} ejercicio={ejercicio} handleEliminar={handleEliminarEjercicio} handleEditEjercicio={handleEditEjercicio} getEjercicios={getEjercicios}/>
                ) : (
                    <p className='p-4'>Selecciona un entrenamiento</p>
                )}
            </main> 
        </div>
    );
}
