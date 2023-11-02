import { registerTags } from 'cy-local/setup';

/**
 * Should have proper suite/test title when env var is true and tag has info
 */
Cypress.env('cyTagsShowTagsInTitle', true);
registerTags();
describe('cyTagsShowTagsInTitle true', () => {
  describe('suite with tag @suiteTag("info")', () => {
    it('test @tag @skip("skip reason")', function () {
      expect(this.test?.title).eq('test@tag @skip("skip reason")');
      expect(this.test?.fullTitle()).eq(
        'cyTagsShowTagsInTitle true suite with tag @suiteTag("info") test@tag @skip("skip reason")',
      );
    });
  });
});
