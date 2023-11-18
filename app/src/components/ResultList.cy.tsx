import { MemoryRouter } from "react-router-dom";
import { ResultList } from "./ResultList";

/// <reference types="Cypress"/>

const drinkData1 = {
  id: 1,
  name: "Test Drink",
  instructions: "Hello world",
  alcoholic: true,
  imageUrl:
    "http://www.thecocktaildb.com/images/media/drink/qyyvtu1468878544.jpg",
  glass: "Vinglass",
  measures: [
    { measure: "2 oz", ingredient: { name: "Ingredient 1" } },
    { measure: "1 oz", ingredient: { name: "Ingredient 2" } },
  ],
};
const drinkData2 = {
  id: 1,
  name: "Test Drink 2",
  instructions: "Hello world 2",
  alcoholic: true,
  imageUrl:
    "http://www.thecocktaildb.com/images/media/drink/uxywyw1468877224.jpg",
  glass: "Vinglass 2",
  measures: [
    { measure: "4 oz", ingredient: { name: "Ingredient 1" } },
    { measure: "6 oz", ingredient: { name: "Ingredient 2" } },
    { measure: "1 oz", ingredient: { name: "Ingredient 3" } },
  ],
};

describe("DrinkDetails Component", () => {
  beforeEach(() => {
    cy.mount(
      <MemoryRouter>
        <ResultList results={[drinkData1, drinkData2]} />
      </MemoryRouter>,
    );
  });

  it("should display list of ResultListItems with passed data", () => {
    // test first ResultListItem in mock data
    cy.get(".flex-col > :nth-child(1) > .flex h2")
      .should("exist")
      .and("be.visible")
      .and("have.text", drinkData1.name);

    cy.get(".flex-col > :nth-child(1) > .flex")
      .find("img")
      .should("be.visible")
      .and("have.attr", "src", drinkData1.imageUrl);

    cy.get(".flex-col > :nth-child(1) > .flex h3")
      .should("exist")
      .and("be.visible")
      .and("have.text", "Ingredients");

    cy.get(".flex-col > :nth-child(1) > .flex ul li")
      .should("exist")
      .and("be.visible")
      .and("have.length", 2);

    cy.get(".flex-col > :nth-child(1) > .flex ul li")
      .first()
      .should("exist")
      .and("be.visible")
      .and(
        "have.text",
        drinkData1.measures[0].measure +
          " " +
          drinkData1.measures[0].ingredient.name,
      );

    cy.get(".flex-col > :nth-child(1) > .flex ul li:eq(1)")
      .should("exist")
      .and("be.visible")
      .and(
        "have.text",
        drinkData1.measures[1].measure +
          " " +
          drinkData1.measures[1].ingredient.name,
      );

    // test second ResultListItem in mock data
    cy.get(":nth-child(2) > .flex h2")
      .should("exist")
      .and("be.visible")
      .and("have.text", drinkData2.name);

    cy.get(":nth-child(2) > .flex")
      .find("img")
      .should("be.visible")
      .and("have.attr", "src", drinkData2.imageUrl);

    cy.get(":nth-child(2) > .flex h3")
      .should("exist")
      .and("be.visible")
      .and("have.text", "Ingredients");

    cy.get(":nth-child(2) > .flex ul li")
      .should("exist")
      .and("be.visible")
      .and("have.length", 3);

    cy.get(":nth-child(2) > .flex ul li")
      .first()
      .should("exist")
      .and("be.visible")
      .and(
        "have.text",
        drinkData2.measures[0].measure +
          " " +
          drinkData2.measures[0].ingredient.name,
      );

    cy.get(":nth-child(2) > .flex ul li:eq(1)")
      .should("exist")
      .and("be.visible")
      .and(
        "have.text",
        drinkData2.measures[1].measure +
          " " +
          drinkData2.measures[1].ingredient.name,
      );

    cy.get(":nth-child(2) > .flex ul li:eq(2)")
      .should("exist")
      .and("be.visible")
      .and(
        "have.text",
        drinkData2.measures[2].measure +
          " " +
          drinkData2.measures[2].ingredient.name,
      );
  });
});
