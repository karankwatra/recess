SELECT * FROM teams
WHERE team_name = ($1) AND team_password = ($2);
