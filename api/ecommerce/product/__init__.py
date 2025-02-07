from sqlalchemy import Column, ForeignKey, Integer, String
from ecommerce.database.base import Base
from sqlalchemy.orm import relationship
from ecommerce.company import Company

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key = True, index = True)
    name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    model = Column(String)
    description = Column(String)
    
    company_id = Column(Integer, ForeignKey("companies.id", ondelete="CASCADE"))
    company = relationship("Company", back_populates="products")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.errors = []
        self.required_fields = {
            "name": "Name can't be blank.",
            "category": "Category can't be blank.",
            "price": "Price can't be blank.",
        }
    
    def to_dict(self) -> dict[str, str]:
        """Converts an Product instance into a dictionary"""
        return {
            "id": str(self.id),
            "name": str(self.name),
            "category": str(self.category),
            "price": str(self.price),
            "model": str(self.model),
            "description": str(self.description),
        }