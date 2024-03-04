import DrinkDetails from "./DrinkDetails";

const data = [
  {
    id: 0,
    name: "'57 Chevy with a White License Plate",
    instructions:
      "1. Fill a rocks glass with ice 2.add white creme de cacao and vodka 3.stir",
    alcoholic: true,
    imageUrl:
      "http://www.thecocktaildb.com/images/media/drink/qyyvtu1468878544.jpg",
    glass: "Highball glass",
    measures: [
      { measure: "1 oz white", ingredient: { name: "Creme de Cacao" } },
      { measure: "1 oz", ingredient: { name: "Vodka" } },
    ],
  },
  {
    id: 1,
    name: "1-900-FUK-MEUP",
    instructions:
      "Shake ingredients in a mixing tin filled with ice cubes. Strain into a rocks glass.",
    alcoholic: true,
    imageUrl:
      "http://www.thecocktaildb.com/images/media/drink/uxywyw1468877224.jpg",
    glass: "Old-fashioned glass",
    measures: [
      { measure: "1/2 oz", ingredient: { name: "Absolut Kurant" } },
      { measure: "1/4 oz", ingredient: { name: "Grand Marnier" } },
      { measure: "1/4 oz", ingredient: { name: "Chambord raspberry liqueur" } },
      { measure: "1/4 oz", ingredient: { name: "Midori melon liqueur" } },
      { measure: "1/4 oz", ingredient: { name: "Malibu rum" } },
      { measure: "1/4 oz", ingredient: { name: "Amaretto" } },
      { measure: "1/2 oz", ingredient: { name: "Cranberry juice" } },
      { measure: "1/4 oz", ingredient: { name: "Pineapple juice" } },
    ],
  },
];
describe("DrinkDetails Component", () => {
  beforeEach(() => {
    cy.mount(<DrinkDetails {...data[0]} />);
  });

  it("should display the passed data", () => {
    cy.get("[data-cy=drink-details]").should("contain", data[0].name);
    cy.get("[data-cy=drink-details]").should("contain", data[0].instructions);
    cy.get("[data-cy=drink-details]").should(
      "contain",
      data[0].alcoholic ? "Alcoholic" : "Non alcoholic",
    );
    cy.get("[data-cy=drink-details]").should("contain", data[0].glass);
    // displays the measures and ingredients
    cy.get("[data-cy=drink-details]").should(
      "contain",
      data[0].measures[0].measure,
    );
    cy.get("[data-cy=drink-details]").should(
      "contain",
      data[0].measures[0].ingredient.name,
    );
    cy.get("[data-cy=drink-details]").should(
      "contain",
      data[0].measures[1].measure,
    );
    cy.get("[data-cy=drink-details]").should(
      "contain",
      data[0].measures[1].ingredient.name,
    );
    // displays the image
    cy.get("[data-cy=drink-details]")
      .find("img")
      .should("be.visible")
      .and("have.attr", "src", data[0].imageUrl);
  });
});
