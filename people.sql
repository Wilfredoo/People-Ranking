DROP TABLE IF EXISTS peoplelist;

CREATE TABLE peoplelist(
    id SERIAL PRIMARY KEY,
    name VARCHAR(300),
    age VARCHAR(300),
    city1 VARCHAR(300),
    city2 VARCHAR(300),
    status VARCHAR(300),
    fame VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO peoplelist (name, age, city1, city2, status, fame) VALUES ('Juan', '40', 'New York', 'Las Vegas', 'Active', '240');
INSERT INTO peoplelist (name, age, city1, city2, status, fame) VALUES ('Tyler Durden', '43', 'Las Vegas', 'New York', 'Active', '410');
INSERT INTO peoplelist (name, age, city1, city2, status, fame) VALUES ('Maria', '60', 'San Francisco', '', 'Inactive', '120');

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    alias VARCHAR(300),
    email VARCHAR(300),
    password VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
