from config.db import conn
from models.tarea import tareas
from schemas.tareas import Tarea
from fastapi import HTTPException
from fastapi import Depends, Form, HTTPException, APIRouter
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from datetime import datetime, timedelta




tarea = APIRouter()

@tarea.get("/tareas")
def get_tareas():
    query = conn.execute(tareas.select())
    tareas_list = []
    for row in query.fetchall():
        tarea_dict = {
            "id": row[0],
            "tarea": row[1],
            "fecha_creacion": row[2],
            "id_entrenador": row[3],
            "confirmado": row[4]
        }
        tareas_list.append(tarea_dict)
    return tareas_list

@tarea.get("/tareas/entrenador/{id}")
def get_cliente_byentrenador(id:str):
    query = conn.execute(tareas.select().where(tareas.c.id_entrenador == id))
    tareas_list = []
    for row in query.fetchall():
        tarea_dict = {
            "id": row[0],
            "tarea": row[1],
            "fecha_creacion": row[2],
            "id_entrenador": row[3],
            "confirmado": row[4]
        }
        tareas_list.append(tarea_dict)
    return tareas_list


@tarea.post("/tareas")
def create_tarea(tarea:str = Form(...),id_entrenador:int= Form(...)):
    new_tarea = {
        "tarea": tarea,
        "id_entrenador": id_entrenador
    } 
    conn.execute(tareas.insert().values(new_tarea))
    conn.commit()
    return {"message": f"Tarea creada"}

@tarea.put("/tareas/{id}")
def update_tarea(id:str,tarea:str,id_entrenador:int):
    updated_tarea = {
        "tarea": tarea,
        "id_entrenador": id_entrenador
    }
    result = conn.execute(tareas.update().where(tareas.c.id == id).values(updated_tarea))
    conn.commit()
    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    return {"message": f"Tarea con ID {id} actualizada"}

@tarea.put("/tareas/{id}/confirmado")
def update_confirmado_tarea(id: str, confirmado: bool):
    result = conn.execute(tareas.update().where(tareas.c.id == id).values(confirmado=confirmado))
    conn.commit()
    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    return {"message": f"Estado de confirmado de la tarea con ID {id} actualizado a {confirmado}"}


@tarea.delete("/tareas/{id}")
def delete_tarea(id:str):
    result = conn.execute(tareas.delete().where(tareas.c.id == id))
    conn.commit()

    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    return {"message": f"Tarea con ID {id} eliminada"}