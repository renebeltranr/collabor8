import { defineConfig } from "cypress";

module.exports = {
  projectId: "a52w86",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },



  // The rest of the Cypress config options go here...
}


