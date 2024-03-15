from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from config.db import meta, engine
from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String, DateTime

sesiones = Table("sesiones", meta,
                   Column("id", Integer, primary_key=True, autoincrement=True),
                   Column("nombre",String(255)),
                   Column("fecha_creacion", DateTime, default=func.now()),
                   Column("id_cliente", Integer, ForeignKey('clientes.id'))
                   )

meta.create_all(engine)