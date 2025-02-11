from ecommerce.category.repository import CategoriesRepository


class CategoriesService:
    def __init__(self, db):
        self.__repository = CategoriesRepository(db=db)

    def list_categories(self):
        categories = self.__repository.list_categories()
        return categories
