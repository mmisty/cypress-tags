/**
 * Should keep duplicated with different info
 */
describe('parent @tag @tag("my info")', () => {
  it('test in the root with inline @tag @test', function () {
    expect(this.test?.tags).deep.eq([
      { tag: '@tag', info: [], isOwnTag: true },
      { tag: '@test', info: [], isOwnTag: true },
      { tag: '@tag', info: ['my info'] },
    ]);
  });

  it('test in the root with inline @tag @tag("my info")', function () {
    expect(this.test?.tags).deep.eq([
      { tag: '@tag', info: [], isOwnTag: true },
      { tag: '@tag', info: ['my info'], isOwnTag: true },
    ]);
  });
});
