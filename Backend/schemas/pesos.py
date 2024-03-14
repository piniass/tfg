from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class RegistroPesos(BaseModel):
    id: Optional[int]
    peso: float
    fecha: datetime
    id_cliente: int