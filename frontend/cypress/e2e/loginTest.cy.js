/// <reference types="cypress" />

describe("Testing the login and intercepting the login response from our api", () => {
  it("log in", () => {
    cy.intercept("POST", Cypress.env("apiUrl") + "/api/login").as("userLogin");

    cy.loginToApplication();

    cy.wait("@userLogin").then((fetchResponse) => {
      expect(fetchResponse.response.body.status).to.equal(200);
      expect(fetchResponse.response.body.message).to.equal("User Logged in");
      expect(fetchResponse.response.body.data.token).to.exist;
    });
  });
});
