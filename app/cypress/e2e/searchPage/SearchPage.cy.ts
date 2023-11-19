describe("SearchPage Component", () => {
  beforeEach(() => {
    cy.visit("/"); // replace with the actual path to your SearchPage component
  });

  it("should display results on page load", () => {
    cy.get("[data-cy=result-list]").should("be.visible"); // replace 'search-result' with the actual id of the element you want to test
  });

  it("should display a search input", () => {
    cy.get("input[type=text]").should("be.visible");
  });

  it("should allow typing in the search input", () => {
    cy.get("input[type=text]").type("Test search");
  });

  it("should display results when a search is performed", () => {
    cy.get("input[type=text]").type("marg{enter}");
    cy.get("[data-cy=result-list]").should("be.visible"); // replace 'search-result' with the actual id of the element you want to test
  });
});
