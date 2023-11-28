/// <reference types="Cypress"/>


describe("SearchPage Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/project2"); // replace with the actual path to your SearchPage component
  });

  // testing search functionality
  const search = "Margarita"
  it("should display results on page load", () => {
    cy.get("[data-cy=result-list]").should("be.visible"); // replace 'search-result' with the actual id of the element you want to test
  });

  it("should display a search input", () => {
    cy.get('.leading-none > .flex').should("be.visible");
  });

  it("should allow typing in the search input", () => {
    //const search = "Margarita"
    cy.get('.leading-none > .flex').type(search).should("have.value", search);

    cy.get('.leading-none > .flex').type('{enter}');

    cy.get('[data-cy=result-list]').should('be.visible');
  });

  it("should display results when a search is performed", () => {
    cy.get('.leading-none > .flex').type("marg{enter}");
    cy.get("[data-cy=result-list]").should("be.visible"); 
    cy.get('.leading-none > .flex').clear().should('have.value', '');
  });

  it("should go back to initial state by clearing search bar ", () => {
    cy.get('.leading-none > .flex').clear().should('have.value', '');
  });

  // test search query

  it("should call graphql query with Margarita", () => {
    cy.get('.leading-none > .flex').type(search);
    cy.intercept('POST', 'http://localhost:4000/').as('backendIterceptSearch')
    cy.get('.leading-none > .flex').type('{enter}');
    cy.wait('@backendIterceptSearch').its('request.body.variables.name').should('contain', search)
    cy.get('[data-cy="result-list"]').should('be.visible') 
  });


  it("should navigate to drinkdetails",() => {
    cy.get('[href="#/details/0"] > [data-cy="result-list-items"]').click()
    cy.url().should('include', 'details/0')
  });

  it("should load more elements when load more button is clicked", () => {
    cy.get('[data-cy="result-list-items"]').should('have.length', 10)
    cy.get('.gap-10 > :nth-child(3)').click()
    cy.get('[data-cy="result-list-items"]').should('have.length', 20)
  })

  // testing resultlist functionality

});
