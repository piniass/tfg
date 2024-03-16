from fastapi import APIRouter, HTTPException
from config.db import conn
from models.ejercicio import ejercicios  # Importa la tabla de sesiones
from schemas.ejercicios import Ejercicios  # Importa el esquema para crear sesiones

ruta_ejercicios = APIRouter()  # Cambia el nombre de la variable a sesiones_router

@ruta_ejercicios.get("/ejercicios/entrenamiento/{id}")
def get_ejercicios_by_entrenamiento_id(id: int):
    query = conn.execute(ejercicios.select().where(ejercicios.c.id_entrenamiento == id))
    ejercicios_list = []
    for row in query:
        ejercicio_dict = {
            "id": row[0],
            "nombre": row[1],
            "id_entrenamiento": row[2]
        }
        ejercicios_list.append(ejercicio_dict)
    return ejercicios_list

@ruta_ejercicios.post("/ejercicios/entreanmiento/{id}")
def create_ejercicio_for_entrenamiento(id:int, ejercicio_create: Ejercicios):
    nuevo_ejercicio = {
        "nombre": ejercicio_create.nombre,
        "id_entrenamiento": id
    }
    conn.execute(ejercicios.insert().values(nuevo_ejercicio))
    conn.commit()
    return {"message": f"Ejercicio creado para el entrenamiento con ID {id}"}

@ruta_ejercicios.put("/ejercicios/{id}")
def update_ejercicio(id:int, ejercicio_create: Ejercicios):
    nuevo_ejercicio = {
        "nombre": ejercicio_create.nombre,
        "id": id
    }
    result = conn.execute(ejercicios.update().where(ejercicios.c.id == id).values(nuevo_ejercicio))
    conn.commit()
    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Ejercicio no encontrado")
    return {"message": f"Ejercicio con ID {id} actualizado"}

@ruta_ejercicios.delete("/ejercicios/{id}")
def delete_ejercicio(id: int):
    result = conn.execute(ejercicios.delete().where(ejercicios.c.id == id))
    conn.commit()

    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Ejercicio no encontrado")
    return {"message": f"Ejercicio con ID {id} eliminado"}