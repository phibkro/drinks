import { ADD_REVIEW } from "@/lib/queries";
import { MockedProvider, MockedResponse } from "@apollo/react-testing";
import ReviewForm from "./ReviewForm";

/// <reference types="Cypress"/>

const mockReviews: readonly MockedResponse<
  Record<string, unknown>,
  Record<string, unknown>
>[] = [
  {
    request: {
      query: ADD_REVIEW,
      variables: {
        drinkId: 0,
        textContent: "cypress says no",
        rating: 1,
      },
    },
    result: {
      data: {
        drinkId: 0,
        textContent: "cypress says no",
        rating: 1,
      },
    },
  },
];

describe("<ReviewForm />", () => {
  beforeEach(() => {
    cy.mount(
      <MockedProvider mocks={mockReviews} addTypename={false}>
        <ReviewForm drinkId={0} />
      </MockedProvider>,
    );
  });

  it("renders without submit button", () => {
    // see: https://on.cypress.io/mounting-react
    cy.get(".text-xl").should("have.text", "Give this cocktail a review!");
    cy.get("textarea").should("have.text", "");
    cy.get("textarea").should("exist");
    cy.get("div[role=radiogroup]").should("exist");
    cy.get("button[role=radio]").should("have.length", 5);
    cy.get("button[type=submit]").should("not.exist");
  });

  it("displays submit-button after clicking martini glass", () => {
    cy.get("button[type=submit]").should("not.exist");
    cy.get("div[role=radiogroup]").first().click();
    cy.get("button[type=submit]").should("exist");
  });

  it("gives warning if trying to submit without leaving a comment", () => {
    cy.get("button[role=radio]").first().click();
    cy.get("button[type=submit]").click();
    cy.get("span").should(
      "have.text",
      "Please add a comment before submitting you review",
    );
  });

  it("submits from successfully", () => {
    cy.get("button[role=radio]").first().click();
    cy.get("textarea").click().type("cypress says no");
    cy.get("button[type=submit]").click();
    cy.get("p").should("have.text", "Thank you for submitting a review <3");
    cy.get("textarea").should("not.exist");
    cy.get("button[role=radio]").should("not.exist");
    cy.get("button[type=submit]").should("not.exist");
  });
});
