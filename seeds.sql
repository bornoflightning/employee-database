INSERT INTO department(name)
VALUES  ('Engineering'),
        ('Finance'),
        ('Legal');


INSERT INTO role (title, salary, department_id)
VALUES  ('Senior Software Engineer', 250000, 1),
        ('Software Engineer', 120000, 1),
        ('Account Manager', 160000, 2),
        ('Accountant', 125000, 2),
        ('Legal Team Lead', 250000, 3),
        ('Laywer', 190000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES  ('Alex', 'Bacon', 1, NULL),
        ('Lauren', 'Stevens', 2, 1),
        ('Thomas', 'Bison', 3, NULL),
        ('Steven', 'Powers', 4, 3),
        ('Jason', 'Stubborn', 5, NULL),
        ('Lawson', 'Rogers', 6, 5);