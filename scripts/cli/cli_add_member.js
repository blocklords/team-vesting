const inquirer = require("inquirer");

const askMember = () => {
  const questions = [
    {
      name: "MEMBER",
      type: "input",
      message: `what is the wallet address?`,
    },
    {
      name: "ALLOWANCE",
      type: "input",
      message: `what is the monthly allowance?`,
    },
  ];
  return inquirer.prompt(questions);
};

module.exports = askMember;
