-- Create new example rows
INSERT INTO department(name)
VALUES('Accounting'),
('Software Development'),
('Human Resources'),
('Sales');

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES('Michael','Jackson',1,1),
('Frank','Sinatra',2,1),
('Barry','Manilow',7,3)
;

INSERT INTO role(title,salary,department_id)
VALUES('Senior Accountant',75000,1),
('Junior Accountant',48000,1),
('Chief Financial Officer',110000,1),
('Development Lead',85000,2),
('Junior Developer',60000,2),
('Chief Technology Officer',110000,2),
('Human Resource Specialist',50000,3),
('Salesperson',55000,4),
('Sales Manager',70000,4);