from sqlalchemy import Table, Column, Integer, String, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from config.db import meta , engine # Asegúrate de importar meta desde tu archivo config.db

tareas = Table(
    "tareas", meta,
    Column("id", Integer, primary_key=True),
    Column("tarea", String(255)),
    Column("fecha_creacion", TIMESTAMP, server_default=func.now()),
    Column("id_entrenador", Integer, ForeignKey("entrenadores.id"))
)

meta.create_all(engine)
