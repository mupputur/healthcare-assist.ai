from jose import jwt
from datetime import datetime, timedelta
import os
from utils.vault_secrets import get_secrets

SECRET_KEY = get_secrets()
ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 15
REFRESH_TOKEN_EXPIRE_DAYS = 7

def create_access_token(data: dict):
    token_data = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    token_data.update({"exp": expire})
    access_token = jwt.encode(token_data, SECRET_KEY, ALGORITHM)
    return access_token

def create_refresh_token(data: dict):
    token_data = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=REFRESH_TOKEN_EXPIRE_DAYS)
    token_data.update({"exp": expire})
    refresh_token = jwt.encode(token_data, SECRET_KEY, ALGORITHM)
    return refresh_token

def get_token(data: dict):
    access_token = create_access_token(data)
    refresh_token = create_refresh_token(data)
    return {"access_token": access_token, "refresh_token": refresh_token}
