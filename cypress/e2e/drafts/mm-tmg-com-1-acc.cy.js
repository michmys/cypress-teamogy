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

    cy.wait(10000);
    
    cy.get('.sidenav__logo', {timeout: 20000}).should('be.visible');
    cy.url().should('include', '/pages/BOARD'); // Ověření, že jsme na dashboardu

    // List all items within the sidenav and save each as an alias in the form @Item_name
    cy.get('.sidenav__wrapper .nav__list > li').each(($el, index) => {
      // Zkontroluj, zda <li> obsahuje <div> s třídou 'dd type-menu'
      if ($el.find('div.dd.type-menu').length > 0) {
        // Hledání čistého <span>, které nemá třídu
        const itemText = $el.find('span:not([class])').text().trim();
    
        // Pokud <span> obsahuje text, pokračuj
        if (itemText) {

          // Vytvoření aliasu pro každou položku
          const aliasName = itemText.replace(/\s+/g, '_'); // Alias bude název položky, nahrazuje mezery podtržítky
          cy.wrap($el).as(aliasName); // Uloží alias pro každou položku
        }
      }
    });

    // Click on Kontakty in the sidenav
    cy.get('@Finance').click();

    // Kliknutí na položku Kontakty
    cy.get('@Finance') // Alias pro Kontakty
      .within(() => {
        // Kliknutí na položku "Společnosti" v rámci Kontakty
        cy.get('span').contains('Dodavatelské faktury').click(); // Hledáme text "Společnosti" a klikneme na něj
      });



    cy.get('.container-main .nav-nd > li').contains('Sestavit').as('Sestavit');
    cy.get('@Sestavit').click();

    cy.get('#Purchase\\ invoice').contains('Dodavatelská faktura').click();


    //cy.get('.container-main section .block__wrapper.wrap-6-3-3 div[class$="company"]').as('Dodavatel');
    cy.get('.container-main section .block__wrapper div[class$="company"]').as('Dodavatel')
      .within(() => {
        cy.get('.block__header .select__header').as('jmenoDodavatele');
        cy.get('.block__body .ro:eq(0) .select__header:eq(0)').as('typPrevodu');
        cy.get('.block__body .ro:eq(0) .select__header:eq(1)').as('bankovniUcet');
        cy.get('.block__body .ro:eq(1) .co-12').as('cisloUctu');
      });

  });
      
  it('MM TCom 1 acc', function() {

    const testCompanyWithOneAccount = "MM TCom 1 acc";
    
    cy.get('@jmenoDodavatele').click();
    cy.get('#company-select .view__control .search__container input').as('companySearchField').type(testCompanyWithOneAccount);

    // Následně kliknutí na správnou položku
    cy.get('#company-select .view__container [data-test-id="virtuoso-item-list"] div').as('companyList')
      .contains(testCompanyWithOneAccount)
      .should('be.visible')
      .click();

    cy.get('@typPrevodu').click();
    cy.get('.select__body__item-content').contains('Domácí').click();
    cy.get('@typPrevodu').should('have.text', 'Domácí'); // Ověří, že se hodnota změnila v select__header

    cy.get('@jmenoDodavatele').should('include.text', testCompanyWithOneAccount);
    cy.get('@typPrevodu').should('have.text', 'Domácí');
    cy.get('@bankovniUcet').find('.ellipsis').should('have.text', 'MM TBA 1/1');
    cy.get('@cisloUctu').find('.ellipsis').should('have.text', '111111111/0101');

  });

  after(() => {
    // Logout
    cy.get('#user_modal_button_id').click();
    cy.contains('span', 'Odhlášení') // Najde span s textem "Odhlášení"
      .parent() // Přejde na rodičovský element
      .closest('.co-12') // Najde nejbližší element s třídou co-12
      .click(); // Klikne na tento element
  
    // Ověření existence formulářových polí a jejich typů
    cy.get('#login-form', {timeout: 20000}).should('exist');
  });

});
  