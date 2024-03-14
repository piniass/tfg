from fastapi import APIRouter, HTTPException
from config.db import conn
from models.peso import registro_pesos  # Importa la tabla de registro_pesos
from schemas.pesos import RegistroPesos  # Importa el BaseModel para registro de pesos

pesos = APIRouter()  # Cambia el nombre de la variable a pesos_router

@pesos.get("/pesos/cliente/{id}")
def get_registro_pesos_by_id(id: int):
    query = conn.execute(registro_pesos.select().where(registro_pesos.c.id == id))
    registro_pesos_list = []
    for row in query:
        registro_pesos_dict = {
            "id": row[0],
            "peso": row[1],
            "fecha": row[2],
            "id_cliente": row[3]
        }
        registro_pesos_list.append(registro_pesos_dict)
    return registro_pesos_list

@pesos.post("/pesos/cliente/{id}")
def post_pesos_cliente(id:int, peso:float):
    nuevo_peso = {
        "peso":peso,
        "id_cliente": id
    }
    conn.execute(registro_pesos.insert().values(nuevo_peso))
    conn.commit()
    return {"message": f"Peso del cliente con id {id} creado"}

@pesos.put("/pesos/cliente/{id}")
def update_peso(id:int, peso:float):
    nuevo_peso = {
        "peso":peso,
        "id": id
    }
    result = conn.execute(registro_pesos.update().where(registro_pesos.c.id == id).values(nuevo_peso))
    conn.commit()
    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Registro no encontrado")
    return {"message": f"Peso con ID {id} actualizado"}

@pesos.delete("/pesos/cliente/{id}")
def delete_entrenador(id: str):
    result = conn.execute(registro_pesos.delete().where(registro_pesos.c.id == id))
    conn.commit()

    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Registro no encontrado")
    return {"message": f"Peso con ID {id} eliminado"}
    

