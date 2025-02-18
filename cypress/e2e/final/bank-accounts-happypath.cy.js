/* ==== Test variables ==== */
const baseUrl = Cypress.env('baseUrl');
const username = Cypress.env('username');
const password = Cypress.env('password');
const testCompanyWithNoAccounts = "MM TCom 0 acc";
const testCompanyWithOneAccount = "MM TCom 1 acc";
const testCompanyWithTwoAccountsNoDefault = "MM TCom 2 acc (woD)";
const testCompanyWithTwoAccountsWithDefault = "MM TCom 2 acc (wD)";

/* ==== Test scenario ==== */
describe('Different number of bank accounts validation', () => {

  before(() => {

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
    cy.get('.sidenav__logo', { timeout: 20000 }).should('be.visible');
    cy.url().should('include', '/pages/BOARD');

    // Create alieases for all items within the sidenav as @Item_name
    cy.createSideNavAliases();

  });

  it('Visit', function() {

    /* ==== Navigate to Dodavatelská faktura and create alieases for Dodavatel form fields ==== */ 

    // Click on Dodavatelské faktura within Finance
    cy.get('@Finance').click();
    cy.get('@Finance')
      .within(() => {
        cy.get('span').contains('Dodavatelské faktury').click();
      });

    // Open new Dodavatelská faktura form (part of Sestavit button dropdown)
    cy.clickComposeButton();
    cy.get('#Purchase\\ invoice').contains('Dodavatelská faktura').click();

    // Create aliases for Dodavatel form fields
    cy.get('.container-main section .block__wrapper div[class$="company"]').as('Dodavatel')
      .within(() => {
        cy.get('.block__header .select__header').as('jmenoDodavatele');
        cy.get('.block__body .ro:eq(0) .select__header:eq(0)').as('typPrevodu');
        cy.get('.block__body .ro:eq(0) .select__header:eq(1)').as('bankovniUcet');
        cy.get('.block__body .ro:eq(1) .co-12').as('cisloUctu');
      });

    /* ==== Test MM TCom 0 acc ==== */  
    
    // Click on Dodavatel and search for specific company
    cy.get('@jmenoDodavatele').click();
    cy.get('#company-select .view__control .search__container input').as('companySearchField').type(testCompanyWithNoAccounts);

    // Click on the correct item to open specific company
    cy.get('#company-select .view__container [data-test-id="virtuoso-item-list"]').as('companyList')
      .should('be.visible')
      .within(() => {
        cy.get('.type-subject')
          .contains(testCompanyWithNoAccounts)
          .click();
      });

    // Click on Typ převodu and select Domácí to ensure that Domácí is an active option
    cy.get('@typPrevodu').click();
    cy.get('.select__body__item-content').contains('Domácí').click();
    cy.get('@typPrevodu').should('have.text', 'Domácí');

    // Validate expected values within the Dodavatel form
    cy.get('@jmenoDodavatele').should('include.text', testCompanyWithNoAccounts);
    cy.get('@typPrevodu').should('have.text', 'Domácí');
    cy.get('@bankovniUcet').find('.placeholder').should('contain.text', 'Nic na výběr');
    cy.get('@cisloUctu').find('.ellipsis').should('not.have.text');

    // Reload the page and validate that Dodavatel field is empty
    cy.reload();
    cy.get('@jmenoDodavatele',{timeout: 10000}).within(() => {
      cy.get('li.placeholder').should('contain.text', 'Dodavatel');
    });

    /* ==== MM TCom 1 acc ==== */  
    
    // Click on Dodavatel and search for specific company
    cy.get('@jmenoDodavatele').click();
    cy.get('@companySearchField').type(testCompanyWithOneAccount);

    // Click on the correct item to open specific company
    cy.get('@companyList')
      .should('be.visible')
      .within(() => {
        cy.get('.type-subject')
          .contains(testCompanyWithOneAccount)
          .click();
      });

    // Click on Typ převodu and select Domácí to ensure that Domácí is an active option
    cy.get('@typPrevodu').click();
    cy.get('.select__body__item-content').contains('Domácí').click();
    cy.get('@typPrevodu').should('have.text', 'Domácí');

    // Validate expected values within the Dodavatel form
    cy.get('@jmenoDodavatele').should('include.text', testCompanyWithOneAccount);
    cy.get('@typPrevodu').should('have.text', 'Domácí');
    cy.get('@bankovniUcet').find('.ellipsis').should('have.text', 'MM TBA 1/1');
    cy.get('@cisloUctu').find('.ellipsis').should('have.text', '111111111/0101');

    // Reload the page and validate that Dodavatel field is empty
    cy.reload();
    cy.get('@jmenoDodavatele',{timeout: 10000}).within(() => {
      cy.get('li.placeholder').should('contain.text', 'Dodavatel');
    });

    /* ==== MM TCom 2 acc woD ==== */  
    
    // Click on Dodavatel and search for specific company
    cy.get('@jmenoDodavatele').click();
    cy.get('@companySearchField').type(testCompanyWithTwoAccountsNoDefault);

    // Click on the correct item to open specific company
    cy.get('@companyList')
      .should('be.visible')
      .within(() => {
        cy.get('.type-subject')
          .contains(testCompanyWithTwoAccountsNoDefault)
          .click();
      });

    // Click on Typ převodu and select Domácí to ensure that Domácí is an active option
    cy.get('@typPrevodu').click();
    cy.get('.select__body__item-content').contains('Domácí').click();
    cy.get('@typPrevodu').should('have.text', 'Domácí');

    // Validate expected values within the Dodavatel form
    cy.get('@jmenoDodavatele').should('include.text', testCompanyWithTwoAccountsNoDefault);
    cy.get('@typPrevodu').should('have.text', 'Domácí');
    /* START BUG_001: Both "MM TBA 2/1" and "222111111/0201" are expected to be displayed, but they are not.        
    cy.get('@bankovniUcet').find('.ellipsis').should('have.text', 'MM TBA 2/1');
    cy.get('@cisloUctu').find('.ellipsis').should('have.text', '222111111/0201'); 
    END BUG_001 */

    // Reload the page and validate that Dodavatel field is empty
    cy.reload();
    cy.get('@jmenoDodavatele',{timeout: 10000}).within(() => {
      cy.get('li.placeholder').should('contain.text', 'Dodavatel');
    });

    /* ==== MM TCom 2 acc wD ==== */  
    
    // Click on Dodavatel and search for specific company
    cy.get('@jmenoDodavatele').click();
    cy.get('@companySearchField').type(testCompanyWithTwoAccountsWithDefault);

    // Click on the correct item to open specific company
    cy.get('@companyList')
      .should('be.visible')
      .within(() => {
        cy.get('.type-subject')
          .contains(testCompanyWithTwoAccountsWithDefault)
          .click();
      });

    // Click on Typ převodu and select Domácí to ensure that Domácí is an active option
    cy.get('@typPrevodu').click();
    cy.get('.select__body__item-content').contains('Domácí').click();
    cy.get('@typPrevodu').should('have.text', 'Domácí');

    // Validate expected values within the Dodavatel form
    cy.get('@jmenoDodavatele').should('include.text', testCompanyWithTwoAccountsWithDefault);
    cy.get('@typPrevodu').should('have.text', 'Domácí');
    cy.get('@bankovniUcet').find('.ellipsis').should('have.text', 'MM TBA 3/2');
    /* START BUG_002: Text "333222222/0302" is expected to be displayed, but it is not. 
    cy.get('@cisloUctu').find('.ellipsis').should('have.text', '333222222/0302');
    END BUG_002 */

  });

  after(() => {

    // Logout
    cy.get('#user_modal_button_id').click();
    cy.contains('span', 'Odhlášení')
      .parent()
      .closest('.co-12')
      .click();

    // Ověření existence formulářových polí a jejich typů
    cy.get('#login-form').should('exist');

  });

});
  