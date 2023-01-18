
//import dependencies
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require('fs');


const PORT = porcess.env.PORT || 3001;
const app = express();


// assign all functions into an object for earsier access and clean organization
let actions = {
    viewDepartments: function() {

    },

    viewRoles: function() {

    },

    viewEmployees: function() {

    },

    addDepartmnet: function() {

    }, 

    addRole: function() {

    },

    addEmployee: function() {

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
        choices: ['View all employees by department', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Udpate an employee role','Quit']
    },
]