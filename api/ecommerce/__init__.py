from flask import Flask
from ecommerce.user.web import bp as users_bp
from ecommerce.database.database import SessionLocal

app = Flask(__name__)
app.config["DB_SESSION"] = SessionLocal()
app.register_blueprint(users_bp, url_prefix="/api/v1")
