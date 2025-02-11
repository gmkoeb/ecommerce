from flask import Flask
from ecommerce.user.web import bp as users_bp
from ecommerce.product.web import bp as products_bp
from ecommerce.category.web import bp as categories_bp
from ecommerce.database.database import SessionLocal
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config["DB_SESSION"] = SessionLocal()
app.register_blueprint(users_bp, url_prefix="/api/v1")
app.register_blueprint(products_bp, url_prefix="/api/v1")
app.register_blueprint(categories_bp, url_prefix="/api/v1")
