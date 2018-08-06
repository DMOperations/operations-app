INSERT INTO Cohort (cohort_Id, start_date, break_date ) VALUES ($1, $2, $3)
RETURNING *;