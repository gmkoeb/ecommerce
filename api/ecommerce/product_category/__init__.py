from sqlalchemy import Column, ForeignKey, Integer
from ecommerce.database.database import get_db
from ecommerce.database.base import Base
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from ecommerce.category import Category
    from ecommerce.product import Product


class ProductCategory(Base):
    __tablename__ = "product_categories"

    id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(
        Integer, ForeignKey("products.id", ondelete="CASCADE"), nullable=False
    )
    category_id = Column(
        Integer, ForeignKey("categories.id", ondelete="CASCADE"), nullable=False
    )

    def product(self) -> "Product | None":
        from ecommerce.product import Product

        db_session = get_db()
        return db_session.get(Product, self.product_id)

    def category(self) -> "Category | None":
        from ecommerce.category import Category

        db_session = get_db()
        return db_session.get(Category, self.category_id)
