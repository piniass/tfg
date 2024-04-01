from datetime import date
from pydantic import BaseModel
from typing import Optional

class Tarea(BaseModel):
    id: Optional[int]
    tarea: str
    fecha_creacion: date
    id_entrenador:int
    confirmado: bool  # Añadimos la columna confirmado
