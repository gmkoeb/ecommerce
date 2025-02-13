from ecommerce.category.repository import CategoriesRepository


class TestCategoryRepository:
    
    def test_create_category(self, test_db):
        categories_repository = CategoriesRepository(db=test_db)
        first_category = categories_repository.create_category(name="Keyboards")
        second_category = categories_repository.create_category(name="Mouses")
        
        assert first_category.name == "Keyboards"
        assert second_category.name == "Mouses"
    
    def test_list_categories(self, test_db):
        categories_repository = CategoriesRepository(db=test_db)
        first_category = categories_repository.create_category(name="Keyboards")
        second_category = categories_repository.create_category(name="Mouses")
        
        categories = categories_repository.list_categories()

        assert categories == [first_category, second_category]
    
    def test_find_category_by_name(self, test_db):
        categories_repository = CategoriesRepository(db=test_db)
        category = categories_repository.create_category(name="Mouses")
        
        found = categories_repository.find_category_by_name(name="Mouses")

        assert category == found