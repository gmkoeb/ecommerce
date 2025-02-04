"""Companies module"""

from sqlalchemy import Column, Integer, String
from ecommerce.database.base import Base


class Company(Base):
    __tablename__ = "companies"
    id = Column(Integer, primary_key=True, index=True)
    corporate_name = Column(String, nullable=False)
    brand_name = Column(String, nullable=False)
    full_address = Column(String, nullable=False)
    city = Column(String, nullable=False)
    state = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    registration_number = Column(Integer, nullable=False, unique=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.errors = []
        self.required_fields = {
            "corporate_name": "Corporate name can't be blank.",
            "brand_name": "Brand name can't be blank.",
            "full_address": "Full address can't be blank.",
            "city": "City can't be blank.",
            "state": "State can't be blank.",
            "email": "Email can't be blank.",
            "registration_number": "Registration number can't be blank.",
        }
