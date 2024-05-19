import axios from 'axios'
import { useEffect, useState } from 'react'
import ClientCard from './ClientCard'
import Spinner from './Spinner';
import { useUser } from '../context/UserProvider';


export default function ClientsContainer(props) {
    // const id = sessionStorage.getItem("id");
    const { setUserId, userId } = useUser();
    const [id,setId] = useState(userId)

    const [clientes, setClientes] = useState([]);
    const [busqueda, setBusqueda] = useState();
    const [nuevosClientes, setNuevos] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log("Entro al useEffect1")
        fetchClientes();
    }, []);

    const fetchClientes = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`http://localhost:8000/clientes/entrenador/${userId}`);
            setClientes(response.data);
            console.log("Datos: ",response.data);
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        console.log("Entro al useEffect2")
        if (props.buscador !== '') {
            console.log("Me acabo de meter")
            // buscarClientes();
            setBusqueda(props.buscador)
            const clientesFiltrados = clientes.filter(cliente => 
                cliente.nombre.toLowerCase().includes(props.buscador.toLowerCase()) || 
                cliente.apellido.toLowerCase().includes(props.buscador.toLowerCase())
            );
            setNuevos(clientesFiltrados);
        }
    }, [props.buscador])

    const actualizarClientes = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/clientes/entrenador/${id}`);
            setClientes(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className=''>
            {loading && <Spinner/>}
            
            {clientes.length === 0 && !loading ? (
                    <p>No hay clientes todavía</p>
            
            ) : (
                // Si el buscador contiene información ejecuta esto
                props.buscador !== '' ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
                        {nuevosClientes.map(cliente => (
                            <ClientCard key={cliente.id} cliente={cliente} actualizarClientes={actualizarClientes} />
                        ))}
                    </div>
                ) : (
                    // Si el buscador está así '' imprime todos los clientes
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
                        {clientes.map(cliente => (
                            <ClientCard key={cliente.id} cliente={cliente} actualizarClientes={actualizarClientes} />
                        ))}
                    </div>
                )
            )}
        </section>
    );
}