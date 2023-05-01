DROP DATABASE IF EXISTS shopping_cli;
CREATE DATABASE shopping_cli;
USE shopping_cli;

CREATE TABLE users (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(50),
  password VARCHAR(255)
);

CREATE TABLE products (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30),
  price DECIMAL(6,2),
  quantity INTEGER
);

INSERT INTO users (name, email, password)
VALUES
  ('admin', 'admin@test.mail', 'root'),
  ('test_user', 'test@test.mail', 'test123');

INSERT INTO products (name, price, quantity)
VALUES
  ('Rawlings Custom Glove', 599.99, 2),
  ('Victus EB12', 229.99, 5),
  ('Evosheild Batting Gloves', 69.99, 8),
  ('Rawlings Helmet (RHB)', 59.99, 4),
  ('Champro L-screen', 269.99, 1),
  ('New Blance Cleats', 99.99, 9);