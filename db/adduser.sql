INSERT INTO successuser (username, auth_id, email, picture) VALUES ($1, $2,$3, $4)
RETURNING *;