import { registerTags } from 'cy-local/setup';

/**
 * Should have proper tags when retires and do not show tags in title
 */
Cypress.env('cyTagsShowTagsInTitle', false);
registerTags();
describe('retries - should transfer tags to retries @retries', { retries: 1 }, () => {
  afterEach(function () {
    if (
      this.currentTest &&
      this.currentTest.tags &&
      this.currentTest.tags.filter(t => t?.tag == '@failOnPurpose')?.length > 0 &&
      this.currentTest.err?.message.indexOf('Fail on Purpose') !== -1
    ) {
      this.currentTest.state = 'passed';
    }
  });

  it('test @failOnPurpose', function () {
    expect(this.test?.title).eq('test');
    cy.wrap(null).then(() =>
      expect(this.test?.tags).to.deep.eq([
        { tag: '@failOnPurpose', info: [], isOwnTag: true },
        { tag: '@retries', info: [] },
      ]),
    );
    cy.wrap(null).then(() => {
      throw new Error('Fail on Purpose');
    });
  });
});
