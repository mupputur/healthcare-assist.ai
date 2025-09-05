from fastapi import FastAPI
from api import users_service
from api import provider_service
from api import benfit_service
from api import appointment_service
from api import remainder_service

app = FastAPI()
app.include_router(users_service.router)
app.include_router(provider_service.router)
app.include_router(benfit_service.router)
app.include_router(appointment_service.router)
app.include_router(remainder_service.router)