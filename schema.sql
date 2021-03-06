DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS tweets CASCADE;
DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE tweets (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  content VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  message VARCHAR(255) NOT NULL,
  sent_at TIMESTAMP DEFAULT NOW()
);

-- password is 123456
INSERT INTO users (username, password) VALUES ('tnt', '$2b$12$/bdP/xrwPfzaYHkSboTqpORsPZNuttn0CpEzerdDVRSmiTp.6BWu.');
INSERT INTO users (username, password) VALUES ('lisa', '$2b$12$/bdP/xrwPfzaYHkSboTqpORsPZNuttn0CpEzerdDVRSmiTp.6BWu.');
INSERT INTO users (username, password) VALUES ('jess', '$2b$12$/bdP/xrwPfzaYHkSboTqpORsPZNuttn0CpEzerdDVRSmiTp.6BWu.');


INSERT INTO messages (sender_id, receiver_id, message) VALUES (1, 2, 'Hey Lisa!');
INSERT INTO messages (sender_id, receiver_id, message) VALUES (2, 1, 'Hey Tammy!');
INSERT INTO messages (sender_id, receiver_id, message) VALUES (2, 1, 'This is a message!');
INSERT INTO messages (sender_id, receiver_id, message) VALUES (2, 1, 'Another Message!');
INSERT INTO messages (sender_id, receiver_id, message) VALUES (2, 3, 'Hey Jess!');

INSERT INTO tweets (user_id, content) VALUES (1, 'This is my first tweet!')
