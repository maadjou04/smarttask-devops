CREATE DATABASE IF NOT EXISTS smarttask;
USE smarttask;

CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'todo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tasks (title, description, status) VALUES
('Configurer Docker', 'Installer et configurer les conteneurs', 'done'),
('Mettre en place Jenkins', 'Automatiser le pipeline CI/CD', 'todo');
