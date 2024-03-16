from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from config.db import meta, engine
from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String

ejercicios = Table("ejercicios", meta,
                   Column("id", Integer, primary_key=True, autoincrement=True),
                   Column("nombre",String(255)),
                   Column("id_entrenamiento", Integer, ForeignKey('entrenamientos.id'))
                   )

meta.create_all(engine)