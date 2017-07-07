SELECT location_id, location_name FROM locations
WHERE team_id = ($1); 
