CREATE TABLE users(
id SERIAL PRIMARY KEY,
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(100)
)

-- delete from users where id=3;
-- query to delete row with id=3