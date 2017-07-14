INSERT INTO messages (location_id, message, message_time, sender)
VALUES ($1, $2, current_timestamp, $3);
