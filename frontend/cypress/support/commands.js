// Login to the app
Cypress.Commands.add("loginToApplication", () => {
  cy.visit("/login");
  cy.get('[placeholder="Email"]').type(Cypress.env("userEmail"));
  cy.get('[placeholder="Password"]').type(Cypress.env("userPassword"));
  cy.get("form").submit();
});
