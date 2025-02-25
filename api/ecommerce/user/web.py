"""Users routes"""

from flask import Blueprint, request, current_app

from ecommerce.user.app import UsersService

bp = Blueprint("users", __name__)


def init_service():
    global service
    db = current_app.config["DB_SESSION"]
    service = UsersService(db=db)


@bp.before_app_request
def setup_service():
    init_service()


@bp.route("/sign_up", methods=(["POST"]))
def sign_up():
    user_data = request.json["user"]
    name = user_data["name"]
    password = user_data["password"]
    email = user_data["email"]
    user = service.create_user(name=name, password=password, email=email)
    if len(user.errors) > 0:
        return {"errors": user.errors}, 400
    else:
        return {"user": user.to_dict()}, 201


@bp.route("/sign_in", methods=(["POST"]))
def sign_in():
    user_data = request.json["user"]
    user = service.authenticate_user(user_data["email"], user_data["password"])
    if user:
        return {
            "user": {"name": user.name, "token": service.generate_jwt(user_id=user.id)}
        }, 200
    else:
        return {"errors": ["Authentication failed: Wrong email or password"]}, 400
