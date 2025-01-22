""""Users service"""

from ecommerce.user import User
import bcrypt

class UsersService:
    def __init__(self, repository) -> None:
        self.__repository = repository

    def create_user(self, name, password, email) -> User | str:
        hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
        try:
            user = self.__repository.create_user(name=name, password=hashed_password, email=email)
            return user
        except Exception as e:
            return f"Error creating user ${e}."
    
    def list_users(self) -> list[User] | list:
        users = self.__repository.list_users()
        return users