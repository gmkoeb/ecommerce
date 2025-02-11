from ecommerce.category import Category
from sqlalchemy.orm import Session


class CategoriesRepository:
    def __init__(self, db: Session):
        self.__db = db

    def create_category(self, name: str = "") -> Category:
        new_category = Category(name=name)
        if new_category.name == "":
            new_category.errors.append("Name can't be blank.")
        if new_category.errors:
            return new_category
        else:
            try:
                self.__db.add(new_category)
                self.__db.commit()
                self.__db.refresh(new_category)
                return new_category
            except Exception:
                self.__db.rollback()
            raise

    def list_categories(self) -> list[Category]:
        categories = self.__db.query(Category).all()
        return categories
