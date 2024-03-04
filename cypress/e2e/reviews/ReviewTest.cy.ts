// components/somewhere.ts
describe("Review Submitting", () => {
  beforeEach(() => {
    cy.visit("#/details/8");
  });

  it("Loads both components", () => {
    cy.get("form").should("exist");
    cy.get("[data-cy=reviewList]").should("exist");
  });
  it("Submitted review appears in ReviewList without reloading", () => {
    cy.get("[data-cy=reviewListItem]");
    cy.get("button[role=radio]").eq(3).click();
    cy.get("textarea").click().type("Booooozy. And goooood");
    cy.get("button[type=submit]").click();
    cy.get("textarea").should("not.exist");
    cy.get("[data-cy=reviewListItem]")
      .last()
      .should("contain.text", "Booooozy. And goooood");
  });

  it("Both reviews are in ReviewList after a new one is loaded", () => {
    cy.get("button[role=radio]").eq(3).click();
    cy.get("textarea").click().type("Booooozy. And goooood");
    cy.get("button[type=submit]").click();
    cy.get("textarea").should("not.exist");
    cy.get("[data-cy=reviewListItem]")
      .last()
      .should("contain.text", "Booooozy. And goooood");
  });

  it("Comment and rating in submitted review is the same as the one in ReviewList", () => {
    cy.get("[data-cy=reviewListItem]")
      .last()
      .find("svg")
      .should("have.length", 5);
    cy.get("[data-cy=reviewListItem]")
      .last()
      .find("[data-cy=ratedMartini]")
      .should("have.length", 4);
    cy.get("[data-cy=reviewListItem]")
      .last()
      .find("[data-cy=unratedMartini]")
      .should("have.length", 1);
    cy.get("[data-cy=reviewListItem]")
      .last()
      .find("p")
      .should("have.text", "Booooozy. And goooood");
  });
});
