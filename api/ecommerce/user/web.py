"""Users routes"""

from flask import Blueprint, request

from ecommerce.user.app import UsersService
from ecommerce.database.database import SessionLocal

bp = Blueprint("users", __name__)

db = SessionLocal()
service = UsersService(db=db)


@bp.route("/sign_up", methods=(["POST"]))
def create():
    user_data = request.json["user"]
    name = user_data["name"]
    password = user_data["password"]
    email = user_data["email"]
    user = service.create_user(name=name, password=password, email=email)
    if len(user.errors) > 0:
        return {"errors": user.errors}, 400
    else:
        return {"user": user.to_dict()}, 201
