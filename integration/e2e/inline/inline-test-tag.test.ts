describe('parent suite @inline', () => {
  it('test should have tags in object', function () {
    expect(this.test?.tags).deep.eq([{ tag: '@inline', info: [] }]);
  });
});
