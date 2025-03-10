"""change price to integer

Revision ID: 983c33a64974
Revises: f7dd0de0429e
Create Date: 2025-02-06 14:25:24.696213

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '983c33a64974'
down_revision: Union[str, None] = 'f7dd0de0429e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('products', 'price',
               existing_type=sa.VARCHAR(),
               type_=sa.Integer(),
               existing_nullable=False, 
               postgresql_using='price::integer'),
               
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('products', 'price',
               existing_type=sa.Integer(),
               type_=sa.VARCHAR(),
               existing_nullable=False)
    # ### end Alembic commands ###
