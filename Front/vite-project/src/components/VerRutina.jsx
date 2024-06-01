import useRutinas from "../hooks/HookRutinas";
import React, { useEffect, useState } from "react";
import ModalRutinas from "./ModalRutinas";

export default function VerRutina(props) {
    const { id, id_rutina, id_entrenador, updateState  } = props;
    const { rutinas, getRutinasId } = useRutinas();
    const [rutinaObj, setRutinaObj] = useState(null); // Usar useState para inicializar el estado
    const [showModal, setModal] = useState(false)

    console.log("id usuario: ",id)

    useEffect(() => {
        if (id) {
            getRutinasId(id_entrenador);
            // console.log("rutinas ver rutina: ", rutinas)
        }
    }, [id]);

    useEffect(() => {
        if (rutinas && rutinas.length > 0) {
            const rutinaUsada = rutinas.find((rutina) => rutina.id === id_rutina);
            console.log("Rutina usada: ",rutinaUsada)
            setRutinaObj(rutinaUsada);
        }
    }, [rutinas]);

    const openModal = () => {
        showModal ? setModal(false) : setModal(true)
    }

    return (
        <div className="p-4">
            {rutinaObj ? <p>Nombre de la rutina: {rutinaObj.nombre}</p> : <p>No hay una rutina asignada</p>}
            <button onClick={openModal}>{rutinaObj ? (<p>Cambiar rutina</p>) : <p>Agregar rutina</p>}</button> 
            {showModal && <ModalRutinas rutinas={rutinas} id_usuario={id} id_rutina={id_rutina} getRutinas={getRutinasId} id_entrenador={id_entrenador} updateState={updateState}/>}
            
            {/* <ul>
                {rutinas.map((rutina) => {
                    return <li key={rutina.id}>{rutina.nombre}</li>; // Añadir el return y la key
                })}
            </ul> */}
        </div>
    );
}
