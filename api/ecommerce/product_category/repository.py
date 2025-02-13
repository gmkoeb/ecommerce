from ecommerce.product_category import ProductCategory
from ecommerce.category import Category
from ecommerce.product import Product


class ProductCategoriesRepository:
    def __init__(self, db):
        self.__db = db

    def create_product_category(
        self, product: Product, category: Category
    ) -> ProductCategory:
        new_product_category = ProductCategory(
            product_id=product.id, category_id=category.id
        )

        try:
            self.__db.add(new_product_category)
            self.__db.commit()
            self.__db.refresh(new_product_category)
            return new_product_category
        except Exception:
            self.__db.rollback()
        raise
