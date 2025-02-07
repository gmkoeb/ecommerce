from datetime import datetime, timedelta, timezone
from ecommerce.user.app import UsersService


class TestUsersService:
    def test_list_users(self, users_service: UsersService):
        first_user = users_service.create_user(
            name="Test User", password="password", email="user@email.com"
        )
        second_user = users_service.create_user(
            name="Test User 2", password="password", email="user2@email.com"
        )

        users = users_service.list_users()

        assert len(users) == 2
        assert users == [first_user, second_user]

    def test_create_user(self, users_service: UsersService):
        user = users_service.create_user(
            name="Test User", password="password", email="user@email.com"
        )

        assert len(users_service.list_users()) == 1
        assert user.name == "Test User"
        assert user.email == "user@email.com"
        assert user.password != "password"

    def test_email_uniqueness(self, users_service: UsersService):
        users_service.create_user(
            name="Test User", password="password", email="user@email.com"
        )

        users_service.create_user(
            name="Test User", password="password", email="user@email.com"
        )

        assert len(users_service.list_users()) == 1

    def test_decode_jwt(self, users_service: UsersService):
        token = users_service.generate_jwt(user_id=1)

        result = users_service.decode_jwt(token=token)
        token_expiration_time = int(
            (datetime.now(timezone.utc) + timedelta(days=1)).timestamp()
        )

        assert result["user_id"] == 1
        assert result["exp"] == token_expiration_time

    def test_authenticate_user(self, users_service: UsersService):
        user = users_service.create_user(
            name="Test User", password="password", email="user@email.com"
        )

        result = users_service.authenticate_user("user@email.com", password="password")

        assert result == user

    def test_failed_authentication_wrong_password(self, users_service: UsersService):
        users_service.create_user(
            name="Test User", password="password", email="user@email.com"
        )

        result = users_service.authenticate_user("user@email.com", password="passwordd")

        assert result == None

    def test_failed_authentication_non_existent_email(
        self, users_service: UsersService
    ):
        result = users_service.authenticate_user("user@email.com", password="passwordd")

        assert result == None
