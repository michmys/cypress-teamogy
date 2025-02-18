/* ==== Test variables ==== */
const baseUrl = Cypress.env('baseUrl');
const username = Cypress.env('username');
const password = Cypress.env('password');

/* ==== Test scenario ==== */
describe('Login Page Validation', () => {

  let userId;
/*
  beforeEach(() => {
    //cy.login_wCredentials_wSession();

   
    cy.session([username,password], () => {
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

      // Extrahování ID uživatele z URL
      cy.url().then(url => {
        const userIdFromUrl = url.split('/')[3]; // Předpokládáme, že ID je ve čtvrté části URL
        userId = userIdFromUrl; // Uložení ID pro použití v dalších testech
      });

    });


    
  });
*/

  it('Visit', function() {

    //cy.session([username,password], () => {
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
    //});

    //cy.reload()

    //cy.pause();

    //cy.getCookies().then(cookies => {
      //console.log(cookies); // Prozkoumej cookies, jestli neobsahují chyby
    //});
  
    // Vymaž cookies před použitím cy.visit, pokud je třeba
    //cy.clearCookies();

    cy.visit(`https://testteam.luckydrum.com/44f3ec879cca5a85/1/pages/BOARD`);
    //cy.visit('/44f3ec879cca5a85/1/pages/BOARD');
    //cy.visit(baseUrl);

    //cy.pause();

  });

/*  

  it('Login', function() {

    //cy.login(username,password);
    //cy.login_wCredentials();

  });
  it('Kontakty', function() {

    //cy.session('userSession', () => {
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

      // Extrahování ID uživatele z URL
      cy.url().then(url => {
        const userIdFromUrl = url.split('/')[3]; // Předpokládáme, že ID je ve čtvrté části URL
        userId = userIdFromUrl; // Uložení ID pro použití v dalších testech
      });
      cy.log(userId)

    //});

    //cy.visit(`https://testteam.luckydrum.com/${userId}/1/pages/BOARD`);
    cy.get('.sidenav__wrapper li').contains('Kontakty').parent().click();

  });
  it('Finance', function() {

    //cy.visit(`https://testteam.luckydrum.com/${userId}/1/pages/BOARD`);
    //cy.get('.sidenav__wrapper li').contains('Finance').parent().click();

  });

*/

});
  