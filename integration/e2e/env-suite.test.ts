import { registerTags } from 'cy-local/setup';

/**
 * Should have proper suite title when env var is true
 */
Cypress.env('cyTagsShowTagsInTitle', true);
registerTags();
describe('cyTagsShowTagsInTitle true', () => {
  describe('suite with tag @suiteTag', () => {
    it('test @tag', function () {
      expect(this.test?.title).eq('test@tag @suiteTag');
      expect(this.test?.fullTitle()).eq('cyTagsShowTagsInTitle true suite with tag @suiteTag test@tag @suiteTag');
    });
  });
});
