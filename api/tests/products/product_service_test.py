from ecommerce.product.app import ProductsService
from ecommerce.product.repository import ProductsRepository
from ecommerce.company.repository import CompaniesRepository


class TestProductService:
    def test_list_products(self, test_db, products_service: ProductsService):
        companies_repository = CompaniesRepository(db=test_db)
        products_repository = ProductsRepository(db=test_db)
        company = companies_repository.create_company(corporate_name='Razer Unlimited', brand_name='Razer', 
                                                      full_address='Test street, 3903.', city='Test City', 
                                                      state='Test State', email='email@test.com', 
                                                      registration_number='123456789')
        first_product = products_repository.create_product(company_id=company.id, name="Gaming Keyboard", category="Keyboards", 
                                                           price=1000, model="Razer Bla", 
                                                           description="Gaming keyboard for games")
        second_product = products_repository.create_product(company_id=company.id, name="Gaming Keyboard", category="Keyboards", 
                                                            price=2000, model="Razer Bla 2", 
                                                            description="Gaming keyboard for games 2")
        

        products = products_service.list_all()

        assert len(products) == 2
        assert products == [first_product, second_product]

    def test_list_products_empty(self, products_service: ProductsService):
        products = products_service.list_all()

        assert len(products) == 0
        assert products == []
