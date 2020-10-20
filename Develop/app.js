const inquirer = require("inquirer");
const fs = require("fs");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");


// use async/await for promise-based question/input
async function start() {
    console.log("Start building your team!");

    let teamHTML = "";
    let teamSize;

    await inquirer.prompt(
        {
            type: "number",
            message: "How many members are on your team?",
            name: "addMember"
        }
    )

        .then((data) => {
            teamSize = data.addMember + 1;
        });

    // if no team members terminate app
    if (teamSize === 0) {
        console.log("Attention: You have not added a team member");
        return;
    }

    // for loop depending on teamSize
    for (i = 1; i < teamSize; i++) {

        let name;
        let id;
        let title;
        let email;

    }
        // team member questions
        await inquirer.prompt([
            {
                type: "input",
                meassage: "What is the employee (${i}) 's name?",
                name: "name"
            },
            {
                type: "input",
                meassage: "What is the employee (${i})'s ID number?",
                name: "id"
            },
            {
                type: "input",
                meassage: "What is the employee (${i})'s email address?",
                name: "email"
            },
            {
                type: "list",
                meassage: "What is the employee (${i})'s title? Choose one of the following:",
                name: "title",
                choices: ["Intern", "Engineer", "Manager"]
            }
        ])

        // stores input data
        .then((data) => {

            name = data.name;
            id = data.id;
            email = data.email;
            title = data.title;

        });

    // switch/case used for different titles/questions
    switch (title) {
        case "Manager":

            await inquirer.prompt([
                {
                    type: "input",
                    message: "What is their office phone number?",
                    name: "officeNum"
                }
            ])
                .then((data) => {

                    // create a new object with user input data
                    const manager = new Manager(name, id, email, data.officeNum);

                    // updates manager.html with new user input data
                    teamMember = fs.readFileSync("templates/manager.html");

                    // adds to teamHTML
                    teamHTML = teamHTML + "\n" + eval('`' + teamMember + '`');
                });
            break;

        // intern school input prompt
        case "Intern":
            await inquirer.prompt([
                {
                    type: "input",
                    message: "What school is the Intern attending?",
                    name: "school"
                }
            ])
                .then((data) => {
                    const intern = new Intern(name, id, email, data.school);
                    teamMember = fs.readFileSync("templates/intern.html");
                    teamHTML = teamHTML + "\n" + eval('`' + teamMember + '`');
                });
            break;

        //engineer github username input prompt
        case "Engineer":
            await inquirer.prompt([
                {
                    type: "input",
                    message: "What is the Engineer's GitHub uername?",
                    name: "github"
                }
            ])
                .then((data) => {
                    const engineer = new Engineer(name, id, email, data.github);
                    teamMember = fs.readFileSync("templates/engineer.html");
                    teamHTML = teamHTML + "\n" + eval('`' + teamMember + '`');
                });
            break;
    }

    // reads main.html
    const mainHTML = fs.readFileSync("templates/main.html");

    // place teamHTML inside main template
    teamHTML = eval('`' + mainHTML + '`');

    // write to team.html file
    fs.writeFile("output/team.html", teamHTML, function (err) {

        if (err) {
            return console.log(err);
        }

        console.log("Congrats!");

    });

}

start();











// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
