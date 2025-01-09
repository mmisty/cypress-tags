import { registerTags } from 'cy-local/setup';

Cypress.env('cyTagsShowTagsInTitle', true);
registerTags();

describe('own tags', { tags: ['@SMOKE'] }, () => {
  it('should have own tag flag for own test tag', { tags: ['@P1'] }, function () {
    expect(this.test?.tags).deep.eq([
      { tag: '@P1', info: [], isOwnTag: true },
      { tag: '@SMOKE', info: [] },
    ]);
  });

  describe('own tags nested', { tags: ['@REGReSSION'] }, () => {
    it('should have own tag flag for own test tag 2', { tags: ['@P2'] }, function () {
      expect(this.test?.tags).deep.eq([
        { tag: '@P2', info: [], isOwnTag: true },
        { tag: '@REGReSSION', info: [] },
        { tag: '@SMOKE', info: [] },
      ]);
    });
  });
});
