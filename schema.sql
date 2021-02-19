DROP DATABASE IF EXISTS employee_db;
CREATE database employee_db;
USE employee_db;

CREATE TABLE department (
  id int AUTO_INCREMENT,
  department_name varchar(30) NOT NULL,
  PRIMARY KEY(id)
);


CREATE TABLE title_role (
  role_id int AUTO_INCREMENT,
  title varchar(50) NOT NULL,
  salary DECIMAL (30,2) NOT NULL,
  department_id int NOT NULL,
  PRIMARY KEY(role_id)
);

CREATE TABLE employee (
  employee_id int AUTO_INCREMENT,
  first_name varchar(30) NOT NULL,
  last_name varchar(30),
  role_id int NOT NULL,
  manager_id int NOT NULL,
  PRIMARY KEY(employee_id)
);


