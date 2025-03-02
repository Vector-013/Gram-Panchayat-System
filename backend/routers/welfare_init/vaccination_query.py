from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import get_db
from schemas.vaccination_query import ChildVaccineQuery

router = APIRouter(prefix="/welfare", tags=["Vaccination Query"])


@router.post("/vaccines", response_model=dict)
def child_vaccine_query(query: ChildVaccineQuery, db: Session = Depends(get_db)):
    sql = text(
        """
        WITH filtered_vaccinations AS (
            SELECT v.vaccination_id, v.citizen_id, v.vaccination_type, to_char(v.date_administered, 'YYYY-MM-DD') AS date_administered
            FROM vaccinations v
            WHERE v.vaccination_type = :vaccine_type
              AND (:start_date = '' OR v.date_administered >= :start_date)
              AND (:end_date = '' OR v.date_administered <= :end_date)
        ),
        children AS (
            SELECT fv.vaccination_id, fv.citizen_id, c.name, EXTRACT(YEAR FROM age(c.dob))::int AS age, 
                   fv.vaccination_type, fv.date_administered, b.mother_id, b.father_id
            FROM filtered_vaccinations fv
            JOIN births b ON fv.citizen_id = b.child_id
            JOIN citizens c ON fv.citizen_id = c.citizen_id
            WHERE EXTRACT(YEAR FROM age(c.dob)) < 18
        ),
        parents AS (
            SELECT ch.vaccination_id, ch.citizen_id, ch.name, ch.age, ch.vaccination_type, ch.date_administered,
                   m.name AS mother_name, f.name AS father_name, m.educational_qualification AS mother_qualification,
                   f.educational_qualification AS father_qualification
            FROM children ch
            LEFT JOIN citizens m ON ch.mother_id = m.citizen_id
            LEFT JOIN citizens f ON ch.father_id = f.citizen_id
            WHERE (:parent_qualification = '' OR m.educational_qualification = :parent_qualification OR f.educational_qualification = :parent_qualification)
        )
        SELECT * FROM parents ORDER BY name;
    """
    )

    params = {
        "vaccine_type": query.vaccine_type,
        "start_date": query.start_date or "1900-01-01",
        "end_date": query.end_date or "2100-12-31",
        "parent_qualification": query.parent_qualification,
    }

    try:
        result = db.execute(sql, params)
        rows = result.fetchall()
        output = []
        for row in rows:
            output.append(
                {
                    "vaccination_id": row.vaccination_id,
                    "citizen_id": row.citizen_id,
                    "name": row.name,
                    "age": row.age,
                    "vaccination_type": row.vaccination_type,
                    "date_administered": row.date_administered,
                    "mother_name": row.mother_name,
                    "father_name": row.father_name,
                    "mother_qualification": row.mother_qualification,
                    "father_qualification": row.father_qualification,
                }
            )

        # convert output to a dictionary
        output = {"data": output}
        return output

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
