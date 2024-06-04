import React, { useState, useEffect } from "react";
import axios from "axios";
// import gorila from "../assets/gorila.jpg"
import FotoPerfil from "./FotoPerfil";

export default function InfoAside() {
  var localNombre = sessionStorage.getItem("nombre");
  var localApellido = sessionStorage.getItem("apellido");

  const [nombre, setNombre] = useState(localNombre);
  const [apellido, setApellido] = useState(localApellido);
 
  return (
    <section className="flex flex-col items-center justify-center p-2 my-10 gap-4 text-white">
      <FotoPerfil/>
      <h2 className="text-2xl text-center hidden md:block">
        {nombre && <span>{nombre}</span>}
        {apellido && <span> {apellido}</span>}
      </h2>
    </section>
  );
}
