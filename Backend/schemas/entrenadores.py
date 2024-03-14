from pydantic import BaseModel
from typing import Optional

class Entrenador(BaseModel):
    id: Optional[int]
    nombre: str
    apellido: str
    correo: str
    password: str
    avatar: str
