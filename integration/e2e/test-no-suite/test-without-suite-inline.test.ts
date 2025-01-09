it('test in the root with inline tag @test', { tags: ['@abc'] }, function () {
  expect(this.test?.tags).to.deep.eq([
    { tag: '@abc', info: [], isOwnTag: true },
    { tag: '@test', info: [], isOwnTag: true },
  ]);
});
