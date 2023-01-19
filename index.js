
//import dependencies

// this is used for input
const inquirer = require('inquirer');
//  this handles the databases
const mysql = require('mysql2');
// this writes to file systems
const fs = require('fs');

require('dotenv').config()



const PORT = process.env.PORT || 3001;


// connect to database
const db = mysql.createConnection(
    {
    host: 'localhost',
    // mySQL username
    user: 'root',
    // mySQL password
    password: process.env.PASSWORD,
    database: 'company_db' 
    },
    console.log('Connected to the big company database')
);
 

// assign all functions into an object for earsier access and clean organization
let actions = {
    // function to query and see all from department
    viewDepartments: function() {
        db.query('SELECT * FROM department', function (err, results){
            console.log(results);
        })
    },
    // function to query and see all from role
    viewRoles: function() {
        db.query('SELECT * FROM role', function (err, results){
            console.log(results);
        })
    },
    // function to query and see all from employee
    viewEmployees: function() {
        db.query('SELECT * FROM employee', function (err, results){
            console.log(results);
        })
    },

    addDepartmnet: function(name, values) {
        db.query('INSERT INTO department(name) VALUES(...values)', function(err, results) {
            console.log(results);
        });
    }, 

    addRole: function(role, values) {
        db.query('INSERT INTO role(role) VALUES(...value)', function(err, results) {
            console.log(results);
        });
    },

    addEmployee: function(employee, values) {
        db.query('INSERT INTO employee(name) VALUES(...values)', function(err, results) {
            console.log(results);
        });
    },

    updateEmployee: function() {

    },

    quit: function() {

    }
};


const menuOptions = [
    {
        type: 'list',
        message: 'what would you like to do?',
        name: 'task',
        choices: ['View all employees by department', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Udpate an employee role']
    }
];

inquirer.prompt([
    ...menuOptions
    
])
.then((answers) => {
    const answer = answers.task;
    console.log(answers);
    console.log(answers.task)
    switch (answer) {
        case 'View all employees by department':
            console.log('case 1');
            actions.viewDepartments();
            break;
        
        case 'View all roles':
            console.log('case 2');
            actions.viewRoles();
            break;
            
        case 'View all employees':
            console.log('case 3');
            actions.viewEmployees();
            break;
        case 'Add a department': 
            actions.addDepartmnet();
            break;

        case 'Add a role':
            actions.addRole();
            break;

        case 'Add an employee': 
            actions.addEmployee();
            break;

        case 'Udpate an employee role':
            actions.updateEmployee();
            break;
    };
});






