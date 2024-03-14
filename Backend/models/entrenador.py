from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String
from config.db import meta, engine

entrenadores = Table("entrenadores", meta,
                   Column("id", Integer, primary_key=True),
                   Column("nombre", String(50)),
                   Column("apellido", String(50)),
                   Column("correo", String(50)),
                   Column("password", String(50)),
                   Column("avatar", String(50)))

meta.create_all(engine)