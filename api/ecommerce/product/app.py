from ecommerce.product.repository import ProductsRepository


class ProductsService:
    def __init__(self, db):
        self.__repository = ProductsRepository(db=db)

    def list_products(self):
        return self.__repository.list_products()

    def list_categories(self):
        return self.__repository.list_categories()

    def get_product(self, id):
        return self.__repository.get_product(id=id)
