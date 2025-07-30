dev:
	uv run gunicorn -w 4 --reload --bind "0.0.0.0:5000" ecommerce:app
	
mypy:
	mypy ecommerce

ruff:
	ruff check ecommerce --fix

black: 
	black ecommerce

seed:
	uv run python -m ecommerce.database.seeds.db_seed

lint: black ruff mypy
