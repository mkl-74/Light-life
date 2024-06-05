CREATE DATABASE data_light_life;

USE data_light_life;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    member_name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    task VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    expiration_date DATE NOT NULL
);

CREATE TABLE shopping_list (
    id INT PRIMARY KEY,
    ingredients TEXT
);
