it('test in the root with config tag', { tags: '@test' }, function () {
  expect(this.test?.tags).deep.eq([{ tag: '@test', info: [], isOwnTag: true }]);
});
