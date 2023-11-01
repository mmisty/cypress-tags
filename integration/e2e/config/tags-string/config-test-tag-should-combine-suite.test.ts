describe('parent suite', { tags: '@fromConfig' }, () => {
  it('test should have tags in object', { tags: '@test' }, function () {
    expect(this.test?.tags).deep.eq([
      { tag: '@test', info: [] },
      { tag: '@fromConfig', info: [] },
    ]);
  });
});
