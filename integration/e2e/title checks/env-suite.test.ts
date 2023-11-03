import { registerTags } from 'cy-local/setup';

Cypress.env('cyTagsShowTagsInTitle', true);
registerTags();
describe('Should have proper suite title when env var is true', () => {
  describe('suite with tag @suiteTag', () => {
    it('test @tag', function () {
      expect(this.test?.title).eq('test @tag');
      expect(this.test?.fullTitle()).eq(
        'Should have proper suite title when env var is true suite with tag @suiteTag test @tag',
      );
    });
  });
});

Cypress.env('cyTagsShowTagsInTitle', false);
registerTags();
describe('Should have proper suite title when env var is false', () => {
  describe('suite with tag @suiteTag', () => {
    it('test @tag', function () {
      expect(this.test?.title).eq('test');
      expect(this.test?.fullTitle()).eq('Should have proper suite title when env var is false suite with tag test');
    });
  });
});

/**
 * Should have proper suite title when nested suites
 */
Cypress.env('cyTagsShowTagsInTitle', true);
registerTags();
describe('cyTagsShowTagsInTitle true', () => {
  describe('suite with tag @suiteTag', () => {
    describe('suite with tag @apple', () => {
      it('test @tag', function () {
        expect(this.test?.title).eq('test @tag');
        expect(this.test?.fullTitle()).eq(
          'cyTagsShowTagsInTitle true suite with tag @suiteTag suite with tag @apple @suiteTag test @tag',
        );
      });
    });
  });
});

/**
 * Should have proper suite title when nested suites and cyTagsShowTagsInTitle false
 */
Cypress.env('cyTagsShowTagsInTitle', false);
registerTags();
describe('cyTagsShowTagsInTitle false', () => {
  describe('suite with tag @suiteTag', () => {
    describe('suite with tag @apple', () => {
      it('test @tag', function () {
        expect(this.test?.title).eq('test');
        expect(this.test?.fullTitle()).eq('cyTagsShowTagsInTitle false suite with tag suite with tag test');
      });
    });
  });
});
