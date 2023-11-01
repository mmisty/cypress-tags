describe('parent suite', { tags: '@fromConfig' }, () => {
  it('test should have tags in object', function () {
    expect(this.test?.tags).deep.eq([{ tag: '@fromConfig', info: [] }]);
  });
});
