from fastapi import APIRouter
from config.db import conn
from models.cliente import clientes  # Importa la tabla de clientes
from schemas.clientes import Cliente
from fastapi import HTTPException
from fastapi import Form


cliente = APIRouter()  # Cambia el nombre de la variable a cliente_router

@cliente.get("/clientes")
def get_clientes():
    query = conn.execute(clientes.select())
    cliente_list = []
    for row in query.fetchall():
        cliente_dict = {
           "id": row[0],
            "nombre": row[1],
            "apellido": row[2],
            "edad": row[3],
            "altura": row[4],
            "patologias": row[5],
            "id_entrenador": row[6] 
        }
        cliente_list.append(cliente_dict)
    return cliente_list

@cliente.get("/clientes/{id}")
def get_cliente_byid(id:str):
    query = conn.execute(clientes.select().where(clientes.c.id == id))
    cliente_list = []
    for row in query:
        cliente_dict = {
            "id": row[0],
            "nombre": row[1],
            "apellido": row[2],
            "edad": row[3],
            "altura": row[4],
            "patologias": row[5],
            "id_entrenador": row[6] 
        }
        cliente_list.append(cliente_dict)
    return cliente_list

@cliente.get("/clientes/entrenador/{id}")
def get_cliente_byentrenador(id:str):
    query = conn.execute(clientes.select().where(clientes.c.id_entrenador == id))
    cliente_list = []
    for row in query:
        cliente_dict = {
            "id": row[0],
            "nombre": row[1],
            "apellido": row[2],
            "edad": row[3],
            "altura": row[4],
            "patologias": row[5],
            "id_entrenador": row[6] 
        }
        cliente_list.append(cliente_dict)
    return cliente_list


@cliente.post("/cliente")
def create_cliente(nombre: str = Form(...), apellido: str = Form(...), edad: int = Form(...), altura: float = Form(...), patologias: str = Form(...), id_entrenador: int = Form(...)):
    new_cliente = {
        "nombre": nombre,
        "apellido": apellido,
        "edad": edad,
        "altura": altura,
        "patologias": patologias,
        "id_entrenador": id_entrenador
    }
    conn.execute(clientes.insert().values(new_cliente))
    conn.commit()
    return {"message": f"Cliente {nombre} {apellido} creado"}

@cliente.put("/cliente/{id}")
def update_cliente(id: str, cliente: Cliente):
    updated_cliente = {
        "nombre": cliente.nombre,
        "apellido": cliente.apellido,
        "edad": cliente.edad,
        "altura": cliente.altura,
        "patologias": cliente.patologias,
        "id_entrenador": cliente.id_entrenador
    }
    result = conn.execute(clientes.update().where(clientes.c.id == id).values(updated_cliente))
    conn.commit()
    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return {"message": f"Cliente con ID {id} actualizado"}

@cliente.delete("/cliente/{id}")
def delete_cliente(id: str):
    result = conn.execute(clientes.delete().where(clientes.c.id == id))
    conn.commit()

    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return {"message": f"Cliente con ID {id} eliminado"}