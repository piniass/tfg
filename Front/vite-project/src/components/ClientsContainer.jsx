import axios from 'axios'
import { useEffect, useState} from 'react'

export default function ClientsContainer(props) {
    const id = props.id
    const [clientes, setClientes] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8000/clientes/entrenador/${id}`)
            .then(function (response) {
                setClientes(response.data);
                console.log(clientes)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []); // Esta array vacía indica que el efecto solo se ejecuta una vez, equivalente a componentDidMount en componentes de clase

    return (
        <section>
            {clientes.length === 0 ? <p>No hay clientes</p> : <p>Hay clientes!s</p>}
        </section>
    );
}
