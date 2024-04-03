import axios from 'axios'
import { useEffect, useState } from 'react'
import ClientCard from './ClientCard'

export default function ClientsContainer(props) {
    const id = props.id
    const [clientes, setClientes] = useState([]);
    const [busqueda, setBusqueda] = useState(props.buscador);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/clientes/entrenador/${id}`);
                setClientes(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };
    
        const buscarClientes = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/clientes/entrenador/${id}/${props.buscador}`);
                setClientes(response.data);
                console.log(props.buscador);
            } catch (error) {
                console.log(error);
            }
            
        };
    
        if (busqueda !== undefined) {
            buscarClientes();
        } else {
            fetchClientes();
        }
    }, [id, props.buscador]);

    const actualizarClientes = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/clientes/entrenador/${id}`);
            setClientes(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    

    return (
        <section className='p-4'>
            {/* Verificar si no hay clientes */}
            {clientes.length === 0 ? (
                <p>No hay clientes</p>
            ) : (
                // Si hay clientes, comprobar si busqueda.length es mayor que 0
                // Si busqueda.length > 0, renderizar ClientCards con otra prop
                busqueda !== undefined ? (
                    <div className='grid grid-cols-3 gap-4'>
                        {clientes.map(cliente => (
                            // Renderizar ClientCard con otra prop
                            <ClientCard key={cliente.id} cliente={cliente} actualizarClientes={actualizarClientes}/>
                        ))}
                    </div>
                ) : (
                    // Si busqueda.length es 0, hacer el mapeo normalmente
                    <div className='grid grid-cols-3 gap-4'>
                        {clientes.map(cliente => (
                            <ClientCard key={cliente.id} cliente={cliente} actualizarClientes={actualizarClientes}/>
                        ))}
                    </div>
                )
            )}
        </section>
    );
    
}
