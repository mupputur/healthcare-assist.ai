from fastapi import APIRouter
from schemas.users_schema import UserRegistration, UserLogin, UserResponse
from database import db_tb_users
from utils.password import hash_password, verify_password
from auth.token import get_token

router = APIRouter(prefix='/api/v1/users',  tags=["Users"])


@router.post("/register/", response_model=UserResponse)
def register(user_info: UserRegistration):
    if user_info.email in db_tb_users:
        raise HTTPException(status_code=400, detail="Email already registred")
    
    response = user_info.dict()
    response["password"] = hash_password(response["password"])
    db_tb_users[user_info.email] = response
    return {"name": user_info.first_name, "email": user_info.email}


@router.post("/login/")
def login(user_info: UserLogin):
    db_user = db_tb_users.get(user_info.email)
    if not db_user:
        raise HTTPException(status_code=404, details="User not found")

    if not verify_password(user_info.password, db_user.get('password')):
        raise HTTPException(status_code=404, details="In correct password")

    token_data = {"sub": user_info.email}
    token_details = get_token(token_data)

    response = {
        "access_token" : token_details.get("access_token"),
        "refresh_token" : token_details.get("refresh_token"),
        "token_type" : "bearer",
        "message" : "Login successful", 
        "user" : {
            "name": db_user["first_name"],
            "email": db_user["email"]
        }
    }
    return response

