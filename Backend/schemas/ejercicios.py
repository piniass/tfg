from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Ejercicios(BaseModel):
    id: Optional[int]
    nombre: str
    id_sesion: int