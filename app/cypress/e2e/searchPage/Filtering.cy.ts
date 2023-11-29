/// <reference types="Cypress"/>
describe("Filtering", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should call qraphgl query with alcohol true", () => {
    cy.get(".peer").click(); //check checkbox
    cy.intercept("POST", "http://localhost:4000/").as("backendInterceptTrue");
    cy.get(".peer").click(); //uncheck checkbox
    cy.wait("@backendInterceptTrue")
      .its("request.body.variables.options.alcohol")
      .should("eq", true); //if alcoholic variable in query is correct
    cy.get('[data-cy="result-list"]').should("be.visible"); // results must be visible for user
  });

  it("should call qraphgl query with alcohol false", () => {
    cy.get(".peer").click(); //check checkbox
    cy.intercept("POST", "http://localhost:4000/").as("backendInterceptFalse");
    cy.get("[data-cy=search_button]").click();
    cy.wait("@backendInterceptFalse")
      .its("request.body.variables.options.alcohol")
      .should("eq", false); //if alcoholic variable in query is correct
    cy.get('[data-cy="result-list"]').should("be.visible"); // results must be visible for user
  });

  it("should test backend with alcohol true", () => {
    cy.request("POST", "http://localhost:4000/", {
      operationName: "SearchDrinksByName",
      query:
        "query SearchDrinksByName($name: String!, $options: SearchOptions, $offset: Int, $limit: Int) {\n  searchDrinksByName(\n    name: $name\n    options: $options\n    offset: $offset\n    limit: $limit\n  ) {\n    id\n    name\n    alcoholic\n    glass\n    instructions\n    imageUrl\n    measures {\n      measure\n      ingredient {\n        name\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}",
      variables: {
        limit: 10,
        name: "",
        offset: 0,
        options: {
          alcohol: true,
          sort: "asc",
        },
      },
    }).then((res) => {
      const resultAlcoholList: boolean[] = []; // list with alcoholic value for each element returned

      res.body.data.searchDrinksByName.forEach((element: any) => {
        resultAlcoholList.push(element.alcoholic);
      });

      cy.wrap(resultAlcoholList).each((val) => {
        expect(val).to.be.true; // each value must be true for response to be correct
      });
    });
  });

  it("should test backend with alcohol false", () => {
    cy.request("POST", "http://localhost:4000/", {
      operationName: "SearchDrinksByName",
      query:
        "query SearchDrinksByName($name: String!, $options: SearchOptions, $offset: Int, $limit: Int) {\n  searchDrinksByName(\n    name: $name\n    options: $options\n    offset: $offset\n    limit: $limit\n  ) {\n    id\n    name\n    alcoholic\n    glass\n    instructions\n    imageUrl\n    measures {\n      measure\n      ingredient {\n        name\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}",
      variables: {
        limit: 10,
        name: "",
        offset: 0,
        options: {
          alcohol: false,
          sort: "asc",
        },
      },
    }).then((res) => {
      const resultAlcoholList: boolean[] = []; // list with alcoholic value for each element returned

      res.body.data.searchDrinksByName.forEach((element: any) => {
        resultAlcoholList.push(element.alcoholic);
      });

      cy.wrap(resultAlcoholList).each((val) => {
        expect(val).to.be.false; // each value must be false for response to be correct
      });
    });
  });
});
