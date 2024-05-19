import axios from 'axios';
import { useState } from 'react';

const useEjercicio = (id_entrenamiento) => {
    const entrenamientoId = id_entrenamiento.entrenamientoId;
    const [error, setError] = useState(null);
    const [ejercicio, setEjercicio] = useState([]);
    
    const getEjercicios = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/ejercicios/entrenamiento/${entrenamientoId}`);
            setEjercicio(response.data);
            console.log("Fetch ejercicios", ejercicio)
            return ejercicio;
        } catch (err) {
            setError(err);
        }
    };

    const handleEliminar = async (id) => {
        try {
            const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este ejercicio?");
            if (confirmDelete) {
                const response = await axios.delete(`http://127.0.0.1:8000/ejercicios/${id}`);
                console.log(response.data.message); 
                getEjercicio();
            }
        } catch (err) {
            setError(err);
        }
    };

    return {
        getEjercicios,
        handleEliminar,
        ejercicio,
        error
    };
};

export default useEjercicio;
