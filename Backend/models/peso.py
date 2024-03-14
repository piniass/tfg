from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from config.db import meta, engine
from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, Float, DateTime

registro_pesos = Table("registro_pesos", meta,
                   Column("id", Integer, primary_key=True, autoincrement=True),
                   Column("peso", Float(precision=2)),
                   Column("fecha", DateTime, default=func.now()),
                   Column("id_cliente", Integer, ForeignKey('clientes.id'))
                   )

meta.create_all(engine)