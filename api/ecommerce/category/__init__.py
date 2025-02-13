from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from ecommerce.database.base import Base


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False, unique=True)

    products = relationship(
        "Product", secondary="product_categories", back_populates="categories"
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.errors = []
