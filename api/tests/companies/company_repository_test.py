from ecommerce.company.repository import CompaniesRepository


class TestCompanyClass:
    def test_corporate_name_cant_be_blank(self, test_db):
        companies_repository = CompaniesRepository(db=test_db)

        company = companies_repository.create_company(corporate_name='', brand_name='Razer', 
                                                      full_address='Test street, 3903.', city='Test City', 
                                                      state='Test State', email='email@test.com', 
                                                      registration_number='123456789')

        assert "Corporate name can't be blank." in company.errors
    
    def test_brand_name_cant_be_blank(self, test_db):
        companies_repository = CompaniesRepository(db=test_db)

        company = companies_repository.create_company(corporate_name='Razer Unlimited', brand_name='', 
                                                      full_address='Test street, 3903.', city='Test City', 
                                                      state='Test State', email='email@test.com', 
                                                      registration_number='123456789')

        assert "Brand name can't be blank." in company.errors

    def test_full_address_cant_be_blank(self, test_db):
        companies_repository = CompaniesRepository(db=test_db)

        company = companies_repository.create_company(corporate_name='Razer Unlimited', brand_name='Razer', 
                                                      full_address='', city='Test City', 
                                                      state='Test State', email='email@test.com', 
                                                      registration_number='123456789')

        assert "Full address can't be blank." in company.errors

    def test_city_cant_be_blank(self, test_db):
        companies_repository = CompaniesRepository(db=test_db)

        company = companies_repository.create_company(corporate_name='Razer Unlimited', brand_name='Razer', 
                                                      full_address='Test street, 3903.', city='', 
                                                      state='Test State', email='email@test.com', 
                                                      registration_number='123456789')

        assert "City can't be blank." in company.errors

    def test_state_cant_be_blank(self, test_db):
        companies_repository = CompaniesRepository(db=test_db)

        company = companies_repository.create_company(corporate_name='Razer Unlimited', brand_name='Razer', 
                                                        full_address='Test street, 3903.', city='Test', 
                                                        state='', email='email@test.com', 
                                                        registration_number='123456789')

        assert "State can't be blank." in company.errors

    def test_email_cant_be_blank(self, test_db):
        companies_repository = CompaniesRepository(db=test_db)

        company = companies_repository.create_company(corporate_name='Razer Unlimited', brand_name='Razer', 
                                                        full_address='Test street, 3903.', city='Test', 
                                                        state='Test State', email='', 
                                                        registration_number='123456789')

        assert "Email can't be blank." in company.errors

    def test_email_must_be_valid(self, test_db):
        companies_repository = CompaniesRepository(db=test_db)

        company = companies_repository.create_company(corporate_name='Razer Unlimited', brand_name='Razer', 
                                                        full_address='Test street, 3903.', city='Test', 
                                                        state='Test State', email='email', 
                                                        registration_number='123456789')

        assert "Invalid email" in company.errors

    def test_registration_number_cant_be_blank(self, test_db):
        companies_repository = CompaniesRepository(db=test_db)

        company = companies_repository.create_company(corporate_name='Razer Unlimited', brand_name='Razer', 
                                                        full_address='Test street, 3903.', city='Test', 
                                                        state='Test State', email='email@email.com', 
                                                        registration_number='')

        assert "Registration number can't be blank." in company.errors