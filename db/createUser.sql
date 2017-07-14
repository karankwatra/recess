INSERT INTO user_table (user_name, user_password)
VALUES($1, $2)
returning *; 
