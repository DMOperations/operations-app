SELECT * FROM activities
WHERE task_date LIKE $1 AND status = 'false' AND position = $2;