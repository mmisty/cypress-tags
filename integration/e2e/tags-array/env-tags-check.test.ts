import { registerTags } from 'cy-local/setup';

Cypress.env('cyTagsShowTagsInTitle', false);
registerTags();

describe('cyTagsShowTagsInTitle is false', () => {
  describe('suite with tag @suiteTag', () => {
    describe('suite with tag @apple("info")', () => {
      it('test @tag', function () {
        expect(this.test?.tags).deep.eq([
          { tag: '@tag', info: [] },
          { tag: '@apple', info: ['info'] },
          { tag: '@suiteTag', info: [] },
        ]);
      });
    });
  });
});

Cypress.env('cyTagsShowTagsInTitle', true);
registerTags();
describe('cyTagsShowTagsInTitle is true', () => {
  describe('suite with tag @suiteTag', () => {
    describe('suite with tag @apple("info")', () => {
      it('test @tag', function () {
        expect(this.test?.tags).deep.eq([
          { tag: '@tag', info: [] },
          { tag: '@apple', info: ['info'] },
          { tag: '@suiteTag', info: [] },
        ]);
      });
    });
  });
});

Cypress.env('cyTagsShowTagsInTitle', undefined);
registerTags();
describe('cyTagsShowTagsInTitle is undefined', () => {
  describe('suite with tag @suiteTag', () => {
    describe('suite with tag @apple("info")', () => {
      it('test@tag', function () {
        expect(this.test?.tags).deep.eq([
          { tag: '@tag', info: [] },
          { tag: '@apple', info: ['info'] },
          { tag: '@suiteTag', info: [] },
        ]);
      });
    });
  });
});
