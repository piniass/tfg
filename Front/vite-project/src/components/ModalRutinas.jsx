import React, { useEffect, useState } from 'react';
import Add from '../svgs/Add';
import qs from 'qs';
import axios from 'axios';
import CheckIcon from '../svgs/CheckIcon'
import CloseIcon from '../svgs/CloseIcon';

export default function ModalRutinas({ rutinas, id_usuario, getRutinas, id_rutina,id_entrenador,updateState,setModal }) {
    // console.log("modal rutinas props", { rutinas, id_usuario, getRutinas, id_rutina });
    const [rutinaActual,setRutina] = useState(null)

    useEffect(() => {
        const findRutina = () => {
            const rutinaFind = rutinas.find((r) => r.id === id_rutina);
            setRutina(rutinaFind);
        };
        findRutina();
    }, [id_rutina, rutinas]);

    const handleSubmit = async(e, id_rutina) => {
        e.preventDefault();
        // console.log("rutina: ", id_rutina, "usuario", id_usuario);

        

        try {
            const url = `https://tfg-backend-piniass-projects.vercel.app/cliente/rutina/${id_usuario}`;
            const data = {
                id_rutina: id_rutina
            };

            const options = {
                method: 'PUT',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify(data),
                url,
            };

            const res = await axios(options);
            getRutinas(id_entrenador)
            updateState({ id_rutina }); // Actualiza el estado con la nueva id de rutina

            // console.log(res.data);
        } catch (error) {
            // console.log("Errores:", error.response.data.detail);
        }
    }

    const closeModal = () => {
        setModal(false)
    }

    return (
        <div className='p-2 bg-white border rounded-md absolute top-52 left-0 right-0 ml-auto mr-auto w-72'>
            <div className='w-full flex items-center justify-between mb-2'>
                <h3 className='text-xl'>Elige una rutina</h3>
                <button className='bg-transparent' onClick={closeModal}><CloseIcon/></button>

            </div>
            <ul className='flex flex-col gap-2 '>
                {rutinas && rutinas.length > 0 ? (
                    rutinas.map((rutina) => (
                        rutina && (
                            <li key={rutina.id} className='flex justify-between items-center'>
                                <p>{rutina.nombre}</p>
                                {
                                    rutina.id === id_rutina ?
                                    (<button><CheckIcon/></button>) : 
                                    (<form onSubmit={(e) => handleSubmit(e, rutina.id)}>
                                    <button type='submit'><Add /></button>
                                </form>)
                                }
                                
                            </li>
                        )
                    ))
                ) : (
                    <li>No hay rutinas disponibles</li>
                )}
            </ul>
        </div>
    );
}
