describe('template spec', () => {
  /* ==== Test Created with Cypress Studio ==== */
  it('login-teamogy', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('https://testteam.luckydrum.com/');
    cy.get('#login').clear('michal.mysik');
    cy.get('#login').type('michal.mysik');
    cy.get('#teamogy-password').clear('VmcQzTBM@GGYt9f');
    cy.get('#teamogy-password').type('VmcQzTBM@GGYt9f');
    cy.get('.loginbox__btn__wrapper > .loginbox__btn').click();
    cy.get('.sidenav__logo').should('be.visible');
    /* ==== End Cypress Studio ==== */
  });
})