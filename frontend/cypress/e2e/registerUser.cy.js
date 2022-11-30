/// <reference types="cypress" />

describe("Testing the registration and intercepting the register response from our api", () => {
  it("Register new user", () => {
    cy.intercept("POST", Cypress.env("apiUrl") + "/api/signup").as(
      "userSignUp"
    );

    cy.visit("/signup");

    cy.get('[placeholder="Username"]').type("Aymen Gherdaine");
    cy.get('[placeholder="Email"]').type("aymengherdaine@gmail.com");
    cy.get('[placeholder="Password"]').type("aymen");
    cy.get('[placeholder="Confirm Password"]').type("aymen");
    cy.get("input[type=file]").selectFile("cypress/fixtures/aymen.jpg", {
      force: true,
    });

    cy.get("form").submit();

    cy.wait("@userSignUp").then((fetchResponse) => {
      if (fetchResponse.response.body.status === 400) {
        cy.get("#errorMsg").contains("You already have an account");
      } else {
        expect(fetchResponse.response.body.status).to.equal(201);
        cy.wait(5500);
        cy.location("pathname").should("eq", "/");
      }
    });
  });
});
