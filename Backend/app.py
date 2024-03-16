from fastapi import FastAPI
from routes.entrenador import entrenador
from routes.cliente import cliente
from routes.peso import pesos
from routes.tarea import tarea
from routes.sesion import ruta_sesiones
from routes.ejercicio import ruta_ejercicios


from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# Configuración del CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

app.include_router(entrenador)
app.include_router(cliente)
app.include_router(pesos)
app.include_router(tarea)
app.include_router(ruta_sesiones)
app.include_router(ruta_ejercicios)




