from sqlalchemy import Column, Integer, String, DateTime, ForeignKey,Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from config.db import meta, engine

entrenamientos = Table("entrenamientos", meta,
                   Column("id", Integer, primary_key=True, autoincrement=True),
                   Column("nombre",String(255)),
                   Column("dia_semana",String(255)),
                   Column("fecha_creacion", DateTime, default=func.now()),
                   Column("id_sesion", Integer, ForeignKey('sesiones.id'))
                   )

meta.create_all(engine)
