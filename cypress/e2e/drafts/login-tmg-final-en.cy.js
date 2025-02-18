describe('Login Page Validation', () => {

    beforeEach(() => {
      cy.visit('https://testteam.luckydrum.com/');
    });

    // Verify presence of container__header
	it('Validate header: Visibility', function() {

		// Verify presence of container__header
    cy.get('.container__header')
		  .should('exist');
  });

  // Verify presence of container__header
  it('Validate main box: Login form and release notes link', function() {

		// Verify presence of container__box
		cy.get('.container__box')
			.within(() => {
      			cy.get('#login-form')
					.should('exist');

				// Verify existence of form fields and their types
				cy.get('#login-form')
					.within(() => {
						// Verify existence of username field
						cy.get('input[name="username"]')
							.should('exist')
							.and('have.attr', 'type', 'text');

						// Verify existence of password field
						cy.get('input[name="password"]')
							.should('exist')
							.and('have.attr', 'type', 'password');

						// Verify label for username has correct text
						cy.get('label[for="login"]')
							.should('have.text', 'Uživatelské jméno  ');

						// Verify label for password has correct text
						cy.get('label[for="password"]')
							.should('have.text', 'Heslo  ');

						// Verify existence and visibility of the password visibility icon
						cy.get('i.fas.fa-eye.link-eye')
							.should('exist')
							.and('be.visible');

						// Verify existence and correct text of "Forgot your password?" link
						cy.get('span[phrase="Forgot your password?"]')
							.should('exist')
							.and('have.text', 'Zapomenuté heslo? ');

						// Verify "Log in" button
						cy.get('button.loginbox__btn')
							.should('exist')
							.and('be.visible')
							.within(() => {
								//cy.get('span[phrase="Log in"]')
									//.should('have.text', 'Přihlásit');
									//DEBUG: the text was Přihlásit \t\t\t\t\t\t\t
								cy.get('span[phrase="Log in"]')
									.invoke('text') // Get plain text without formatting
									.then((text) => {
										expect(text.trim()).to.eq('Přihlásit'); // Trim white spaces
									});
								});
					});

				// Verify presence of "What's new in this release" link
				cy.get('.messagebox p a')
					.contains('Co je nového v této verzi')
					.should('exist') // Verify the link exists
					.and('have.attr', 'href', 'https://www.teamogy.com/cs/latest-relase-notes'); // Verify the correct URL
			});
  });

  // Verify presence of container__header
  it('Validate footer: Visibility and help link', function() {
					
		// Verify presence of container__footer
		cy.get('.container__footer')
			.should('exist');

		// Test content of container__footer
		cy.get('.container__footer')
			.within(() => {

			// Verify "Chat with support team" link
			cy.get('a')
				.contains('Chat s týmem podpory')
				.should('have.attr', 'href', '/help');
			});
		});
  });
