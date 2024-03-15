from fastapi import APIRouter, HTTPException
from config.db import conn
from models.sesion import sesiones  # Importa la tabla de sesiones
from schemas.sesiones import Sesiones  # Importa el esquema para crear sesiones

ruta_sesiones = APIRouter()  # Cambia el nombre de la variable a sesiones_router

@ruta_sesiones.get("/sesiones/cliente/{id}")
def get_sesiones_by_cliente_id(id: int):
    query = conn.execute(sesiones.select().where(sesiones.c.id_cliente == id))
    sesiones_list = []
    for row in query:
        sesion_dict = {
            "id": row[0],
            "nombre": row[1],
            "fecha_creacion": row[2],
            "id_cliente": row[3]
        }
        sesiones_list.append(sesion_dict)
    return sesiones_list

@ruta_sesiones.post("/sesiones/cliente/{id}")
def create_sesion_for_cliente(id:int, sesion_create: Sesiones):
    nueva_sesion = {
        "nombre": sesion_create.nombre,
        "id_cliente": id
    }
    conn.execute(sesiones.insert().values(nueva_sesion))
    conn.commit()
    return {"message": f"Sesión creada para el cliente con ID {id}"}

@ruta_sesiones.put("/sesiones/{id}")
def update_sesion(id:int, sesion_create: Sesiones):
    nueva_sesion = {
        "nombre": sesion_create.nombre,
        "id": id
    }
    result = conn.execute(sesiones.update().where(sesiones.c.id == id).values(nueva_sesion))
    conn.commit()
    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Sesión no encontrada")
    return {"message": f"Sesión con ID {id} actualizada"}

@ruta_sesiones.delete("/sesiones/{id}")
def delete_sesion(id: int):
    result = conn.execute(sesiones.delete().where(sesiones.c.id == id))
    conn.commit()

    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Sesión no encontrada")
    return {"message": f"Sesión con ID {id} eliminada"}
