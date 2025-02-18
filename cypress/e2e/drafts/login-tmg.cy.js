describe('Login Page Validation', () => {
	it('login-teamogy', function() {
		cy.visit('https://testteam.luckydrum.com/');

		// Ověření přítomnosti container__header
    cy.get('.container__header')
			.should('exist');

		//Ověření přítomnosti container__box
		cy.get('.container__box')
			.within(() => {
      	cy.get('#login-form')
					.should('exist');

				// Ověření existence formulářových polí a jejich typů
				cy.get('#login-form')
					.within(() => {
						// Ověření existence pole pro uživatelské jméno
						cy.get('input[name="username"]')
							.should('exist')
							.and('have.attr', 'type', 'text');

						// Ověření existence pole pro heslo
						cy.get('input[name="password"]')
							.should('exist')
							.and('have.attr', 'type', 'password');

						// Ověření, že label pro uživatelské jméno má správný text
						cy.get('label[for="login"]')
							.should('have.text', 'Uživatelské jméno  ');

						// Ověření, že label pro heslo má správný text
						cy.get('label[for="password"]')
							.should('have.text', 'Heslo  ');

						// Ověření existence a viditelnosti ikony pro zobrazení hesla
						cy.get('i.fas.fa-eye.link-eye')
							.should('exist')
							.and('be.visible');

						// Ověření existence a správného textu pro odkaz "Zapomenuté heslo?"
						cy.get('span[phrase="Forgot your password?"]')
							.should('exist')
							.and('have.text', 'Zapomenuté heslo? ');

						// Ověření tlačítka "Přihlásit"
						cy.get('button.loginbox__btn')
							.should('exist')
							.and('be.visible')
							.within(() => {
								//cy.get('span[phrase="Log in"]')
									//.should('have.text', 'Přihlásit');
									//DEBUG: the text was Přihlásit \t\t\t\t\t\t\t
								cy.get('span[phrase="Log in"]')
									.invoke('text') // Získá čistý text bez formátování
									.then((text) => {
										expect(text.trim()).to.eq('Přihlásit'); // Ořízne bílé znaky
									});
								});
					});

				// Ověření přítomnosti odkazu "Co je nového v této verzi"
				cy.get('.messagebox p a')
					.contains('Co je nového v této verzi')
					.should('exist') // Ověření, že odkaz existuje
					.and('have.attr', 'href', 'https://www.teamogy.com/cs/latest-relase-notes'); // Ověření, že odkazuje na správnou URL
			});
					
		// Ověření přítomnosti container__footer
		cy.get('.container__footer')
			.should('exist');

		// Testování obsahu container__footer
		cy.get('.container__footer')
			.within(() => {

			// Ověření odkazu "Chat s týmem podpory"
			cy.get('a')
				.contains('Chat s týmem podpory')
				.should('have.attr', 'href', '/help');
			});
		});
  });
  