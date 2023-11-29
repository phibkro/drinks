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
  id: 2,
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
    cy.get('[href="/details/1"] > [data-cy="result-list-items"] > .p-2')
      .should("exist")
      .and("be.visible")
      .and("have.text", drinkData1.name);

    cy.get('[href="/details/1"] > [data-cy="result-list-items"]')
      .find("img")
      .should("be.visible")
      .and("have.attr", "src", drinkData1.imageUrl);

    // test second ResultListItem in mock data
    cy.get('[href="/details/2"] > [data-cy="result-list-items"] > .p-2')
      .should("exist")
      .and("be.visible")
      .and("have.text", drinkData2.name);

    cy.get('[href="/details/2"] > [data-cy="result-list-items"]')
      .find("img")
      .should("be.visible")
      .and("have.attr", "src", drinkData2.imageUrl);
  });
});
