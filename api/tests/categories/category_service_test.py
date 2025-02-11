from ecommerce.category.app import CategoriesService
from ecommerce.category.repository import CategoriesRepository


class TestCategoryService:
    
    def test_list_categories(self, test_db):
        categories_repository = CategoriesRepository(db=test_db)
        service = CategoriesService(db=test_db)
        first_category = categories_repository.create_category(name="Keyboards")
        second_category = categories_repository.create_category(name="Mouses")
        
        categories = service.list_categories()

        assert len(categories) == 2
        assert categories == [first_category, second_category]