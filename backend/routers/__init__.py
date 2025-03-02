from .it_dept import router as it_dept
from .login import router as login
from .admin import router as admin
from .citizens import router as citizens
from .edu_dept import router as edu_dept
from .citizen_initial.family_data import router as family_data
from .citizen_initial.land_records import router as land_records
from .it_init.it_analytics import router as it_analytics
from .citizen_initial.medical_data import router as medical_data
from .citizen_initial.taxes import router as taxes
from .citizen_initial.vaccine import router as vaccines
from .citizen_initial.environment import router as environment
from .citizen_initial.geo import router as geo
from .citizen_initial.asset import router as assets
from .welfare_init.edu_single_girl import router as esg
from .welfare_init.vaccination_query import router as vaccination_query
from .posts.posts import router as posts
from .posts.birth_event import router as birth_event
from .posts.citizen_creator import router as citizen_creator
from .updates.tax_update import router as tax_update
from .welfare_init.medical_condition import router as medical_condition
from .welfare_init.mgnrega import router as mgnrega
from .posts.asset_management import router as asset_management
from .update_citizen import router as update_citizen