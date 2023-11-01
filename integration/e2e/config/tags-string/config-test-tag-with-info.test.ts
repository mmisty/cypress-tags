describe('parent suite', { tags: '@config("information")' }, () => {
  it('test should have tags in object', function () {
    expect(this.test?.tags).deep.eq([{ tag: '@config', info: ['information'] }]);
  });
});
