describe('parent suite', { tags: [{ tag: '@fromConfig', info: [] }] }, () => {
  it('test should have tags in object', function () {
    expect(this.test?.tags).deep.eq([{ tag: '@fromConfig', info: [] }]);
  });
});
