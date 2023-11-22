describe.only('suite only', () => {
  it('test', { tags: ['@tag'] }, function () {
    expect(this.test?.title).eq('test @tag');
  });
});
