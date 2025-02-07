from sqlalchemy.orm import Session

from ecommerce.product import Product


class ProductsRepository:
    def __init__(self, db: Session):
        self.__db = db

    def create_product(
        self,
        company_id: int,
        name: str = "",
        category: str = "",
        price: int = 0,
        model: str = "",
        description: str = "",
    ) -> Product:
        new_product = Product(
            company_id=company_id,
            name=name,
            category=category,
            price=price,
            model=model,
            description=description,
        )
        errors = self.__validate_product(product=new_product)
        if errors:
            new_product.errors = errors
            return new_product
        else:
            try:
                self.__db.add(new_product)
                self.__db.commit()
                self.__db.refresh(new_product)
                return new_product
            except Exception:
                self.__db.rollback()
            raise

    def list_products(self) -> list[Product]:
        products = self.__db.query(Product).all()
        return products

    def list_categories(self):
        categories = self.__db.query(Product.category).distinct().all()
        return [category[0] for category in categories]

    def __validate_product(self, product: Product) -> list:
        errors = []
        for field, error_message in product.required_fields.items():
            value = getattr(product, field, "")
            if isinstance(value, str):
                if not value.strip():
                    errors.append(error_message)
            else:
                if value == 0:
                    errors.append(error_message)

        return errors
