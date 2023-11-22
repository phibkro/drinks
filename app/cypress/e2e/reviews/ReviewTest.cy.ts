// components/somewhere.ts   
describe("Review Submitting", () => {

  before(() => {
    cy.exec("npm run cypress:seed", { failOnNonZeroExit: false })
  })

  beforeEach(() => {
    cy.visit("/details/8");
  });

  it("Loads both components", () => {
    //Gjør skriving
    })
    it("Submitted review appears in ReviewList without reloading", () => {
      //Må oppdateres til nye ReviewList og form
      cy.get("svg").eq(6).click()
      cy.get("textarea").click().type("Booooozy. And goooood")
      cy.get("input").click()
      cy.get("textarea").should("not.exist")
      cy.get("[data-cy=reviewListItem]").last().should("contain.text", "Booooozy. And goooood")
    })

    it("Both reviews are in ReviewList after a new one is loaded", () => {
      cy.get("svg").eq(6).click()
      cy.get("textarea").click().type("Booooozy. And goooood")
      cy.get("input").click()
      cy.get("textarea").should("not.exist")
      cy.get("[data-cy=reviewListItem]").last().should("contain.text", "Booooozy. And goooood")
    })
    it("Both reviews are in ReviewList after re-visiting the drink", () => {})
    it("Comment and rating in submitted review is the same as the one in ReviewList", () => {})
    it("Loads both components", () => {})
    it("Loads both components", () => {})
    it("Loads both components", () => {})
    it("Loads both components", () => {})
  })