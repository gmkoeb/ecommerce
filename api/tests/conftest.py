import pytest
import os

@pytest.fixture(autouse=True)
def set_env():
    os.environ["FLASK_ENV"] = "test"

@pytest.fixture(scope="function")
def test_db():
    from ecommerce.database.base import Base
    from ecommerce.database.database import SessionLocal
    from ecommerce.database.database import engine
    db = SessionLocal()
    Base.metadata.create_all(engine)
    try: 
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)
