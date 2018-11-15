DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    image TEXT,
    bio TEXT
);

DROP TABLE IF EXISTS friendships CASCADE;

CREATE TABLE friendships (
id SERIAL PRIMARY KEY,
sender_id INT NOT NULL REFERENCES users(id),
receiver_id INT NOT NULL REFERENCES users(id),
accepted BOOLEAN DEFAULT false
);

DROP TABLE IF EXISTS chat CASCADE;

CREATE TABLE chat (
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL REFERENCES users(id),
    chat_message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO chat (id, sender_id, chat_message, created_at) VALUES (
    '1',
    '1',
    'test',
    '2018-11-07 18:00:43.322284'
);
