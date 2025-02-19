"""Products routes"""

from flask import Blueprint, current_app

from ecommerce.product.app import ProductsService

bp = Blueprint("products", __name__)


def init_service():
    global service
    db = current_app.config["DB_SESSION"]
    service = ProductsService(db=db)


@bp.before_app_request
def setup_service():
    init_service()


@bp.route("/products")
def index():
    products = service.list_products()
    return {"products": [product.to_dict() for product in products]}, 200


@bp.route("/products/<id>")
def show(id):
    product = service.get_product(id=id)
    return {"product": product.to_dict()}, 200
