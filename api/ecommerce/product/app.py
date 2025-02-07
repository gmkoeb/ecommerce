from ecommerce.product.repository import ProductsRepository


class ProductsService:
    def __init__(self, db):
        self.__repository = ProductsRepository(db=db)
    

    def list_all(self):
        return self.__repository.list_products()