// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./cypress/cypress.ts" />
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./mocha/index.ts" />
// here export only functions to run in browser

// usage: import '@mmisty/cypress-tags';
import { registerTags } from './setup';

registerTags();
