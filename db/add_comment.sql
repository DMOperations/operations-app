INSERT INTO task_comments (task_id, comment_text, comment_user, comment_date) VALUES ($1,$2, $3, $4);
SELECT t.comment_id, t.task_id, t.comment_text, t.comment_user, t.comment_date, s.picture
FROM task_comments t
JOIN successuser s on s.user_id = t.comment_user
WHERE task_id = $1;