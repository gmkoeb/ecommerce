""""Users service"""

from ecommerce.user.repository import UsersRepository
from ecommerce.user import User

import bcrypt


class UsersService:
    def __init__(self, db) -> None:
        self.__repository = UsersRepository(db=db)

    def create_user(self, name, password, email) -> User:
        hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
        user = self.__repository.create_user(
            name=name, password=str(hashed_password), email=email
        )
        return user

    def list_users(self) -> list[User] | list:
        users = self.__repository.list_users()
        return users
