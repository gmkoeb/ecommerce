"""Repository for Companies"""

from ecommerce.company import Company
from sqlalchemy.orm import Session
import re


class CompaniesRepository:
    def __init__(self, db: Session):
        self.__db = db

    def create_company(
        self,
        corporate_name: str = "",
        brand_name: str = "",
        full_address: str = "",
        city: str = "",
        state: str = "",
        email: str = "",
        registration_number: str = "",
    ) -> Company:
        new_company = Company(
            corporate_name=corporate_name,
            brand_name=brand_name,
            full_address=full_address,
            city=city,
            state=state,
            email=email,
            registration_number=registration_number,
        )
        errors = self.__validate_company(company=new_company)
        if errors:
            new_company.errors = errors
            return new_company
        else:
            try:
                self.__db.add(new_company)
                self.__db.commit()
                self.__db.refresh(new_company)
                return new_company
            except Exception as e:
                self.__db.rollback()
                if "companies.email" in str(e).lower():
                    new_company.errors.append("Email already in use")
                    return new_company
                raise e

    def list_companies(self) -> list[Company]:
        companies = self.__db.query(Company).all()
        return companies

    def __validate_company(self, company: Company) -> list:
        email_validate_pattern = r"[^@]+@[^@]+\.[^@]+"
        errors = []
        for field, error_message in company.required_fields.items():
            if not getattr(company, field, "").strip():
                errors.append(error_message)

        if company.email and not re.match(
            email_validate_pattern, company.email.strip()
        ):
            errors.append("Invalid email")
        return errors
