import { Sidebar } from "./Sidebar";

describe("<Sidebar />", () => {
  it("renders with elements", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Sidebar />);

    cy.contains("Sorting");
    cy.contains("A-Z");
    cy.contains("Z-A");

    cy.contains("Alcohol");
    cy.contains("Non-alcoholic");
  });
});
