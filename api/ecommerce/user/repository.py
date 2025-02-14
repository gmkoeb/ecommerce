"""Repository for Users"""

from ecommerce.user import User
from sqlalchemy.orm import Session


class UsersRepository:
    def __init__(self, db: Session):
        self.__db = db

    def create_user(self, name: str = "", email: str = "", password: str = "") -> User:
        """Inserts a user into the database"""
        new_user = User(name=name, email=email, password=password)

        if self.find_user_by_email(email=str(new_user.email)):
            new_user.errors.append("Email already in use")
            return new_user

        self.__db.add(new_user)
        self.__db.commit()
        self.__db.refresh(new_user)
        return new_user

    def list_users(self) -> list[User]:
        """List all registered users"""
        users = self.__db.query(User).all()
        return users

    def find_user_by_email(self, email: str) -> User | None:
        """Finds and returns an User by email"""
        user = self.__db.query(User).filter_by(email=email).first()
        return user
