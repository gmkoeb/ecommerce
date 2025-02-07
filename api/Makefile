mypy:
	mypy ecommerce

ruff:
	ruff check ecommerce --fix

black: 
	black ecommerce

seed:
	python -m ecommerce.database.seeds.db_seed

lint: black ruff mypy
