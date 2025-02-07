from flask import current_app
from ecommerce.product.repository import ProductsRepository
from ecommerce.company.repository import CompaniesRepository


def seed():
    db = current_app.config["DB_SESSION"]
    companies_repository = CompaniesRepository(db=db)
    products_repository = ProductsRepository(db=db)

    companies_data = [
        {"corporate_name": "Logitech Inc.", "brand_name": "Logitech", "full_address": "Tech Avenue, 1234.", "city": "Gadget City", "state": "Tech State", "email": "contact@logitech.com", "registration_number": "234567890"},
        {"corporate_name": "Corsair LLC", "brand_name": "Corsair", "full_address": "Performance Street, 5678.", "city": "Gaming Town", "state": "Elite State", "email": "support@corsair.com", "registration_number": "345678901"},
        {"corporate_name": "SteelSeries Ltd.", "brand_name": "SteelSeries", "full_address": "Esports Road, 9101.", "city": "Pro City", "state": "Tournament State", "email": "hello@steelseries.com", "registration_number": "456789012"},
        {"corporate_name": "HyperX Corp.", "brand_name": "HyperX", "full_address": "Memory Lane, 1121.", "city": "Speed City", "state": "Overclock State", "email": "info@hyperx.com", "registration_number": "567890123"},
        {"corporate_name": "ASUS ROG", "brand_name": "ROG", "full_address": "Republic Street, 3141.", "city": "Extreme City", "state": "Gaming State", "email": "contact@rog.com", "registration_number": "678901234"}
    ]

    products_data = [
        {"name": "Gaming Mouse", "category": "Mice", "price": 800, "model": "Model X", "description": "High precision gaming mouse."},
        {"name": "Mechanical Keyboard", "category": "Keyboards", "price": 1200, "model": "Mech Pro", "description": "RGB mechanical keyboard."},
        {"name": "Gaming Headset", "category": "Headsets", "price": 1500, "model": "Surround 7.1", "description": "Immersive sound gaming headset."},
        {"name": "Gaming Monitor", "category": "Monitors", "price": 3000, "model": "Ultra 144Hz", "description": "High refresh rate monitor."},
        {"name": "Mouse Pad", "category": "Accessories", "price": 200, "model": "XL Pad", "description": "Large gaming mouse pad."},
        {"name": "Streaming Microphone", "category": "Audio", "price": 1000, "model": "Studio Mic", "description": "Crystal clear voice microphone."},
        {"name": "Gaming Chair", "category": "Furniture", "price": 4000, "model": "Ergo Elite", "description": "Ergonomic gaming chair."},
        {"name": "RGB Light Strips", "category": "Accessories", "price": 500, "model": "Glow Strips", "description": "Customizable RGB lighting."},
        {"name": "Cooling Pad", "category": "Cooling", "price": 700, "model": "Chill Master", "description": "Cooling pad for gaming laptops."},
        {"name": "VR Headset", "category": "VR", "price": 6000, "model": "Virtual Pro", "description": "Immersive VR gaming headset."}
    ]

    for company_data in companies_data:
        company = companies_repository.create_company(**company_data)
        for product_data in products_data:
            products_repository.create_product(company_id=company.id, **product_data)

if __name__ == "__main__":
    from ecommerce import app

    with app.app_context():
        seed()