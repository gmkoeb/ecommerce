"""Repository for Users"""

from ecommerce.user import User


class UsersRepository:
    def __init__(self, db):
        self.__db = db

    def create_user(
        self, name: str = "", email: str = "", password: str = ""
    ) -> User | None:
        """Inserts a user into the database"""
        new_user = User(name=name, email=email, password=password)

        try:
            self.__db.add(new_user)
            self.__db.commit()
            self.__db.refresh(new_user)
            return new_user
        except Exception as e:
            self.__db.rollback()
            raise e

    def list_users(self) -> list[User]:
        """List all registered users"""
        users = self.__db.query(User).all()
        return users
