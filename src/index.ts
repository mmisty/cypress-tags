// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./cypress/cypress.ts" />
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./mocha/index.ts" />
// here export only functions to run in browser

import { registerTags } from './setup-tags';

registerTags();
