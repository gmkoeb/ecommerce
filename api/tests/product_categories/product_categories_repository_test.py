from ecommerce.category.repository import CategoriesRepository
from ecommerce.product_category.repository import ProductCategoriesRepository
from ecommerce.product.repository import ProductsRepository
from ecommerce.company.repository import CompaniesRepository


class TestProductCategories:

    def test_create_product_category(self, test_db):
        companies_repository = CompaniesRepository(db=test_db)
        products_repository = ProductsRepository(db=test_db)
        product_categories_repository = ProductCategoriesRepository(db=test_db)
        categories_repository = CategoriesRepository(db=test_db)
        company = companies_repository.create_company(corporate_name='Razer Unlimited', brand_name='Razer', 
                                                        full_address='Test street, 3903.', city='Test City', 
                                                        state='Test State', email='email@test.com', 
                                                        registration_number='123456789')
        product = products_repository.create_product(company_id=company.id, name="Razer Keyboard", 
                                                        price=100000, model="Razer Bla", 
                                                        description="Gaming keyboard for games")
        category = categories_repository.create_category(name="Keyboards")
        product_category = product_categories_repository.create_product_category(product=product, category=category)

        assert product_category.product() == product
        assert product_category.category() == category