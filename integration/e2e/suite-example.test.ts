describe('cyTagsShowTagsInTitle', () => {
  describe('is false', () => {
    describe('suite with tag @suiteTag', () => {
      describe('suite with tag @apple', () => {
        it('test @tag', function () {
          cy.log(`cyTagsShowTagsInTitle ${Cypress.env('cyTagsShowTagsInTitle')}`);

          if (Cypress.env('cyTagsShowTagsInTitle') === 'false' || Cypress.env('cyTagsShowTagsInTitle') === false) {
            expect(this.test?.tags).deep.eq([
              { tag: '@tag', info: [] },
              { tag: '@apple', info: [] },
              { tag: '@suiteTag', info: [] },
            ]);
            expect(this.test?.title).eq('test');
            expect(this.test?.fullTitle()).eq('cyTagsShowTagsInTitle is false suite with tag suite with tag test');
          } else {
            this.skip();
          }
        });
      });
    });
  });

  describe('is true', () => {
    describe('suite with tag @suiteTag', () => {
      describe('suite with tag @apple', () => {
        it('test @tag', function () {
          cy.log(`cyTagsShowTagsInTitle ${Cypress.env('cyTagsShowTagsInTitle')}`);

          if (Cypress.env('cyTagsShowTagsInTitle') === 'true' || Cypress.env('cyTagsShowTagsInTitle') === true) {
            expect(this.test?.tags).deep.eq([
              { tag: '@tag', info: [] },
              { tag: '@apple', info: [] },
              { tag: '@suiteTag', info: [] },
            ]);
            expect(this.test?.title).eq('test@tag');
            expect(this.test?.fullTitle()).eq(
              'cyTagsShowTagsInTitle is true suite with tag @suiteTag suite with tag @apple @suiteTag test@tag',
            );
          } else {
            this.skip();
          }
        });
      });
    });
  });
  describe('is undefined', () => {
    describe('suite with tag @suiteTag', () => {
      describe('suite with tag @apple', () => {
        it('test @tag', function () {
          cy.log(`cyTagsShowTagsInTitle ${Cypress.env('cyTagsShowTagsInTitle')}`);

          if (Cypress.env('cyTagsShowTagsInTitle') === undefined) {
            expect(this.test?.tags).deep.eq([
              { tag: '@tag', info: [] },
              { tag: '@apple', info: [] },
              { tag: '@suiteTag', info: [] },
            ]);
            expect(this.test?.title).eq('test @tag');
            expect(this.test?.fullTitle()).eq(
              'cyTagsShowTagsInTitle is undefined suite with tag @suiteTag suite with tag @apple test @tag',
            );
          } else {
            this.skip();
          }
        });
      });
    });
  });
});
