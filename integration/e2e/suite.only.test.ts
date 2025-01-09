describe.only('suite only', () => {
  it('test', { tags: ['@tag'] }, function () {
    expect(this.test?.tags).deep.eq([{ tag: '@tag', info: [], isOwnTag: true }]);
  });
});
