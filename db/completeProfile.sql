UPDATE successuser
SET position = $2,
campus = $3
WHERE user_id =$1
RETURNING *;