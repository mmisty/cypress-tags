describe('parent @tag', () => {
  it('test 2 tags @test', function () {
    expect(this.test?.tags).deep.eq([
      { tag: '@test', info: [], isOwnTag: true },
      { tag: '@tag', info: [] },
    ]);
  });

  describe('child @tag2', () => {
    it('test 3 tags @test', function () {
      expect(this.test?.tags).deep.eq([
        { tag: '@test', info: [], isOwnTag: true },
        { tag: '@tag2', info: [] },
        { tag: '@tag', info: [] },
      ]);
    });

    describe('nested @tag3', () => {
      it('test 4 tags @test', function () {
        expect(this.test?.tags).deep.eq([
          { tag: '@test', info: [], isOwnTag: true },
          { tag: '@tag3', info: [] },
          { tag: '@tag2', info: [] },
          { tag: '@tag', info: [] },
        ]);
      });
    });
  });
});
