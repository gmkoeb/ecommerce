from sqlalchemy import Column, ForeignKey, Integer
from ecommerce.database.base import Base
from sqlalchemy.orm import Session
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
        from ecommerce import app
        from flask import current_app

        with app.app_context():
            db: Session = current_app.config["DB_SESSION"]
            return db.get(Product, self.product_id)

    def category(self) -> "Category | None":
        from ecommerce.category import Category
        from ecommerce import app
        from flask import current_app

        with app.app_context():
            db: Session = current_app.config["DB_SESSION"]

            return db.get(Category, self.category_id)
