from ecommerce.user.app import UsersService


class TestUserRoutes:
    def test_post_create_user(self, client):
        data = {"user": {"name": "Test User", "password": "password", "email": "user@email.com"}}
        response = client.post("/api/v1/sign_up", json=data)

        json_response = response.json

        assert response.status_code == 201
        assert json_response["user"]["name"] == "Test User"
        assert json_response["user"]["email"] == "user@email.com"
        assert json_response["user"]["password"] != "password"
    
    def test_post_create_user_email_uniqueness(self, client, users_service: UsersService):
        users_service.create_user(name="Test User", password="password", email="user@email.com")
        data = {"user": {"name": "Test User", "password": "password", "email": "user@email.com"}}
        response = client.post("/api/v1/sign_up", json=data)

        json_response = response.json

        assert response.status_code == 400
        assert "Email already in use" in json_response["errors"] 
