SELECT t.comment_id, t.task_id, t.comment_text, t.comment_user, t.comment_date, s.picture
FROM task_comments t
JOIN successuser s on s.user_id = t.comment_user
WHERE task_id = $1;