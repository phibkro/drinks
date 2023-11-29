describe("Sorting", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should call qraphgl query with sort asc", () => {
    cy.get("#asc").click();
    cy.intercept("POST", "http://localhost:4000/").as("backendIterceptAsc");
    cy.get(".gap-12 > .inline-flex").click();
    cy.wait("@backendIterceptAsc")
      .its("request.body.variables.options.sort")
      .should("contain", "asc");
    cy.get('[data-cy="result-list"]').should("be.visible"); // results must be visible for user
  });

  it("should call qraphgl query with sort desc", () => {
    cy.get("#desc").click();
    cy.intercept("POST", "http://localhost:4000/").as("backendIterceptDesc"); // have to intercept after sort value changed
    cy.get(".gap-12 > .inline-flex").click();
    cy.wait("@backendIterceptDesc")
      .its("request.body.variables.options.sort")
      .should("contain", "desc");
    cy.get('[data-cy="result-list"]').should("be.visible"); // results must be visible for user
  });

  it("should test backend with desc", () => {
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
          sort: "desc",
        },
      },
    }).then((res) => {
      const resultNameList: string[] = [];

      res.body.data.searchDrinksByName.forEach((element: any) => {
        resultNameList.push(element.name);
      });

      let sortedDesc = resultNameList
        .slice()
        .sort((a, b) => a.localeCompare(b))
        .reverse();
      cy.wrap(resultNameList).should("deep.equal", sortedDesc);
    });
  });

  it("should test backend with asc", () => {
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
      const resultNameList: string[] = [];

      res.body.data.searchDrinksByName.forEach((element: any) => {
        resultNameList.push(element.name);
      });

      let sortedDesc = resultNameList
        .slice()
        .sort((a, b) => a.localeCompare(b));
      cy.wrap(resultNameList).should("deep.equal", sortedDesc);
    });
  });
});
