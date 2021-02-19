INSERT INTO department (department_name) VALUES ("HelpDesk");
INSERT INTO department (department_name) VALUES ("Operatios");
INSERT INTO department (department_name) VALUES ("Products");

INSERT INTO title_role (title, salary, department_id) VALUES ("Engineer", 80000.00, 1);
INSERT INTO title_role (title, salary, department_id) VALUES ("Customer Rep", 70000.00, 2);
INSERT INTO title_role (title, salary, department_id) VALUES ("Manager", 90000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Brad", "Pitt", 10, 21);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("John", "New", 21, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Tom", "Peter", 11, 3);