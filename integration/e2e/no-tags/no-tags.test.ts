import { registerTags } from 'cy-local/setup';

Cypress.env('cyTagsShowTagsInTitle', true);
registerTags();
describe('no tags and env var is true - should have the same title as it was', () => {
  it('test', function () {
    expect(this.test?.title).eq('test');
  });
});
