const mysql = require('mysql');
const inquirer = require('inquirer');
require("console.table");

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'new_password',
  database: 'employee_db',
});

const runChoice = () => {
  inquirer
    .prompt({
      name: 'choice',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
            "view all Departments",
            "view all Roles",
            "view all Employees",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            "Exit"
      ],
    })

    .then((res) => {
        let choice = res.choice;
      switch (choice) {
        case 'view all Departments':
            viewAllDepartments();
          break; 
        
        case 'view all Roles':
            viewAllRoles();
          break; 
        
        case 'view all Employees':
            viewAllEmployees();
          break; 
        
        case 'Add Department':
            createDepartment();
          break; 
        
        case 'Add Role':
            createRole();
          break; 
        
        case 'Add Employee':
            createEmployee();
          break; 

        case 'Update Employee Roles':
          updateEmployeeRole();
          break;

        default:
          console.log(`Invalid action: ${res.exit}`);
          break;
      }
    });
};

const viewAllDepartments = () => {
    const query = connection.query('SELECT * FROM department', (err, res) => {
      if (err) throw err;
      res.forEach(({id, department_name }) => {
        console.log(`${id} | ${department_name}`);
      });
    }
  );
  console.log(query.sql);
  connection.end();
};

const viewAllRoles = () => {
    const query = connection.query('SELECT * FROM title_role', (err, res) => {
      if (err) throw err;
      res.forEach(({role_id, title, salary, department_id }) => {
        console.log(`${role_id} | ${title} | ${salary} | ${department_id}`);
      });
    }
  );
  console.log(query.sql);
  connection.end();
};


const viewAllEmployees = () => {
    const query = connection.query('SELECT * FROM employee', (err, res) => {
      if (err) throw err;
      res.forEach(({employee_id, first_name, last_name, role_id, manager_id }) => {
        console.log(`${employee_id} | ${first_name} | ${last_name} | ${role_id} | ${manager_id}`);
      });
    }
  );
  console.log(query.sql);
  connection.end();
};

const createDepartment = () => {
    inquirer.prompt([
        {
        name: "department_name",
        message: "what is the name of the department?" 
        }
    ])
    .then (res => {
      connection.query(
        'INSERT INTO department SET ?',
        {
          department_name: res.department_name,
        },
        (err) => {
          if (err) throw err;
          console.log('Department has been successfully added to database');
          runChoice();
        }
      );
    });
};

const createRole = () => {
  inquirer.prompt([
      {
      name: "title",
      message: "what is the role title?" 
      },
      {
        name: "salary",
        message: "what is the salary?" 
      },
      {
        name: "department_id",
        message: "what is the department id?",
      },
  ])
  .then (res => {
    connection.query(
      'INSERT INTO title_role SET ?',
      {
        title: res.title,
        salary: res.salary,
        department_id: res.department_id
      },
      (err) => {
        if (err) throw err;
        console.log('Added role to the database');
        runChoice();
      }
    );
  });
};

const createEmployee = () => {
  inquirer.prompt([
      {
      name: "first_name",
      message: "what is the employee's first name?" 
      },
      {
        name: "last_name",
        message: "what is the employee's last name?" 
      },
      {
        name: "role_id",
        message: "what is the role id?"
      },
      {
        name: "manager_id",
        message: "what is the employee's manager id?"
      },
  ])
  .then (res => {
    connection.query(
      'INSERT INTO employee SET ?',
      {
        first_name: res.first_name,
        last_name: res.last_name,
        role_id: res.role_id,
        manager_id: res.manager_id
      },
      (err) => {
        if (err) throw err;
        console.log('Added employee to the database');
        runChoice();
      }
    );
  });
};

const updateEmployeeRole = () => {
  const query = connection.query(
  db.employee()
      .then(([rows]) => {
          let employee = rows;
          const employeeChoices = employee.map(({employee_id, first_name, last_name}) => ({
              name: `${first_name} ${last_name}`,
              value: employee_id
          }));

          inquirer.prompt([
              {
                  type: "list",
                  name: "employeeId",
                  message: "Which employee's role do you want to update?",
                  choices: employeeChoices
              }
          ])
              .then(res => {
                  let employeeId = res.employeeId;
                  db.title_role()
                      .then(([rows]) => {
                          let title_role = rows;
                          const roleChoices = title_role.map(({title}) => ({
                              name: title,
                              value: title
                          }));

                          inquirer.prompt([
                              {
                                  type: "list",
                                  name: "title",
                                  message: "What's the new role of this employee?",
                                  choices: roleChoices
                              }
                          ])
                              .then(res => db.updateEmployeeRole(employeeId, res.title))
                              .then(() => console.log("Employee's role is updated"))
                              .then(() => runChoice())
                      });
              });
      })
);
}

  connection.connect((err) => {
    if (err) throw err;
  
    console.log(`connected as id ${connection.threadId}`);
    runChoice();
  
  });

