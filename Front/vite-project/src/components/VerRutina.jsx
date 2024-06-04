import useRutinas from "../hooks/HookRutinas";
import React, { useEffect, useState } from "react";
import ModalRutinas from "./ModalRutinas";
import useEntrenamiento from "../hooks/HookEntrenamiento";
import TablaEjercicios from "./TablaEjercicios";
import useEjercicio from "../hooks/HookEjercicio";

export default function VerRutina(props) {
    const { id, id_rutina, id_entrenador, updateState  } = props;
    const { rutinas, getRutinasId } = useRutinas();
    const [rutinaObj, setRutinaObj] = useState(null); // Usar useState para inicializar el estado
    const [showModal, setModal] = useState(false);
    const rutinaNumber = Number(id_rutina)
    const { entrenamiento, getEntrenamiento } = useEntrenamiento({ rutinaId: rutinaNumber });
    const [entrenamientoId, setEntrenamientoId] = useState('');
    const { ejercicio, getEjercicios } = useEjercicio({ entrenamientoId });



    useEffect(() => {
        if (id) {
            getRutinasId(id_entrenador);
            
        }
    }, [id]);


    useEffect(() => {
        const handleRutinas = () => {
            if (rutinas && rutinas.length > 0) {
                const rutinaUsada = rutinas.find((rutina) => rutina.id === id_rutina);
                // console.log("Rutina usada: ", rutinaUsada);
                setRutinaObj(rutinaUsada);
            }
        };
        handleRutinas();
        getEntrenamiento();
    }, [rutinas]);
    

    useEffect(() => {
        if (entrenamientoId) {
            getEjercicios();
            console.log(ejercicio)
        }
    }, [entrenamientoId]);

    useEffect(() => {
        setEntrenamientoId('');
    }, [id_rutina]);

    const openModal = () => {
        showModal ? setModal(false) : setModal(true)
    }

    const getEntrenamientoId = (id) => {
        console.log("click: ",entrenamientoId)
        setEntrenamientoId(id);
    };

    return (
        <div className="p-4 flex flex-col gap-4">
            {rutinaObj ? <p>Nombre de la rutina: {rutinaObj.nombre}</p> : <p>No hay una rutina asignada</p>}
            <button className=" bg-transparent border-red-600" onClick={openModal}>{rutinaObj ? (<p>Cambiar rutina</p>) : <p>Agregar rutina</p>}</button> 
            {showModal && <ModalRutinas rutinas={rutinas} id_usuario={id} id_rutina={id_rutina} getRutinas={getRutinasId} id_entrenador={id_entrenador} updateState={updateState} setModal={setModal}/>}
            
            {/* <ul>
                {rutinas.map((rutina) => {
                    return <li key={rutina.id}>{rutina.nombre}</li>; // Añadir el return y la key
                })}
            </ul> */}
            {entrenamiento.length > 0 ? 
            <div className="flex flex-col md:flex-row gap-2 w-full">{ entrenamiento.map((training) => 
                <button key={training.id} onClick={() => getEntrenamientoId(training.id)}>{training.nombre}</button>)
                }
            </div>
                : <p>No hay ningun entreamiento creado todavía.</p>}

                {entrenamientoId  && ejercicio.length > 0 ?(
                    <TablaEjercicios entrenamientoId={entrenamientoId} ejercicio={ejercicio} getEjercicios={getEjercicios}/>
                ) : (
                    <p className='p-4'>Selecciona un entrenamiento</p>
                )}
            
        </div>

            
    );
}
