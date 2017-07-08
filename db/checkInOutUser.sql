DO
$do$
BEGIN
IF EXISTS (SELECT * FROM user_sessions WHERE user_name = $1 AND location_id = $2) THEN
			DELETE FROM user_sessions WHERE user_name = $1 AND location_id = $2;
ELSE
			INSERT INTO user_sessions (user_name, location_id, from_time) VALUES ($1, $2, current_timestamp);
END IF;
END
$do$
