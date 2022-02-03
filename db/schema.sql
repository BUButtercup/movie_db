DROP DATABASE movie_db;
CREATE DATABASE movie_db;

USE movie_db;

CREATE TABLE movies (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    description TEXT
);

CREATE TABLE reviews (
    rev_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    movie INT,
    review VARCHAR(100) NOT NULL,
    username VARCHAR(20),
    FOREIGN KEY(movie) REFERENCES movies(id) ON DELETE CASCADE
);