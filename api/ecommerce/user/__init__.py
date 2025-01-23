"""Users module"""

from sqlalchemy import Column, Integer, String
from ecommerce.database.base import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True)
    password = Column(String)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.errors = []

    def to_dict(self) -> dict[str, str]:
        """Converts an User instance into a dictionary"""
        return {
            "id": str(self.id),
            "name": str(self.name),
            "email": str(self.email),
            "password": str(self.password),
        }
