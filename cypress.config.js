const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1280,
    viewportHeight: 720,
    //viewportWidth: 2880,
    //viewportHeight: 1800,
    video: true,
    //videoUploadOnPasses: false, // The videoUploadOnPasses configuration option was removed in Cypress version 13.0.0.
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
