import { registerTags } from 'cy-local/setup';

Cypress.env('cyTagsShowTagsInTitle', false);
registerTags();

describe('should keep tags in object when inline tags and show tags is false', () => {
  it('one @tag("info1")', function () {
    expect(this.test?.tags).to.deep.eq([{ tag: '@tag', info: ['info1'] }]);
  });
});
