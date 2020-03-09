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
  },
  askForValidation: () => {
    const questions = [
      {
        name: "validate",
        type: "input",
        message: "Quieres validar los links?[y/n]:",
        validate: function(value) {
          if (value.length && (value === "y" || value === "n")) {
            return true;
          } else {
            return "Porfavor ingresa una respuesta con y/n";
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
  askForStats: () => {
    const questions = [
      {
        name: "stats",
        type: "input",
        message: "Quieres ver los totales?[y/n]:",
        validate: function(value) {
          if (value.length && (value === "y" || value === "n")) {
            return true;
          } else {
            return "Porfavor ingresa una respuesta con y/n";
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  }
};
