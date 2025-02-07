from ecommerce.product.repository import ProductsRepository
from ecommerce.company.repository import CompaniesRepository


class TestProductsRepository():
    def test_create_product_success(self, test_db):
        companies_repository = CompaniesRepository(db=test_db)
        products_repository = ProductsRepository(db=test_db)

        company = companies_repository.create_company(corporate_name='Razer Unlimited', brand_name='Razer', 
                                                        full_address='Test street, 3903.', city='Test City', 
                                                        state='Test State', email='email@test.com', 
                                                        registration_number='123456789')
        product = products_repository.create_product(company_id=company.id, name="Gaming Keyboard", 
                                                     category="Keyboards", price=1000, model="Razer Bla", 
                                                     description="Gaming keyboard for games")

        assert product.errors == []
        assert product.company_id == 1

    def test_name_cant_be_blank(self, test_db):
        companies_repository = CompaniesRepository(db=test_db)
        products_repository = ProductsRepository(db=test_db)

        company = companies_repository.create_company(corporate_name='Razer Unlimited', brand_name='Razer', 
                                                        full_address='Test street, 3903.', city='Test City', 
                                                        state='Test State', email='email@test.com', 
                                                        registration_number='123456789')
        product = products_repository.create_product(company_id=company.id, name="", category="Keyboards", 
                                                     price=1000, model="Razer Bla", 
                                                     description="Gaming keyboard for games")

        assert "Name can't be blank." in product.errors

    def test_category_cant_be_blank(self, test_db):
        companies_repository = CompaniesRepository(db=test_db)
        products_repository = ProductsRepository(db=test_db)

        company = companies_repository.create_company(corporate_name='Razer Unlimited', brand_name='Razer', 
                                                        full_address='Test street, 3903.', city='Test City', 
                                                        state='Test State', email='email@test.com', 
                                                        registration_number='123456789')
        product = products_repository.create_product(company_id=company.id, name="Razer Keyboard", 
                                                     category="", price=1000, model="Razer Bla", 
                                                     description="Gaming keyboard for games")

        assert "Category can't be blank." in product.errors

    def test_price_cant_be_zero(self, test_db):
        companies_repository = CompaniesRepository(db=test_db)
        products_repository = ProductsRepository(db=test_db)

        company = companies_repository.create_company(corporate_name='Razer Unlimited', brand_name='Razer', 
                                                        full_address='Test street, 3903.', city='Test City', 
                                                        state='Test State', email='email@test.com', 
                                                        registration_number='123456789')
        product = products_repository.create_product(company_id=company.id, name="Razer Keyboard", 
                                                     category="Keyboards", price=0, model="Razer Bla", 
                                                     description="Gaming keyboard for games")

        assert "Price can't be blank." in product.errors
    
    def test_list_products(self, test_db):
        companies_repository = CompaniesRepository(db=test_db)
        products_repository = ProductsRepository(db=test_db)

        company = companies_repository.create_company(corporate_name='Razer Unlimited', brand_name='Razer', 
                                                        full_address='Test street, 3903.', city='Test City', 
                                                        state='Test State', email='email@test.com', 
                                                        registration_number='123456789')
        first_product = products_repository.create_product(company_id=company.id, name="Razer Keyboard", 
                                                           category="Keyboards", price=2000, model="Razer Bla 2", 
                                                           description="Gaming keyboard for games")
        second_product = products_repository.create_product(company_id=company.id, name="Razer Keyboard", 
                                                            category="Keyboards", price=1000, model="Razer Bla", 
                                                            description="Gaming keyboard for games")

        products = products_repository.list_products()
        
        assert len(products) == 2
        assert products == [first_product, second_product]