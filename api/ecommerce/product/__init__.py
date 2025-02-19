from sqlalchemy import Column, ForeignKey, Integer, String
from ecommerce.database.database import get_db
from ecommerce.database.base import Base
from sqlalchemy.orm import relationship
from ecommerce.company import Company as Company
from ecommerce.category import Category as Category
from ecommerce.product_category import ProductCategory as ProductCategory


class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    model = Column(String)
    description = Column(String)

    company_id = Column(Integer, ForeignKey("companies.id", ondelete="CASCADE"))
    company = relationship("Company", back_populates="products")
    categories = relationship(
        "Category", secondary="product_categories", back_populates="products"
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.errors = []
        self.required_fields = {
            "name": "Name can't be blank.",
            "price": "Price can't be blank.",
        }

    def to_dict(self) -> dict[str, str | dict[str, str]]:
        """Converts an Product instance into a dictionary"""
        return {
            "id": str(self.id),
            "name": str(self.name),
            "price": str(self.price),
            "model": str(self.model),
            "description": str(self.description),
            "company": self.get_company().to_dict(),
        }

    def get_company(self) -> Company:
        db_session = get_db()
        company = db_session.get(Company, self.company_id)
        assert company is not None, "Company not found"

        return company
