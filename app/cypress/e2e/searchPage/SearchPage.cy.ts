/// <reference types="Cypress"/>


describe("SearchPage Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/project2"); // replace with the actual path to your SearchPage component
  });

  // testing search functionality

  it("should display results on page load", () => {
    cy.get("[data-cy=result-list]").should("be.visible"); // replace 'search-result' with the actual id of the element you want to test
  });

  it("should display a search input", () => {
    cy.get("input[type=text]").should("be.visible");
  });

  it("should allow typing in the search input", () => {
    const search = "Margarita"
    cy.get("input[type=text]").type(search).should("have.value", search);

    cy.get('input[type="text"]').type('{enter}');

    cy.get('[data-cy=result-list]').should('be.visible');
  });

  it("should display results when a search is performed", () => {
    cy.get("input[type=text]").type("marg{enter}");
    cy.get("[data-cy=result-list]").should("be.visible"); 
    cy.get('input[type=text]').clear().should('have.value', '');
  });

  it("should go back to initial state by clearing search bar ", () => {
    cy.get('input[type=text]').clear().should('have.value', '');
  });

  it("should navigate to drinkdetails",() => {
    cy.get('[href="/project2/details/0"] > [data-cy="result-list-items"]').click()
    cy.url().should('include', 'details/0')
  });

  

  // testing resultlist functionality

});
