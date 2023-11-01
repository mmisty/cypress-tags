describe('parent suite @inline', () => {
  it('test should have tags in object @test', function () {
    expect(this.test?.tags).deep.eq([
      { tag: '@test', info: [] },
      { tag: '@inline', info: [] },
    ]);
  });
});
