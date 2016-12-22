--Database name: inventory
--Table name: items

CREATE TABLE items (
	id SERIAL PRIMARY KEY,
	name VARCHAR(30) NOT NULL,
	color VARCHAR(30) NOT NULL,
	size VARCHAR(30) NOT NULL,
	quantity INT NOT NULL
);
