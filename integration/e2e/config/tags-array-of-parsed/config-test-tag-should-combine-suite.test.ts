describe('parent suite', { tags: [{ tag: '@fromConfig', info: [] }] }, () => {
  it('test should have tags in object', { tags: [{ tag: '@test', info: [] }] }, function () {
    expect(this.test?.tags).deep.eq([
      { tag: '@test', info: [], isOwnTag: true },
      { tag: '@fromConfig', info: [] },
    ]);
  });
});
