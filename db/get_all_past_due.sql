SELECT * FROM activities
WHERE task_date < $1 AND status='false'