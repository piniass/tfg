import React, { useState, useEffect } from "react";
import axios from "axios";
import gorila from "../assets/gorila.jpg"

export default function InfoAside(props) {
  var id = sessionStorage.getItem("id");
  var localNombre = sessionStorage.getItem("nombre");
  var localApellido = sessionStorage.getItem("apellido");
  var localAvatar = sessionStorage.getItem("avatar");

  const [nombre, setNombre] = useState(localNombre);
  const [apellido, setApellido] = useState(localApellido);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //     const getUser = async (id) => {
  //         try {
  //             const response = await axios.get(`http://127.0.0.1:8000/entrenadores/${id}`);
  //             const info = response.data[0];
  //             setNombre(info.nombre);
  //             setApellido(info.apellido);
  //         } catch (err) {
  //             setError(error);
  //         }
  //     };

  //     getUser(id);
  // }, [id]);

  return (
    <section className="flex flex-col items-center justify-center p-5 my-10 gap-4 text-white">
      <img
        src={gorila}
        alt="Avatar de usuario"
        className="rounded-full size-48"

        />
      <h2 className="text-3xl">
        {nombre && <span>{nombre}</span>}
        {apellido && <span> {apellido}</span>}
      </h2>
    </section>
  );
}
