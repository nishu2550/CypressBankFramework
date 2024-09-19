const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    url: "https://www.globalsqa.com/angularJs-protractor/BankingProject",
    
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/Integration/*/*.js"
  },
  
});
