describe('template spec', () => {
  it('has a header image', () => {
    cy.visit('/');
    cy.percySnapshot();
    cy.getBySel('header').should('exist');
  });
  it('has network select', () => {
    cy.visit('/');
    cy.getBySel('network-select').should('exist');
    cy.getBySel('network-connect').should('exist');
  });
  it('should connect to network', () => {
    cy.visit('/');
    cy.getBySel('network-connect').click();

    cy.getBySel('auth-enter-password').click();
    cy.percySnapshot();
    cy.getBySel('auth-submit').should('exist');
  });
  it('should show add button', () => {
    cy.visit('/');
    cy.getBySel('network-connect').click();
    cy.getBySel('auth-enter-password').click();

    cy.getBySel('auth-password').type('123');
    cy.getBySel('auth-submit').click();

    cy.percySnapshot();

    cy.getBySel('new-button').should('exist');
  });

  it('should add a new wallet', () => {
    cy.visit('/');
    cy.getBySel('network-connect').click();
    cy.getBySel('auth-enter-password').click();

    cy.getBySel('auth-password').type('123');
    cy.getBySel('auth-submit').click();

    cy.getBySel('new-button').click();

    cy.percySnapshot();

    cy.getBySel('wallets-table').should('contain', 'Address');
  });

  it('should remove a wallet', () => {
    cy.visit('/');
    cy.getBySel('network-connect').click();
    cy.getBySel('auth-enter-password').click();

    cy.getBySel('auth-password').type('123');
    cy.getBySel('auth-submit').click();

    cy.getBySel('new-button').click();
    cy.getBySel('wallets-remove').click();

    cy.getBySel('wallets-table').should('not.exist');
  });
});
