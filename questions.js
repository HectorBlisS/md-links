const inquirer = require("inquirer");

module.exports = {
  askForTheFile: () => {
    const questions = [
      {
        name: "uriFile",
        type: "input",
        message: "Ingresa la dirección del archivo relativo a esta carpeta:",
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return "Porfavor ingresa una dirección de archivo válida.";
          }
        }
      }
      //   {
      //     name: "password",
      //     type: "password",
      //     message: "Enter your password:",
      //     validate: function(value) {
      //       if (value.length) {
      //         return true;
      //       } else {
      //         return "Please enter your password.";
      //       }
      //     }
      //   }
    ];
    return inquirer.prompt(questions);
  }
};
