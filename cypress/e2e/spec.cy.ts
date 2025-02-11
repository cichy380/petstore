describe('Pet', () => {
  it('Pet created successfully', () => {
    cy.viewport(1920, 1080);
    cy.visit('/');

    cy.get('#cy-add-new-pet-button').click();

    cy.get('mat-dialog-container#pet-form-dialog__create')
      .should('exist')
      .and('be.visible');

    cy.get('#cy-pet-form-field-name').type('New Pet from Cypress');

    cy.get('#cy-pet-form-submit-button').click();

    cy.contains('Pet created successfully')
      .should('exist')
      .should('be.visible');
  });
});
