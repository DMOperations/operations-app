INSERT INTO cohort (cohort_Id, start_date, break_dates, cohort_color ) VALUES ($1, $2, $3, $4)
RETURNING *;