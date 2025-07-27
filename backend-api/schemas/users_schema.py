from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import date, datetime

class UserRegistration(BaseModel):
    first_name: str = Field(..., max_length=100)
    middle_name: Optional[str] = Field(None, max_length=100)
    last_name: str = Field(..., max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=6)
    mobile: str = Field(..., max_length=20)
    dob: date
    gender: str = Field(..., max_length=20)
    country: str = Field(..., max_length=50)
    state: str = Field(..., max_length=50)
    city: str = Field(..., max_length=50)
    zip_code: str = Field(..., max_length=10)
    street_address: Optional[str] = Field(None, max_length=255)

class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    name: str
    email: EmailStr