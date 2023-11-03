describe('parent @tag', () => {
  describe('child @tag2', () => {
    describe('nested @tag3', () => {
      it('test @test', function () {
        expect(this.test?.tags).deep.eq([
          { tag: '@test', info: [] },
          { tag: '@tag3', info: [] },
          { tag: '@tag2', info: [] },
          { tag: '@tag', info: [] },
        ]);
      });
    });
  });
});
