// components/somewhere.ts   
describe("Review Submitting", () => {

  beforeEach(() => {
    cy.visit("http://localhost:5173/project2#/details/8");
  });

  it("Loads both components", () => {
    //Gjør skriving
    })
    it("Submitted review appears in ReviewList without reloading", () => {
      //Må oppdateres til nye ReviewList og form
      cy.get("button[role=radio]").eq(4).click()
      cy.get("textarea").click().type("Booooozy. And goooood")
      cy.get("button[type=submit]").click()
      cy.get("textarea").should("not.exist")
      cy.get("[data-cy=reviewListItem]").last().should("contain.text", "Booooozy. And goooood")
    })

    it("Both reviews are in ReviewList after a new one is loaded", () => {
      cy.get("button[role=radio]").eq(4).click()
      cy.get("textarea").click().type("Booooozy. And goooood")
      cy.get("button[type=submit]").click()
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