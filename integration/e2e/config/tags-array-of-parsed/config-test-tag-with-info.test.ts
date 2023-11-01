describe('parent suite', { tags: [{ tag: '@config', info: ['information'] }] }, () => {
  it('test should have tags in object', function () {
    expect(this.test?.tags).deep.eq([{ tag: '@config', info: ['information'] }]);
  });
});
