import React, { useState, useEffect } from "react";
import axios from "axios";
import FotoPerfil from "./FotoPerfil";
import useHasheo from '../hooks/HookHasheo';

export default function InfoAside() {
  const { decryptData } = useHasheo();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");

  useEffect(() => {
    // Recuperar y desencriptar datos de sessionStorage
    const encryptedNombre = sessionStorage.getItem("nombre");
    const encryptedApellido = sessionStorage.getItem("apellido");

    if (encryptedNombre && encryptedApellido) {
      const decryptedNombre = decryptData(encryptedNombre);
      const decryptedApellido = decryptData(encryptedApellido);

      setNombre(decryptedNombre);
      setApellido(decryptedApellido);
    }
  }, [decryptData]);

  return (
    <section className="flex flex-col items-center justify-center p-2 my-10 gap-4 text-white">
      <FotoPerfil />
      <h2 className="text-2xl text-center hidden md:block">
        {nombre && <span>{nombre}</span>}
        {apellido && <span> {apellido}</span>}
      </h2>
    </section>
  );
}
