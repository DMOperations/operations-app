INSERT INTO cohort (cohort_Id, start_date, break_dates ) VALUES ($1, $2, $3)
RETURNING *;