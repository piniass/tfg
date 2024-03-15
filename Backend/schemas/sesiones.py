from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Sesiones(BaseModel):
    id: Optional[int]
    nombre: str
    fecha: datetime
    id_cliente: int