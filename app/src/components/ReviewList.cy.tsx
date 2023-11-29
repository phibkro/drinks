import ReviewList, { ReviewShape } from "./ReviewList";

const testReviews: ReviewShape[] = [
  { textContent: "Worst ever tested", rating: 1, id: 0 },
  { textContent: "Bad for test", rating: 2, id: 1 },
  { textContent: "Ok for test", rating: 3, id: 2 },
  { textContent: "cypress would recommend", rating: 4, id: 3 },
  { textContent: "I love kitties", rating: 5, id: 4 },
];

describe("<ReviewList />", () => {
  it("renders with all reviews", () => {
    cy.mount(<ReviewList className="" reviews={testReviews} />);
    cy.contains("Did other people like this cocktail?");
    cy.contains("Worst ever tested");
    cy.contains("Bad for test");
    cy.contains("Ok for test");
    cy.contains("cypress would recommend");
    cy.contains("I love kitties");
    cy.get("[data-cy=reviewListItem]").should("have.length", 5);
  });
});
