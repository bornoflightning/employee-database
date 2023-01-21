

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
    // this function has been added to make code dry, and avoid repetition
    dryQuery: function(query) {
        db.query(query, function (err, results){
            // console.log(error) or provide the results as a table;
            if(err) {
                console.log(err);
            } else {
                console.table(results);
            };
        });
        console.log('--------------------------------------------');
        // this is crucial, this keeps the next request for input from overlapping inquirer choices. 
        setTimeout(() => {
            menu();
        }, "1000");
    },

    dryInsert: function(query){
        db.query(query, function (err, results){
            // console.log(error) or provide the results as a table;
            if(err) {
                // this logs make the response look cleaner
                console.log("that department or role does not exist");
                console.log("here are some details on your error: " + err)
                console.log(" ");
                console.log(" ");
                console.log("lets try that again.")
            } else {
                console.table('your input has been succesfully added!');
            };
        });
        console.log('--------------------------------------------');
        // this is crucial, this keeps the next request for input from overlapping inquirer choices. 
        setTimeout(() => {
            menu();
        }, "1000");
    },

    // function to query and see all from department
    viewDepartments: function() {
        this.dryQuery('SELECT * FROM department');
  
    },
    // function to query and see all from role
    viewRoles: function() {
        const query = 'SELECT title, id, department_id, salary FROM role';
        this.dryQuery(query);
                
    },
    // function to query and see all from employee
    viewEmployees: function() {
        const query = 'SELECT DISTINCT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department,role.salary, \
                       CONCAT(a.first_name, " ", a.last_name) AS manager FROM employee \
                       LEFT JOIN role ON employee.role_id = role.id \
                       LEFT JOIN department ON department.id = role.department_id \
                       LEFT JOIN employee a ON a.id = employee.manager_id ORDER BY employee.id';
        this.dryQuery(query);
        
    },
    // function that adds department
    addDepartment: function(name, id) {
        const query = `INSERT INTO department (name, id) VALUES ("${name}", ${id})`;
        this.dryInsert(query);
    }, 

    addRole: function(title, salary, department_id) {
        const query = `INSERT INTO role (title, salary, department_id) VALUES ("${title}",${salary},${department_id})`;
        this.dryInsert(query);
    },

    addEmployee: function(first_name, last_name, role_id, manager_id) {
        db.query(`INSERT INTO employee (title, salary, department_id) VALUES ("${first_name}","${last_name}",${role_id},${manager_id})`, function(err, results) {
            console.log(results);
        });
    },

    updateEmployee: function() {

    },
    // this function is used once to reference the Role table and display the id 
    referenceDepartments: function() {
        db.query('SELECT * FROM department', function (err, results){
            // console.log(error) or provide the results as a table;
            if(err) {
                console.log(err);
            } else {
                console.table(results);
            };
        });
    },

    quit: function() {

    }
};


const menuOptions = [
    {
        type: 'list',
        message: 'what would you like to do?',
        name: 'task',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Udpate an employee role \n']
    }
];

const departmentQuestions = [
    {
        type: 'input',
        message: 'what is he name of the department?',
        name: 'newDepartment',
    },
     {
        type: 'input',
        message: 'what is he department id?',
        name: 'id',
    }
];

const roleQuestions = [
    {
        type: 'input',
        message: 'what is the title of the new role?',
        name: 'title',
    },
    {
        type: 'input',
        message: 'what is the salary for this postion?',
        name: 'salary',
    },
    {
        type: 'input',
        message: 'please provide the id for the department this role will be added to...',
        name: 'department_id',
    }
];

const employeeQuestions = [
    {
        type: 'input',
        message: 'what is the employee\'s first name?',
        name: 'first_name',
    },
    {
        type: 'input',
        message: 'what is the employee\'s last name?',
        name: 'last_name',
    },
    {
        type: 'input',
        message: 'please provide the id for the role this employee will be added to...',
        name: 'role_id',
    },
    {
        type: 'input',
        message: 'please provide the id for the manager this employee will report to',
        name: 'manager_id',
    }
];

function menu() { 
    inquirer.prompt([
        ...menuOptions
        
    ])
    .then((answers) => {
        const answer = answers.task;
        console.log(answers);
        console.log(answers.task)
        switch (answer) {
            case 'View all departments':
                actions.viewDepartments();
                break;
            
            case 'View all roles':
                actions.viewRoles();
                break;
                
            case 'View all employees':
                actions.viewEmployees();
                break;
            case 'Add a department': 
                addDpt();
                break;

            case 'Add a role':
                addNewRole();
                break;

            case 'Add an employee': 
                addNewEmployee()
                break;

            case 'Udpate an employee role':
                actions.updateEmployee();
                break;

            default:
        };
    })
    
};

function addDpt() {
    inquirer.prompt([
        ...departmentQuestions
    ])
    .then((answers) => {
        const {newDepartment, id} = answers;
        actions.addDepartment(newDepartment, id);
    });
};

function addNewRole() {
    console.log("here is a list of the current departments so you can reference their id's")
    actions.referenceDepartments();
    // waits and gives enough time for table to display before asking quesions
    // makes inquirer look cleaner
    setTimeout(() => {
        inquirer.prompt([
            ...roleQuestions
        ])
        .then((answers) => {
            const {title, salary, department_id} = answers;
            
            actions.addRole(title, salary, department_id);
        });
    
    }, "1000");

};

function addNewEmployee() {
    inquirer.prompt([
        ...employeeQuestions
    ])
    .then((answers) => {
        const {first_name, last_name, role_id, manager_id} = answers;
        actions.addEmployee(first_name, last_name, role_id, manager_id);
    });
};
    






menu();