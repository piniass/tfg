import { useState } from 'react';

const useValidaciones = () => {
  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validarPassword = (password, minLen = 5, maxLen = 12, requiresUppercase = false) => {
    const lengthValid = password.length >= minLen && password.length <= maxLen;
    const numberValid = /\d/.test(password);
    const uppercaseValid = requiresUppercase ? /[A-Z]/.test(password) : true;
    return lengthValid && numberValid && uppercaseValid;
  };

  const validarNombreApellido = (nombreApellido) => {
    const regex = /^[A-ZÑ][a-zñ]+$/;
    return regex.test(nombreApellido);
  };

  const validarNoVacio = (campo) => campo.trim() !== '';

  const validarEdad = (edad) => edad >= 0 && edad <= 100;

  const validarAltura = (altura) => altura >= 0 && altura <= 273;

  const validarPeso = (peso) => peso > 0 && peso <= 150;

  const validarSeleccion = (seleccion) => seleccion !== '';

  const validarTextoMayuscula = (texto) => /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]*(\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]*)*$/.test(texto);

  const validarDiaSemana = (dia) => ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].includes(dia);

  const validarGrupoMuscular = (grupo) => ['abductor','abdominales','pectoral','bíceps','tríceps','cuádriceps','espalda','deltoides','femoral','gemelos','glúteo'].includes(grupo);

  const validarSeriesRepes = (valor) => valor > 0;

  const validarCampo = (campo, valor) => {
    switch (campo) {
      case 'email':
        return validarEmail(valor);
      case 'password':
        return validarPassword(valor, 5, 12);
      case 'nombre':
      case 'apellido':
        return validarNombreApellido(valor);
      case 'edad':
        return validarEdad(valor);
      case 'altura':
        return validarAltura(valor);
      case 'peso':
        return validarPeso(valor);
      case 'patologia':
        return validarNoVacio(valor);
      case 'avatar':
        return validarSeleccion(valor);
      case 'tarea':
        return validarNoVacio(valor);
      case 'rutina':
        return validarTextoMayuscula(valor) && validarNoVacio(valor);
      case 'entrenamiento':
        return validarNoVacio(valor) && validarTextoMayuscula(valor);
      case 'dia':
        return validarDiaSemana(valor);
      case 'ejercicio':
        return validarTextoMayuscula(valor) && validarNoVacio(valor);
      case 'grupoMuscular':
        return validarGrupoMuscular(valor.toLowerCase());
      case 'series':
      case 'repeticiones':
        return validarSeriesRepes(valor);
      default:
        return validarNoVacio(valor);
    }
  };

  return { validarCampo };
};

export default useValidaciones;
