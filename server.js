const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const inquirer = require('inquirer');
const mysql2 = require('mysql2');
const cTable = require('console.table');

// const { resolve } = require('node:path');

const app = express();
const PORT = process.env.PORT || 3301;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
// app.use(routes);

// turn on connection to db and server
// sequelize.sync({ force: false }).then(() => {
//     app.listen(PORT, () => console.log('Now listening'));
//     runPrompt();
// });

const connection = mysql2.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Be sure to update with your own MySQL password!
    password: 'rootbeer',
    database: 'employees',
});

connection.connect((err) => {
    if (err) throw err;
    runPrompt();
});

// Initialize the application in command prompt
const runPrompt = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'Add',
                'View',
                'Update',
                'Delete',
                'Exit',
            ],
        })
        .then((answer) => {
            // switch (answer.action) {
            //     case 'Add':
            //         runAdd();
            //         break;

            //     case 'View':
            runView();
            //         break;

            //     case 'Update':
            //         runUpdate();
            //         break;

            //     case 'Delete':
            //         runDelete();
            //         break;

            //     case 'Exit':
            //         connection.end();
            //         break;

            //     default:
            //         console.log(`Invalid action: ${answer.action}`);
            //         break;
            // }
        });
};


// ADD
const runAdd = () => {
    inquirer
        .prompt({
            name: 'add',
            type: 'rawlist',
            message: 'What would you like to add?',
            choices: [
                'Department',
                'Role',
                'Employee',
                'Exit',
            ],
        })
        .then((answer) => {
            switch (answer.add) {
                case 'Department':
                    addDepartment();
                    break;

                case 'Role':
                    addRole();
                    break;

                case 'Employee':
                    addEmployee();
                    break;

                case 'Exit':
                    runPrompt();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};
// add department
const addDepartment = () => {

    inquirer.prompt([{
        name: 'first_name',
        type: 'input',
        message: 'What is the new employees first name?',
    },
    {
        name: 'last_name',
        type: 'input',
        message: 'What is the new employees last name?',
    },
    // {
    //     name: 'first_name',
    //     type: 'list',
    //     message: 'What is the new employees role?',
    //     choices: 
    // }
    // {
    //     name: 'manager_id',
    //     type: 'list',
    //     message: 'Who is the new employees manager?',
    //     choices: 
    // }
    {
        name: 'role_id',
        type: 'input',
        message: 'What is the new employees role id?',
    },
    {
        name: 'manager_id',
        type: 'list',
        message: 'What is the new employees managers ID?',
    }
    ])
};

// add role 
const addRole = () => {

};

// add employee
const addEmployee = () => {

};

// VIEW
const runView = () => {
    inquirer
        .prompt({
            name: 'view',
            type: 'rawlist',
            message: 'What would you like to view?',
            choices: [
                'Department',
                'Role',
                'Employee',
                'Exit',
            ],
        })
        .then((answer) => {
            switch (answer.view) {
                case 'Department':
                    viewDepartment();
                    break;

                case 'Role':
                    viewRole();
                    break;

                case 'Employee':
                    viewEmployee();
                    break;

                case 'Exit':
                    runPrompt();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};

// view departments
const viewDepartment = () => {
    inquirer
        .prompt({
            name: 'department',
            type: 'input',
            message: 'What department would you like to search for?',
        })
        .then((answer) => {
            const query = 'SELECT employee.first_name, employee.last_name,  role.title, role.salary, department.name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE department.name = ?;';
            connection.query(query, [answer.department], (err, res) => {
                console.log(`${res.length} matches found!`);
                console.table(res);
                runPrompt();
            });
        });
};

// view roles
const viewRole = () => {
    inquirer
        .prompt({
            name: 'role',
            type: 'input',
            message: 'What role would you like to search for?',
        })
        .then((answer) => {
            const query = 'SELECT employee.first_name, employee.last_name,  role.title, role.salary, department.name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE role.title = ?';
            connection.query(query, [answer.role], (err, res) => {
                console.log(`${res.length} matches found!`);
                console.table(res);
                runPrompt();
            });
        });
};

// view employees
const viewEmployee = () => {
    inquirer
        .prompt([{
            name: 'first_name',
            type: 'input',
            message: 'What is the First Name of the employee would you like to search for?',
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'What is the Last Name of the employee would you like to search for?',
        }])
        .then((answer) => {
            const query = 'SELECT department.name, role.title, role.salary, employee.first_name, employee.last_name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE employee.first_name = ? AND employee.last_name = ?;'
            connection.query(query, [answer.first_name, answer.last_name], (err, res) => {
                if (res[0]) {
                    console.log(
                        `Employee Name: ${res[0].first_name} ${res[0].last_name}
                    Role: ${res[0].title}
                    Department: ${res[0].name}
                    Salary: $${res[0].salary}`
                    );
                }
                else {
                    console.error(`No results for ${answer.first_name} ${answer.last_name}`);
                }
                runPrompt();
            });

        });
    // });
};

// name: answer.department.name, role: answer.role.title, salary = answer.role.salary, first_name = answer.employee.first_name, last_name = answer.employee.last_name

// UPDATE

// update employee roles


// BONUS
// update employee managers
// view employees by managers

// DELETE

// delete departments
// delete roles
// delete employees
