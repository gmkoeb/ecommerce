from ecommerce.category.repository import CategoriesRepository


class TestCategoryRoutes:
    
    def test_get_categories(self, test_db, client):
        categories_repository = CategoriesRepository(db=test_db)
        
        categories_repository.create_category(name="Keyboards")
        categories_repository.create_category(name="Mouses")
        
        response = client.get("/api/v1/categories")
        json_response = response.json

        assert response.status_code == 200
        assert len(json_response["categories"]) == 2 
        assert json_response["categories"] == ["Keyboards", "Mouses"]