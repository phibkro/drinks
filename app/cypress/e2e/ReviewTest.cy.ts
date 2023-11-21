describe("API SPY", () => {
  beforeEach(() => {
    cy.visit("/details/8"); // replace with the actual path to your SearchPage component
  });
  it("post review", () => {
    cy.intercept("POST", "http://localhost:4000/" ).as("newReview")

    //Gjør skriving
    cy.visit("http://localhost:5173/project2/details/8");
    cy.get("svg").eq(6).click()
    cy.get("textarea").click().type("Booooozy. And goooood")
    cy.get("input").click()


    cy.wait("@newReview").its("response.statusCode").should("eq", 200)

  })
})