/**
 * Should keep duplicated with different info
 */
describe('parent @tag @tag("my info")', () => {
  it('test in the root with inline @tag @test', function () {
    expect(this.test?.tags).deep.eq([
      { tag: '@tag', info: [] },
      { tag: '@test', info: [] },
      { tag: '@tag', info: ['my info'] },
    ]);
  });

  it('test in the root with inline @tag @tag("my info")', function () {
    expect(this.test?.tags).deep.eq([
      { tag: '@tag', info: [] },
      { tag: '@tag', info: ['my info'] },
    ]);
  });
});
