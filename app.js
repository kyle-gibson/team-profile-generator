const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");
const { allowedNodeEnvironmentFlags } = require("process");

const employees = [];

const questionsManager = async () => {
    await inquirer.prompt([
    {
        type:'input',
        name:'name',
        message:'What is the name of the Manager?'
    },
    {
        type:'input',
        name:'id',
        message:'What is the Managers ID?'
    },
    {
        type:'input',
        name:'email',
        message:'What is the email address for this Manager?'
    },
    {
        type:'input',
        name:'officeNumber',
        message:'What is the office number for this Manager?'
    },  
    ]).then(response => {
        const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
        employees.push(manager);
        return manager;
    });
    addRole();
}; 

const questionsEngineer = async () => {
    await inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: "What is the name of the Engineer?"
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the Engineers ID?",
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the email address for this Engineer?"
        },
        {
            type: 'input',
            name: 'github',
            message: "What is this Engineers Github username?",
        },
    ]).then(response => {
        const engineer = new Engineer(response.name, response.id, response.email, response.github);
        employees.push(engineer);
        return engineer;
    });
    addRole();
};
const questionsIntern = async () => {
    await inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: "What is the name of the Intern?"
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the Interns ID?",
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the email address for this Intern?"
        },
        {
            type: 'input',
            name: 'school',
            message: "What school did this intern attend?",
        },
    ]).then(response => {
        const intern = new Intern(response.name, response.id, response.email, response.school);
        employees.push(engineer);
        return engineer;
    });
    addRole();
};

const addRole = () => {
    inquirer.prompt([
        {
            type:'confirm',
            name: 'addAdd',
            message: 'Would you like to add additional employees?',
        }
    ]).then(response => {
        if (response.addAdd){
            whatRole();
        }else{
            console.log("All employees added");
            buildTeam();
        };
    });
};

const whatRole = () => {
    inquirer.prompt([
        {
            type:'list',
            name: 'role',
            message: 'Which role would you like to assign?',
            choices: ['Manager', 'Engineer', 'Intern']
        }
    ]).then(response => {
        switch (response.role) {
            case 'Manager':
                questionsManager();
                break;
            case 'Engineer':
                questionsEngineer();
                break;
            case 'Intern':
                questionsIntern();
                break;
            default:
                break;            
        };
    });
};


createTeam = () => {
    fs.writeFile(outputPath, render(employees), err => {
        err ? console.log(err) : console.log("Success! Team created!")
    });    
};

createTeam();