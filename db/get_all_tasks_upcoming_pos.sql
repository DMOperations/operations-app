SELECT * FROM activities
WHERE task_date BETWEEN $1 AND $2 AND position = $3 AND status = 'false';