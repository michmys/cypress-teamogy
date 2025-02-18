/* ==== Test variables ==== */
const baseUrl = Cypress.env('baseUrl');

/* ==== Test scenario ==== */
describe('Login Page Validation', () => {

  beforeEach(() => {

		cy.visit(baseUrl);
	
	});

	it('Validate header visibility', function() {

	// Verification of the presence of container__header
    cy.get('.container__header')
		  .should('exist');

  });

  it('Validate login form and release notes link', function() {

		// Verification of the presence of container__box
		cy.get('.container__box')
			.within(() => {
      	cy.get('#login-form')
					.should('exist');

				// Verification of the existence of form fields and their types
				cy.get('#login-form')
					.within(() => {

						// Verification of the existence of the username field
						cy.get('input[name="username"]')
							.should('exist')
							.and('have.attr', 'type', 'text');

						// Verification that the label for the username has the correct text
						cy.get('label[for="login"]')
							.should('have.text', 'Uživatelské jméno  ');

						// Verification of the existence of the password field
						cy.get('input[name="password"]')
							.should('exist')
							.and('have.attr', 'type', 'password');

						// Verification that the label for the password has the correct text
						cy.get('label[for="password"]')
							.should('have.text', 'Heslo  ');

						// Verification of the existence and visibility of the password reveal icon
						cy.get('i.fas.fa-eye.link-eye')
							.should('exist')
							.and('be.visible');

						// Verification of the existence and correct text of the "Forgot your password?" link
						cy.get('span[phrase="Forgot your password?"]')
							.should('exist')
							.and('have.text', 'Zapomenuté heslo? ');

						// Verification of the "Log in" button
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

				// Verification of the presence of the "What's new in this version" link
				cy.get('.messagebox p a')
					.contains('Co je nového v této verzi')
					.should('exist')
					.and('have.attr', 'href', 'https://www.teamogy.com/cs/latest-relase-notes');

			});

  });

  it('Validate footer visibility and help link', function() {
					
		// Verification of the presence of container__footer
		cy.get('.container__footer')
			.should('exist');

		// Testing the content of container__footer
		cy.get('.container__footer')
			.within(() => {

			// Verification of the "Chat with support team" link
			cy.get('a')
				.contains('Chat s týmem podpory')
				.should('have.attr', 'href', '/help');
			});

	});
	
});