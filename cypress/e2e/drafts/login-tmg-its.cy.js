describe('Login Page Validation', () => {
    // Tento blok se spustí před každým "it", navštíví stránku
    beforeEach(() => {
      cy.visit('https://testteam.luckydrum.com/');
    });
  
    it('should verify container__header exists', function() {
      cy.get('.container__header')
        .should('exist');
    });
  
    it('should verify container__box contains login form and elements', function() {
      cy.get('.container__box').within(() => {
        cy.get('#login-form').should('exist');
  
        cy.get('input[name="username"]')
          .should('exist')
          .and('have.attr', 'type', 'text');
  
        cy.get('input[name="password"]')
          .should('exist')
          .and('have.attr', 'type', 'password');
  
        cy.get('label[for="login"]')
          .should('have.text', 'Uživatelské jméno  ');
  
        cy.get('label[for="password"]')
          .should('have.text', 'Heslo  ');
  
        cy.get('i.fas.fa-eye.link-eye')
          .should('exist')
          .and('be.visible');
  
        cy.get('span[phrase="Forgot your password?"]')
          .should('exist')
          .and('have.text', 'Zapomenuté heslo? ');
  
        cy.get('button.loginbox__btn')
          .should('exist')
          .and('be.visible')
          .within(() => {
            cy.get('span[phrase="Log in"]')
              .invoke('text')
              .then((text) => {
                expect(text.trim()).to.eq('Přihlásit');
              });
          });
      });
    });
  
    it('should verify "Co je nového v této verzi" link', function() {
      cy.get('.messagebox p a')
        .contains('Co je nového v této verzi')
        .should('exist')
        .and('have.attr', 'href', 'https://www.teamogy.com/cs/latest-relase-notes');
    });
  
    it('should verify container__footer contains support chat link', function() {
      cy.get('.container__footer').within(() => {
        cy.get('a')
          .contains('Chat s týmem podpory')
          .should('have.attr', 'href', '/help');
      });
    });
  });
  