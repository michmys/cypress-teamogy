/* ==== Test variables ==== */
const baseUrl = Cypress.env('baseUrl');
const username = Cypress.env('username');
const password = Cypress.env('password');

/* ==== Test scenario ==== */
describe('Login Page Validation', () => {


  it('Visit', function() {

/*     Cypress.on('uncaught:exception', (err, runnable) => {
      // Ignoruj chybu, která se týká push služby
      if (err.message.includes('push service not available')) {
        return false;  // Vrácení false způsobí, že Cypress tuto chybu ignoruje
      }
      
      // Pro ostatní chyby necháme Cypress, aby je detekoval
      return true;
    }); */

    cy.visit(baseUrl);
    cy.get('#login').clear().type(username);
    cy.get('#teamogy-password').clear().type(password);

    // Login to the application by clicking on the login button
    cy.get('.loginbox__btn__wrapper.pwdstrength')
      .find('button.loginbox__btn')
      .should('be.visible')
      .click();

    cy.get('.sidenav__logo', {timeout: 20000}).should('be.visible');
    cy.url().should('include', '/pages/BOARD'); // Ověření, že jsme na dashboardu

    // Click on Kontakty in the sidenav
/*     cy.get('.sidenav__wrapper li')
      .contains('Kontakty')
      .parent()
      .click(); */

/*     cy.get('.sidenav__wrapper .nav__list > li')
      .contains('Kontakty')
      .as('Kontakty'); // Uloží alias

      cy.get('@Kontakty').click(); */

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

/*       // Click on Kontakty in the sidenav
      cy.get('@Kontakty').click();

      // Kliknutí na položku Kontakty
      cy.get('@Kontakty') // Alias pro Kontakty
        .within(() => {
          // Kliknutí na položku "Společnosti" v rámci Kontakty
          cy.get('span').contains('Společnosti').click(); // Hledáme text "Společnosti" a klikneme na něj
        }); */

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

/*         cy.get('@Sestavit')
          .within(() => {
            cy.get('#Purchase\\ invoice').contains('Dodavatelská faktura').click();
          }); */

        cy.get('#Purchase\\ invoice').contains('Dodavatelská faktura').click();

        //container-main section .block__wrapper > div[class$="company"]

        //cy.get('.container-main section .block__wrapper.wrap-6-3-3 div[class$="company"]').as('Dodavatel');
        cy.get('.container-main section .block__wrapper div[class$="company"]').as('Dodavatel')
          .within(() => {
            cy.get('.block__header .select__header').as('jmenoDodavatele');
            cy.get('.block__body .ro:eq(0) .select__header:eq(0)').as('typPrevodu');
            cy.get('.block__body .ro:eq(0) .select__header:eq(1)').as('bankovniUcet');
            cy.get('.block__body .ro:eq(1) .co-12').as('cisloUctu');
          });

        
        /* ==== MM TCom 0 acc ==== */  

        const testCompanyWithNoAccounts = "MM TCom 0 acc";
        
        cy.get('@jmenoDodavatele').click();

        cy.get('#company-select .view__control .search__container input').as('companySearchField').type(testCompanyWithNoAccounts);

        //cy.wait(2000);  // Počkáme 2 sekundy

        //cy.get('#company-select .view__container [data-test-id="virtuoso-item-list"] div')
          //.should('have.length', 1)  // Čeká, dokud nebude seznam obsahovat přesně jednu položku

        // Následně kliknutí na správnou položku
        cy.get('#company-select .view__container [data-test-id="virtuoso-item-list"] div').as('companyList')
          .contains(testCompanyWithNoAccounts)
          .should('be.visible')
          .click();

        cy.get('@typPrevodu').click();
        cy.get('.select__body__item-content').contains('Domácí').click();
        cy.get('@typPrevodu').should('have.text', 'Domácí'); // Ověří, že se hodnota změnila v select__header

        //cy.wait(2000);  // Počkáme 2 sekundy

        cy.get('@jmenoDodavatele').should('include.text', testCompanyWithNoAccounts);
        cy.get('@typPrevodu').should('have.text', 'Domácí');
        cy.get('@bankovniUcet').find('.placeholder').should('contain.text', 'Nic na výběr');
        cy.get('@cisloUctu').find('.ellipsis').should('not.have.text');

/*         cy.get('@cisloUctu').within(() => {
          cy.get('.ellipsis').should('have.text', '');
        }); */
/*         cy.get('@cisloUctu').within(() => {
          cy.get('.ellipsis',{timeout: 5000}).should('not.have.text');
        }); */



/*         cy.get('@typPrevodu').click();

        cy.contains('@typPrevodu') // Najde label "Typ převodu"
          .parent() // Jdeme k rodiči, což je kontejner celého selectu
          .within(() => {
            cy.get('.select__header').click();
            cy.get('.select__body__item-content').contains('Domácí').click();
          }); */

        cy.reload();

        cy.get('@jmenoDodavatele',{timeout: 10000}).within(() => {
          cy.get('li.placeholder').should('contain.text', 'Dodavatel');
        });


        

        //cy.get('@jmenoDodavatele',{timeout: 10000})
          //.should('have.attr', 'placeholder', 'Dodavatel');

        /* ==== MM TCom 1 acc ==== */  

        const testCompanyWithOneAccount = "MM TCom 1 acc";
        
        cy.get('@jmenoDodavatele').click();

        cy.get('#company-select .view__control .search__container input').as('companySearchField').type(testCompanyWithOneAccount);

        //cy.wait(2000);  // Počkáme 2 sekundy

        //cy.get('#company-select .view__container [data-test-id="virtuoso-item-list"] div')
          //.should('have.length', 1)  // Čeká, dokud nebude seznam obsahovat přesně jednu položku

        // Následně kliknutí na správnou položku
        cy.get('#company-select .view__container [data-test-id="virtuoso-item-list"] div').as('companyList')
          .contains(testCompanyWithOneAccount)
          .should('be.visible')
          .click();

        cy.get('@typPrevodu').click();
        cy.get('.select__body__item-content').contains('Domácí').click();
        cy.get('@typPrevodu').should('have.text', 'Domácí'); // Ověří, že se hodnota změnila v select__header

        //cy.wait(2000);  // Počkáme 2 sekundy

        cy.get('@jmenoDodavatele').should('include.text', testCompanyWithOneAccount);
        cy.get('@typPrevodu').should('have.text', 'Domácí');
        cy.get('@bankovniUcet').find('.ellipsis').should('have.text', 'MM TBA 1/1');
        cy.get('@cisloUctu').find('.ellipsis').should('have.text', '111111111/0101');

        cy.reload();

        cy.get('@jmenoDodavatele',{timeout: 10000}).within(() => {
          cy.get('li.placeholder').should('contain.text', 'Dodavatel');
        });

        /* ==== MM TCom 2 acc woD ==== */  

        const testCompanyWithTwoAccountsNoDefault = "MM TCom 2 acc (woD)";
        
        cy.get('@jmenoDodavatele').click();

        cy.get('#company-select .view__control .search__container input').as('companySearchField').type(testCompanyWithTwoAccountsNoDefault);

        // Následně kliknutí na správnou položku
        cy.get('#company-select .view__container [data-test-id="virtuoso-item-list"] div').as('companyList')
          .contains(testCompanyWithTwoAccountsNoDefault)
          .should('be.visible')
          .click();

        cy.get('@typPrevodu').click();
        cy.get('.select__body__item-content').contains('Domácí').click();
        cy.get('@typPrevodu').should('have.text', 'Domácí'); // Ověří, že se hodnota změnila v select__header

        //cy.wait(2000);  // Počkáme 2 sekundy

        cy.get('@jmenoDodavatele').should('include.text', testCompanyWithTwoAccountsNoDefault);
        cy.get('@typPrevodu').should('have.text', 'Domácí');
        //BUG_001 cy.get('@bankovniUcet').find('.ellipsis').should('have.text', 'MM TBA 2/1');
        //BUG_001 cy.get('@cisloUctu').find('.ellipsis').should('have.text', '222111111/0201');

        cy.reload();

        cy.get('@jmenoDodavatele',{timeout: 10000}).within(() => {
          cy.get('li.placeholder').should('contain.text', 'Dodavatel');
        });

        /* ==== MM TCom 2 acc wD ==== */  

        const testCompanyWithTwoAccountsWithDefault = "MM TCom 2 acc (wD)";
        
        cy.get('@jmenoDodavatele').click();

        cy.get('#company-select .view__control .search__container input').as('companySearchField').type(testCompanyWithTwoAccountsWithDefault);

        // Následně kliknutí na správnou položku
        cy.get('#company-select .view__container [data-test-id="virtuoso-item-list"] div').as('companyList')
          .contains(testCompanyWithTwoAccountsWithDefault)
          .should('be.visible')
          .click();

        cy.get('@typPrevodu').click();
        cy.get('.select__body__item-content').contains('Domácí').click();
        cy.get('@typPrevodu').should('have.text', 'Domácí'); // Ověří, že se hodnota změnila v select__header

        //cy.wait(2000);  // Počkáme 2 sekundy

        cy.get('@jmenoDodavatele').should('include.text', testCompanyWithTwoAccountsWithDefault);
        cy.get('@typPrevodu').should('have.text', 'Domácí');
        cy.get('@bankovniUcet').find('.ellipsis').should('have.text', 'MM TBA 3/2');
        //BUG_002 cy.get('@cisloUctu').find('.ellipsis').should('have.text', '333222222/0302');

/*         cy.reload();

        cy.get('@jmenoDodavatele',{timeout: 10000}).within(() => {
          cy.get('li.placeholder').should('contain.text', 'Dodavatel');
        }); */

        //logout
        cy.get('#user_modal_button_id').click();
        cy.contains('span', 'Odhlášení') // Najde span s textem "Odhlášení"
          .parent() // Přejde na rodičovský element
          .closest('.co-12') // Najde nejbližší element s třídou co-12
          .click(); // Klikne na tento element

        // Ověření existence formulářových polí a jejich typů
				cy.get('#login-form').should('exist');







/*       // Click on Kontakty in the sidenav
      cy.get('@Finance').click(); */
      
      
      
      




/*     cy.get('@kontakty').within(() => {
      cy.contains('Společnosti').click();
    }); */


/*     // Click on Společnosti in the sidenav
    cy.get('.sidenav__wrapper li')
      .contains('Kontakty')
      .parent()
      .within(() => {
        cy.get('li').contains('Společnosti').parent().click();
      }); */
    



  });

});
  