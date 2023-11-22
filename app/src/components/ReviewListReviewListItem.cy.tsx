import { ReviewListItem } from "./ReviewList";

describe("<ReviewListItem />", () => {
  it("renders with correct rating and comment", () => {
    cy.mount(<ReviewListItem comment={"Good enough for testing"} rating={3} />);
    cy.contains("Good enough for testing");
    cy.get("svg").should("have.length", 5);
    cy.get("svg[stroke=white]").should("have.length", 2);
  });
});
