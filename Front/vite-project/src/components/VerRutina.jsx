import useRutinas from "../hooks/HookRutinas";
import React, { useEffect, useState } from "react";

export default function VerRutina(props) {
    const { id, id_rutina } = props;
    const { rutinas, getRutinasId } = useRutinas();
    const [rutinaObj, setRutinaObj] = useState(null); // Usar useState para inicializar el estado

    console.log("id rutina para rutinas",id_rutina)
    console.log("id para rutinas",id)


    useEffect(() => {
        if (id) {
            getRutinasId(id_rutina);
        }
    }, [id]);

    useEffect(() => {
        if (rutinas && rutinas.length > 0) {
            const rutinaUsada = rutinas.find((rutina) => rutina.id === id_rutina);
            console.log(rutinaUsada)
            setRutinaObj(rutinaUsada);
        }
    }, [rutinas]);

    return (
        <div>
            {rutinaObj ? <p>Nombre de la rutina: {rutinaObj.nombre}</p> : <p>No hay una rutina asignada</p>}
        </div>
    );
}
