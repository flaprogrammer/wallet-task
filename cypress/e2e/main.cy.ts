describe('template spec', () => {
  it('has a header image', () => {
    cy.visit('/');
    cy.getBySel('header').should('exist');
    //cy.percySnapshot();
  });
  it('has network select', () => {
    cy.visit('/');
    cy.getBySel('network-select').should('exist');
    cy.getBySel('network-connect').should('exist');
    //cy.percySnapshot();
  });
  it('should connect to network', () => {
    cy.visit('/');
    cy.getBySel('network-connect').click();

    cy.getBySel('auth-enter-password').click();
    cy.getBySel('auth-submit').should('exist');

    //cy.percySnapshot();
  });
  it('should show add button', () => {
    cy.visit('/');
    cy.getBySel('network-connect').click();
    cy.getBySel('auth-enter-password').click();

    cy.getBySel('auth-password').type('123');
    cy.getBySel('auth-submit').click();

    cy.getBySel('new-button').should('exist');

    //cy.percySnapshot();
  });

  it('should add a new wallet', () => {
    cy.visit('/');
    cy.getBySel('network-connect').click();
    cy.getBySel('auth-enter-password').click();

    cy.getBySel('auth-password').type('123');
    cy.getBySel('auth-submit').click();

    cy.getBySel('new-button').click();

    cy.getBySel('wallets-table').should('contain', 'Address');

    //cy.percySnapshot();
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

    //cy.percySnapshot();
  });
});
