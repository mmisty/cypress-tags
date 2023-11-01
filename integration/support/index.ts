import { COVERAGE } from '../common/constants';
import 'cy-local';

const setupCoverage = () => {
  if (Cypress.env(COVERAGE) === 'true' || Cypress.env(COVERAGE) === true) {
    console.log('ENABLE COV');
    require('@cypress/code-coverage/support');
  } else {
    console.log('COVERAGE NOT ENABLED IN BROWSER');
  }
};
setupCoverage();
chai.config.truncateThreshold = 0;
