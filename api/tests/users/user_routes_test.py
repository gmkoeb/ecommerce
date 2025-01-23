from ecommerce.user.app import UsersService
from unittest.mock import patch

class TestUserRoutes:
    def test_post_user_sign_up(self, client):
        data = {"user": {"name": "Test User", "password": "password", "email": "user@email.com"}}
        response = client.post("/api/v1/sign_up", json=data)

        json_response = response.json

        assert response.status_code == 201
        assert json_response["user"]["name"] == "Test User"
        assert json_response["user"]["email"] == "user@email.com"
        assert json_response["user"]["password"] != "password"
    
    def test_post_user_sign_up_email_uniqueness(self, client, users_service: UsersService):
        users_service.create_user(name="Test User", password="password", email="user@email.com")
        data = {"user": {"name": "Test User", "password": "password", "email": "user@email.com"}}

        response = client.post("/api/v1/sign_up", json=data)
        json_response = response.json

        assert response.status_code == 400
        assert "Email already in use" in json_response["errors"] 

    def test_post_user_sign_in(self, client, users_service: UsersService):
        users_service.create_user(name="Test User", password="password", email="user@email.com")
        data = {"user": {"email": "user@email.com", "password": "password"}}
        with patch.object(UsersService, 'generate_jwt', return_value="mocked_token") as mock_generate_jwt:
            response = client.post("/api/v1/sign_in", json=data)
            json_response = response.json

            assert response.status_code == 200

            mock_generate_jwt.assert_called_once_with(user_id=1)

            assert json_response["user"]["name"] == "Test User"
            assert json_response["user"]["token"] == "mocked_token"

    def test_post_user_sign_in_wrong_credentials(self, client):
        data = {"user": {"email": "user@email.com", "password": "password"}}
        response = client.post("/api/v1/sign_in", json=data)
        json_response = response.json

        assert response.status_code == 400

        assert json_response["error"] == "Authentication failed: Wrong email or password"