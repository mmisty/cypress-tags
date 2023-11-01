describe('parent suite @inline("information")', () => {
  it('test should have tags in object', function () {
    expect(this.test?.tags).deep.eq([{ tag: '@inline', info: ['information'] }]);
  });
});
