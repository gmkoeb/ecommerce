"""Products routes"""

from flask import Blueprint, current_app

from ecommerce.category.app import CategoriesService

bp = Blueprint("categories", __name__)


def init_service():
    global service
    db = current_app.config["DB_SESSION"]
    service = CategoriesService(db=db)


@bp.before_app_request
def setup_service():
    init_service()


@bp.route("/categories")
def products():
    categories = service.list_categories()
    return {"categories": [category.name for category in categories]}, 200
