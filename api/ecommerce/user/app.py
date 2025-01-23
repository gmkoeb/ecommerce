""""Users service"""

from ecommerce.user.repository import UsersRepository
from ecommerce.user import User

import bcrypt
import jwt
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone
import os

class UsersService:
    def __init__(self, db) -> None:
        self.__repository = UsersRepository(db=db)

    def create_user(self, name: str, password: str, email: str) -> User:
        hashed_password = self.__hash_password(password=password)
        user = self.__repository.create_user(
            name=name, password=str(hashed_password), email=email
        )
        return user

    def list_users(self) -> list[User] | list:
        users = self.__repository.list_users()
        return users

    def authenticate_user(self, email: str, password: str) -> User | None:
        user = self.__repository.find_user_by_email(email=email)
        if user and bcrypt.checkpw(password.encode(), user.password.encode()):
            return user
        return None

    def generate_jwt(self, user_id: int) -> str:
        load_dotenv()
        expiration_time = datetime.now(timezone.utc) + timedelta(days=1)
        payload = {
            "user_id": user_id,
            "exp": expiration_time 
        }
        token = jwt.encode(payload, os.getenv("JWT_SECRET"), algorithm="HS256")
        return token
    
    def decode_jwt(self, token: str) -> dict:
        load_dotenv()
        decoded = jwt.decode(token, os.getenv("JWT_SECRET"), algorithms=["HS256"])
        return decoded

    def __hash_password(self, password: str):
        return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
            