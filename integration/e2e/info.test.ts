import { tag } from 'cy-local/utils/tags';
import { registerTags } from 'cy-local/setup';

[true, false].forEach(cyTagsShowTagsInTitle => {
  Cypress.env('cyTagsShowTagsInTitle', cyTagsShowTagsInTitle);
  registerTags();

  describe(`should have proper infos when cyTagsShowTagsInTitle is ${cyTagsShowTagsInTitle}`, () => {
    it('one @tag("info1")', function () {
      expect(this.test?.tags).to.deep.eq([{ tag: '@tag', info: ['info1'] }]);
    });

    it('several @tag("info1","info2")', function () {
      expect(this.test?.tags).to.deep.eq([{ tag: '@tag', info: ['info1', 'info2'] }]);
    });

    it('several with spaces @tag("info1 one", "info2 two")', function () {
      console.log(this.test?.tags);
      expect(this.test?.tags).to.deep.eq([{ tag: '@tag', info: ['info1 one', 'info2 two'] }]);
    });

    it('one with spaces @tag("some info with spaces")', function () {
      expect(this.test?.tags).to.deep.eq([{ tag: '@tag', info: ['some info with spaces'] }]);
    });

    it('one with special symbols', { tags: [{ tag: '@tag', info: ['Special symbol $%^@@$`'] }] }, function () {
      console.log(this.test?.tags);
      expect(this.test?.tags).to.deep.eq([{ tag: '@tag', info: ['Special symbol $%^@@$`'] }]);
    });

    it(`one with special symbols (helper for title) ${tag('tag', 'Special symbol $%^@@$`')} `, function () {
      expect(this.test?.tags).to.deep.eq([{ tag: '@tag', info: ['Special symbol $%^@@$`'] }]);
    });
  });
});
