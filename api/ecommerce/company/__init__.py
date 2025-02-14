"""Companies module"""

from sqlalchemy import Column, Integer, String
from ecommerce.database.base import Base
from sqlalchemy.orm import relationship


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
    products = relationship("Product", back_populates="company", cascade="all, delete")

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

    def to_dict(self) -> dict[str, str]:
        """Converts an Company instance into a dictionary"""
        return {
            "id": str(self.id),
            "corporate_name": str(self.corporate_name),
            "brand_name": str(self.brand_name),
            "full_address": str(self.full_address),
            "city": str(self.city),
            "state": str(self.state),
            "email": str(self.email),
            "registration_number": str(self.registration_number),
        }
