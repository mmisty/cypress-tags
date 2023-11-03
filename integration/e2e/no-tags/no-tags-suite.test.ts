import { registerTags } from 'cy-local/setup';

Cypress.env('cyTagsShowTagsInTitle', true);
registerTags();
describe('no tags and env var is true - should have the same title as it was', () => {
  describe('suite check', () => {
    it('test', function () {
      expect(this.test?.fullTitle()).eq(
        'no tags and env var is true - should have the same title as it was suite check test',
      );
    });
  });
});
