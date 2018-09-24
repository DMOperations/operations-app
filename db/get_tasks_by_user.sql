select * 
from activities a
join cohort c on c.cohort_id = a.cohort_id
where a.position = $1;