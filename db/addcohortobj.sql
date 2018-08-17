INSERT INTO task_obj(cohort_name, cohort_obj) VALUES ($1, $2)
RETURNING *;