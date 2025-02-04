"""Companies module"""

from sqlalchemy import Column, Integer, String
from ecommerce.database.base import Base

class Company(Base):
    __tablename__ = 'companies'
    id = Column(Integer, primary_key=True, index=True)
    corporate_name = Column(String, nullable=False)
    brand_name = Column(String, nullable=False)
    full_address = Column(String, nullable=False)
    city = Column(String, nullable=False)
    state = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    registration_number = Column(Integer, nullable=False, unique=True)    
