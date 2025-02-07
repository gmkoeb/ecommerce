from ecommerce.product.repository import ProductsRepository
from ecommerce.company.repository import CompaniesRepository


class TestProductsRepository():
    def test_get_products(self, test_db, client):
        companies_repository = CompaniesRepository(db=test_db)
        products_repository = ProductsRepository(db=test_db)

        company = companies_repository.create_company(corporate_name='Razer Unlimited', brand_name='Razer', 
                                                        full_address='Test street, 3903.', city='Test City', 
                                                        state='Test State', email='email@test.com', 
                                                        registration_number='123456789')
        products_repository.create_product(company_id=company.id, name="Gaming Keyboard", 
                                           category="Keyboards", price=1000, model="Razer Bla", 
                                           description="Gaming keyboard for games")
        products_repository.create_product(company_id=company.id, name="Gaming Mouse", 
                                           category="Mouses", price=1000, model="Razer Mouse", 
                                           description="Gaming mouse for games")
        

        response = client.get("/api/v1/products")
        json_response = response.json

        assert response.status_code == 200
        assert len(json_response["products"]) == 2 

    def test_get_categories(self, test_db, client):
        companies_repository = CompaniesRepository(db=test_db)
        products_repository = ProductsRepository(db=test_db)

        company = companies_repository.create_company(corporate_name='Razer Unlimited', brand_name='Razer', 
                                                        full_address='Test street, 3903.', city='Test City', 
                                                        state='Test State', email='email@test.com', 
                                                        registration_number='123456789')
        products_repository.create_product(company_id=company.id, name="Gaming Keyboard", 
                                           category="Keyboards", price=1000, model="Razer Bla", 
                                           description="Gaming keyboard for games")
        products_repository.create_product(company_id=company.id, name="Gaming Mouse", 
                                           category="Mouses", price=1000, model="Razer Mouse", 
                                           description="Gaming mouse for games")
        

        response = client.get("/api/v1/categories")
        json_response = response.json

        assert response.status_code == 200
        assert len(json_response["categories"]) == 2 
        assert json_response["categories"] == ["Keyboards", "Mouses"]