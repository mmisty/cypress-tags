import { registerTags } from 'cy-local/setup';

registerTags();
registerTags();
registerTags();

describe('should have single tag after registering several times @suiteTag', () => {
  it('test @tag', function () {
    expect(this.test?.title).eq('test @tag');
    expect(this.test?.tags).deep.eq([
      { tag: '@tag', info: [] },
      { tag: '@suiteTag', info: [] },
    ]);
  });
});
