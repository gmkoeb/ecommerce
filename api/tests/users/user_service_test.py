from ecommerce.user.app import UsersService


class TestUsersService:
    def test_list_users(self, users_service: UsersService):
        first_user = users_service.create_user(name="Test User", password="password", email="user@email.com")
        second_user = users_service.create_user(name="Test User 2", password="password", email="user2@email.com")

        users = users_service.list_users()

        assert len(users) == 2
        assert users == [first_user, second_user]

    def test_create_user(self, users_service: UsersService):
        user = users_service.create_user(name="Test User", password="password", email="user@email.com")
        
        assert len(users_service.list_users()) == 1
        assert user.name == 'Test User'
        assert user.email == 'user@email.com'
        assert user.password != 'password'
    
    def test_email_uniqueness(self, users_service: UsersService):
        users_service.create_user(name="Test User", password="password", email="user@email.com")

        user = users_service.create_user(name="Test User", password="password", email="user@email.com")

        assert len(users_service.list_users()) == 1
        assert user == "This email address is already being used"