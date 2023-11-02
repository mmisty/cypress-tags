import { registerTags } from 'cy-local/register';

/**
 * Use other way to import library by registerTags();
 */
registerTags();

describe('simple', () => {
  it('one @tag("info1")', function () {
    expect(this.test?.tags).to.deep.eq([{ tag: '@tag', info: ['info1'] }]);
  });
});
