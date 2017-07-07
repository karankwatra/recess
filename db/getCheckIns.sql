SELECT * FROM user_sessions
WHERE location_id = ($1)
AND to_time IS NULL; 
