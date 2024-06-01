import { useState } from 'react';

const useValidaciones = () => {
  const [errores, setErrores] = useState({});

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

  const validarTextoMayuscula = (texto) => /^[A-ZÑ](?:[a-zñ]*\s?)*[A-ZÑ]*[a-zñ]*$/.test(texto);

  const validarDiaSemana = (dia) => ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].includes(dia);

  const validarGrupoMuscular = (grupo) => ['abductor','abdominales','pectoral','bíceps','tríceps','cuádriceps','espalda','deltoides','femoral','gemelos','glúteo'].includes(grupo);

  const validarSeriesRepes = (valor) => valor > 0;

  const validarCampo = (campo, valor) => {
    const nuevosErrores = { ...errores };
    console.log(valor)


    switch (campo) {
      case 'email':
        if (!validarEmail(valor)) {
          nuevosErrores[campo] = 'Correo inválido';
        } else {
          delete nuevosErrores[campo];
        }
        break;
      case 'password':
        if (!validarPassword(valor, 5, 12)) {
          nuevosErrores[campo] = 'Contraseña inválida';
        } else {
          delete nuevosErrores[campo];
        }
        break;
      case 'nombre':
      case 'apellido':
        if (!validarNombreApellido(valor)) {
          nuevosErrores[campo] = 'Debe comenzar con mayúscula';
        } else {
          delete nuevosErrores[campo];
        }
        break;
      case 'edad':
        if (!validarEdad(valor)) {
          nuevosErrores[campo] = 'Edad fuera de rango';
        } else {
          delete nuevosErrores[campo];
        }
        break;
      case 'altura':
        if (!validarAltura(valor)) {
          nuevosErrores[campo] = 'Altura fuera de rango';
        } else {
          delete nuevosErrores[campo];
        }
        break;
      case 'peso':
        if (!validarPeso(valor)) {
          nuevosErrores[campo] = 'Peso fuera de rango';
        } else {
          delete nuevosErrores[campo];
        }
        break;
      case 'patologia':
        if (!validarNoVacio(valor)) {
          nuevosErrores[campo] = 'Patología no puede estar vacío';
        } else {
          delete nuevosErrores[campo];
        }
        break;
      case 'avatar':
        if (!validarSeleccion(valor)) {
          nuevosErrores[campo] = 'Debe seleccionar un avatar';
        } else {
          delete nuevosErrores[campo];
        }
        break;
      case 'tarea':
        if (!validarNoVacio(valor)) {
          nuevosErrores[campo] = 'Tarea no puede estar vacía';
        } else {
          delete nuevosErrores[campo];
        }
        break;
      case 'rutina':
        if (!validarTextoMayuscula(valor)) {
          nuevosErrores[campo] = 'Rutina debe comenzar con mayúscula';
        } else {
          delete nuevosErrores[campo];
        }
        if (!validarNoVacio(valor)) {
          nuevosErrores[campo] = 'Rutina no puede estar vacía';
        } else {
          delete nuevosErrores[campo];
        }
        break;
      case 'entrenamiento':
        if (!validarNoVacio(valor)) {
          nuevosErrores[campo] = 'Entrenamiento no puede estar vacío';
        } else {
          delete nuevosErrores[campo];
        }
        if (!validarTextoMayuscula(valor)) {
          nuevosErrores[campo] = 'Entrenamiento debe comenzar con mayúscula';
        } else {
          delete nuevosErrores[campo];
        }
        break;
      case 'dia':
        if (!validarDiaSemana(valor)) {
          nuevosErrores[campo] = 'Día de la semana no válido';
        } else {
          delete nuevosErrores[campo];
        }
        break;
      case 'ejercicio':
        if (!validarTextoMayuscula(valor)) {
          nuevosErrores[campo] = 'Ejercicio debe comenzar con mayúscula';
        } else {
          delete nuevosErrores[campo];
        }
        if (!validarNoVacio(valor)) {
          nuevosErrores[campo] = 'Ejercicio no puede estar vacío';
        } else {
          delete nuevosErrores[campo];
        }
        break;
      case 'grupoMuscular':
        console.log(valor)
        if (!validarGrupoMuscular(valor.toLowerCase())) {
          nuevosErrores[campo] = 'Grupo muscular no válido';
        } else {
          delete nuevosErrores[campo];
        }
        break;
      case 'series':
      case 'repeticiones':
        if (!validarSeriesRepes(valor)) {
          nuevosErrores[campo] = 'Series y repeticiones deben ser mayores que 0';
        } else {
          delete nuevosErrores[campo];
        }
        break;
      default:
        if (!validarNoVacio(valor)) {
          nuevosErrores[campo] = `${campo} no puede estar vacío`;
        } else {
          delete nuevosErrores[campo];
        }
        break;
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  return { errores, validarCampo };
};

export default useValidaciones;
