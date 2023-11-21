import { ReviewListItem } from "./ReviewList";

describe("<ReviewListItem />", () => {
  it("renders with correct rating and comment", () => {
    cy.mount(<ReviewListItem comment={"Good enough for testing"} rating={3} />);
    cy.contains("Good enough for testing");
    cy.get("[data-cy=ratedMartini]").should("have.length", 3);
    cy.get("[data-cy=unratedMartini]").should("have.length", 2);
  });
});
