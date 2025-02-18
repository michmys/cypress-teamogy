describe('Login to Teamogy', () => {
    it('should log in successfully', function() {
      // Visit the login page
      cy.visit('https://testteam.luckydrum.com/');
  
      // Use data attributes for selecting the input fields
      cy.get('[data-cy="login-input"]').clear().type('michal.mysik');
      cy.get('[data-cy="password-input"]').clear().type('VmcQzTBM@GGYt9f');
  
      // Use data attribute for the login button
      cy.get('[data-cy="login-button"]').click();
  
      // Verify that the logo is visible after login
      cy.get('[data-cy="sidenav-logo"]').should('be.visible');
    });
  });
  