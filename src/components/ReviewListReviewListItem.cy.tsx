import { ReviewListItem } from "./ReviewList";

describe("<ReviewListItem />", () => {
  it("renders with correct rating and comment", () => {
    cy.mount(<ReviewListItem comment={"Good enough for testing"} rating={3} />);
    cy.get("p").should("have.text", "Good enough for testing");
    cy.get("svg").should("have.length", 5);
    cy.get("[data-cy=unratedMartini]").should("have.length", 2);
    cy.get("[data-cy=ratedMartini]").should("have.length", 3);
  });
});
