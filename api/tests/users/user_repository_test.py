from ecommerce.user.repository import UsersRepository

class TestUsersRepository:
    def test_create_user(self, test_db):
        users_repository = UsersRepository(db=test_db)
        
        user = users_repository.create_user(name='User Test', email='email@email.com', password='123456')
        users = users_repository.list_users()

        assert len(users) == 1
        assert user.name == 'User Test'
        assert user.email == 'email@email.com'
        
    def test_second_create_user(self, test_db):
        users_repository = UsersRepository(db=test_db)
        
        user = users_repository.create_user(name='User Test', email='email@email.com', password='123456')
        users = users_repository.list_users()
        
        assert len(users) == 1
        assert user.name == 'User Test'
        assert user.email == 'email@email.com'