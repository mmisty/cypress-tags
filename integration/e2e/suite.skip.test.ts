describe.skip('suite skip', () => {
  it('skips', () => {
    cy.get('[data-test-id="data-name-section"] input').should('exist').should('have.attr', 'placeholder', 'name');
  });
});
