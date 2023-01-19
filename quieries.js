

//  this handles the databases
const mysql = require('mysql2');

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


module.exports = actions;