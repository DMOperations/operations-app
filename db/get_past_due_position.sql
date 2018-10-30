SELECT * FROM activities
WHERE task_date < $1 AND position = $2 AND status = 'false';