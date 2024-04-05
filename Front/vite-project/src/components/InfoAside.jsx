import React, { useState, useEffect } from "react";
import axios from "axios";
// import gorila from "../assets/gorila.jpg"
import FotoPerfil from "./FotoPerfil";

export default function InfoAside(props) {
  var id = sessionStorage.getItem("id");
  var localNombre = sessionStorage.getItem("nombre");
  var localApellido = sessionStorage.getItem("apellido");

  const [nombre, setNombre] = useState(localNombre);
  const [apellido, setApellido] = useState(localApellido);
 
  return (
    <section className="flex flex-col items-center justify-center p-5 my-10 gap-4 text-white">
      <FotoPerfil/>
      <h2 className="text-3xl">
        {nombre && <span>{nombre}</span>}
        {apellido && <span> {apellido}</span>}
      </h2>
    </section>
  );
}
