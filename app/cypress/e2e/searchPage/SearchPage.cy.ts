/// <reference types="Cypress"/>


describe("SearchPage Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/project2"); // replace with the path to website when running
  });

  // testing search
  it("should display results on page load", () => {
    cy.get("[data-cy=result-list]").should("be.visible"); 
  });

  it("should display a search input", () => {
    cy.get('.leading-none > .flex').should("be.visible");
  });

  it("should allow typing in the search input", () => {
    const search = "Margarita"
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

  // test routing to drinkdetails
  it("should navigate to drinkdetails",() => {
    cy.get('[href="#/details/0"] > [data-cy="result-list-items"]').click()
    cy.url().should('include', 'details/0')
  });

  // testing pagination
  it("should load more elements when load more button is clicked", () => {
    cy.get('[data-cy="result-list-items"]').should('have.length', 10)
    cy.get('.gap-10 > :nth-child(3)').click()
    cy.get('[data-cy="result-list-items"]').should('have.length', 20)
  })
});
