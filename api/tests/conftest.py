import pytest
import os

os.environ["FLASK_ENV"] = "test"


@pytest.fixture(scope="function")
def test_db():
    from ecommerce.database.base import Base
    from sqlalchemy.orm import sessionmaker
    from sqlalchemy import create_engine

    engine = create_engine("sqlite:///:memory:")
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()
    Base.metadata.create_all(engine)
    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)

@pytest.fixture(autouse=True)
def setup_db_environment(test_db):
    from ecommerce import app

    with app.test_client():
        app.config["DB_SESSION"] = test_db
        yield

@pytest.fixture()
def users_service(test_db):
    from ecommerce.user.app import UsersService

    users_test_service = UsersService(db=test_db)
    yield users_test_service

@pytest.fixture()
def products_service(test_db):
    from ecommerce.product.app import ProductsService

    products_test_service = ProductsService(db=test_db)
    yield products_test_service
    
@pytest.fixture()
def client(test_db):
    from ecommerce import app

    with app.test_client() as client:
        app.config["DB_SESSION"] = test_db
        yield client
