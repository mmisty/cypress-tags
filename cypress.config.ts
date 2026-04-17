import { defineConfig } from 'cypress';
import { setupPlugins } from './integration/plugins';

const cypressFolder = 'integration';

export default defineConfig({
  allowCypressEnv: false,
  e2e: {
    specPattern: `${cypressFolder}/e2e/**/*.(cy|test|spec).ts`,
    supportFile: `${cypressFolder}/support/index.ts`,
    downloadsFolder: `${cypressFolder}/downloads`,
    videosFolder: `${cypressFolder}/videos`,
    fixturesFolder: `${cypressFolder}/fixtures`,
    screenshotsFolder: `${cypressFolder}/screenshots`,
    reporter: 'junit',
    reporterOptions: {
      mochaFile: './reports/cypress/[hash].xml',
      toConsole: false,
    },
    video: false,
    expose: {},

    setupNodeEvents(on, config) {
      setupPlugins(on, config);

      return config;
    },
  },
});
