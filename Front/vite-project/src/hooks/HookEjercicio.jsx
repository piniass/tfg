import axios from 'axios';
import { useState } from 'react';

const useEjercicio = (id_entrenamiento) => {
    const entrenamientoId = id_entrenamiento.entrenamientoId;
    const [error, setError] = useState(null);
    const [ejercicio, setEjercicio] = useState([]);
    
    const getEjercicios = async () => {
        try {
            const response = await axios.get(`https://tfg-backend-piniass-projects.vercel.app/ejercicios/entrenamiento/${entrenamientoId}`);
            setEjercicio(response.data);
            // console.log("Fetch ejercicios", ejercicio)
            return ejercicio;
        } catch (err) {
            setError(err);
        }
    };

    const handleEliminarEjercicio = async (id) => {
        try {
            //const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este ejercicio?");
            //if (confirmDelete) {
                const response = await axios.delete(`https://tfg-backend-piniass-projects.vercel.app/ejercicios/${id}`);
                // console.log(response.data.message); 
                getEjercicios();
                // console.log("hago el get")
            //}
        } catch (err) {
            setError(err);
        }
    };

    return {
        getEjercicios,
        handleEliminarEjercicio,
        ejercicio,
        error
    };
};

export default useEjercicio;
