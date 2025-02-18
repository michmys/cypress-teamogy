/* ==== Test variables ==== */
const baseUrl = Cypress.env('baseUrl');
const username = Cypress.env('username');
const password = Cypress.env('password');

/* ==== Custom commands ==== */

Cypress.Commands.add('login', () => {
  // Navigate to login page and populate username and password fields
  cy.visit(baseUrl);
  cy.get('#login').clear().type(username);
  cy.get('#teamogy-password').clear().type(password);

  // Login to the application by clicking on the login button
  cy.get('.loginbox__btn__wrapper.pwdstrength')
    .find('button.loginbox__btn')
    .should('be.visible')
    .click();

  // Verify that the application has successfully logged in
  cy.get('.sidenav__logo', {timeout: 20000}).should('be.visible');
  cy.url().should('include', '/pages/BOARD');
});

Cypress.Commands.add('createSideNavAliases', () => {

      // List all items within the sidenav and save each as an alias in the form @Item_name
      cy.get('.sidenav__wrapper .nav__list > li').each(($el, index) => {
        // Zkontroluj, zda <li> obsahuje <div> s třídou 'dd type-menu'
        if ($el.find('div.dd.type-menu').length > 0) {
          // Hledání čistého <span>, které nemá třídu
          const itemText = $el.find('span:not([class])').text().trim();
      
          // Pokud <span> obsahuje text, pokračuj
          if (itemText) {

            // Vytvoření aliasu pro každou položku ve tvaru Nazev_polozky
            const aliasName = itemText.replace(/\s+/g, '_');
            cy.wrap($el).as(aliasName);
          }
        }
      });

});

Cypress.Commands.add('clickComposeButton', () => {

  cy.get('.container-main .nav-nd > li').contains('Sestavit').as('Sestavit');
  cy.get('@Sestavit').click();

});