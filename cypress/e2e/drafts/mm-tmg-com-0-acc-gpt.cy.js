/* ==== Test variables ==== */
const baseUrl = Cypress.env('baseUrl');
const username = Cypress.env('username');
const password = Cypress.env('password');

/* ==== Test scenario ==== */
describe('Login Page Validation', () => {

  before(() => {
    cy.visit(baseUrl);
    cy.get('#login').clear().type(username);
    cy.get('#teamogy-password').clear().type(password);
    
    // Login to the application by clicking on the login button
    cy.get('.loginbox__btn__wrapper.pwdstrength')
      .find('button.loginbox__btn')
      .should('be.visible')
      .click();
    
    // Verify that the logo is visible and we are on the dashboard
    cy.get('.sidenav__logo', {timeout: 20000}).should('be.visible');
    cy.url().should('include', '/pages/BOARD');

    // List all items within the sidenav and create an alias for each item
    cy.get('.sidenav__wrapper .nav__list > li').each(($el) => {
      if ($el.find('div.dd.type-menu').length > 0) {
        const itemText = $el.find('span:not([class])').text().trim();
        if (itemText) {
          const aliasName = itemText.replace(/\s+/g, '_');
          cy.wrap($el).as(aliasName);
        }
      }
    });

    // Click on "Finance" in the sidenav
    cy.get('@Finance').click();

    // Click on "Dodavatelské faktury" under "Finance"
    cy.get('@Finance').within(() => {
      cy.get('span').contains('Dodavatelské faktury').click();
    });

    // Click on "Sestavit" button and select "Dodavatelská faktura"
    cy.get('.container-main .nav-nd > li').contains('Sestavit').as('Sestavit');
    cy.get('@Sestavit').click();

    // Click on "Dodavatelská faktura" under "Sestavit" menu
    cy.get('#Purchase\\ invoice').contains('Dodavatelská faktura').click();

    // Create aliases for the supplier and input fields
    cy.get('.container-main section .block__wrapper div[class$="company"]').as('Dodavatel')
      .within(() => {
        cy.get('.block__header .select__header').as('jmenoDodavatele');
        cy.get('.block__body .ro:eq(0) .select__header:eq(0)').as('typPrevodu');
        cy.get('.block__body .ro:eq(0) .select__header:eq(1)').as('bankovniUcet');
        cy.get('.block__body .ro:eq(1) .co-12').as('cisloUctu');
      });
  });
      
  it('MM TCom 0 acc', function() {
    const testCompanyWithNoAccounts = "MM TCom 0 acc";
    
    // Select supplier and search for the company
    cy.get('@jmenoDodavatele').click();
    cy.get('#company-select .view__control .search__container input').as('companySearchField').type(testCompanyWithNoAccounts);

    // Click on the correct item from the search list
    cy.get('#company-select .view__container [data-test-id="virtuoso-item-list"] div').as('companyList')
      .contains(testCompanyWithNoAccounts)
      .should('be.visible')
      .click();

    // Select transfer type
    cy.get('@typPrevodu').click();
    cy.get('.select__body__item-content').contains('Domácí').click();
    cy.get('@typPrevodu').should('have.text', 'Domácí');

    // Verify supplier information
    cy.get('@jmenoDodavatele').should('include.text', testCompanyWithNoAccounts);
    cy.get('@typPrevodu').should('have.text', 'Domácí');
    cy.get('@bankovniUcet').find('.placeholder').should('contain.text', 'Nic na výběr');
    cy.get('@cisloUctu').find('.ellipsis').should('not.have.text');
  });

  after(() => {
    // Logout
    cy.get('#user_modal_button_id').click();
    cy.contains('span', 'Odhlášení')
      .parent()
      .closest('.co-12')
      .click();
  
    // Verify login form is visible after logout
    cy.get('#login-form', {timeout: 20000}).should('exist');
  });

});
