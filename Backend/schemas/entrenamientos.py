from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Entrenamientos(BaseModel):
    id: Optional[int]
    nombre: str
    dia_semana:str
    fecha_creacion:datetime
    id_sesion: int