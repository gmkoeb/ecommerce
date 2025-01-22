"""Users routes"""


from flask import Blueprint, jsonify, request

from ecommerce.user.app import UsersService
from ecommerce.user.repository import UsersRepository
from ecommerce.database.database import SessionLocal
bp = Blueprint("users", __name__)

service = UsersService(repository=UsersRepository(db=SessionLocal()))

@bp.route("/sign_up", methods=('POST'))
def create():
    name = request.form['name']
    password = request.form['password']
    email = request.form['email']

    try:
        user = service.create_user(name=name, password=password, email=email)        
        return jsonify(user), 201
    except Exception as e:
        return jsonify({"error": f"An error occurred while creating user: {e}"})
