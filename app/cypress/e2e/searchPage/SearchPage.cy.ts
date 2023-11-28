/// <reference types="Cypress"/>


describe("SearchPage Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/project2"); // replace with the actual path to your SearchPage component
  });

  // testing search functionality
  const search = "Margarita"
  it("should display results on page load", () => {
    cy.get("[data-cy=result-list]").should("be.visible"); // replace 'search-result' with the actual id of the element you want to test
  });

  it("should display a search input", () => {
    cy.get('.leading-none > .flex').should("be.visible");
  });

  it("should allow typing in the search input", () => {
    //const search = "Margarita"
    cy.get('.leading-none > .flex').type(search).should("have.value", search);

    cy.get('.leading-none > .flex').type('{enter}');

    cy.get('[data-cy=result-list]').should('be.visible');
  });

  it("should display results when a search is performed", () => {
    cy.get('.leading-none > .flex').type("marg{enter}");
    cy.get("[data-cy=result-list]").should("be.visible"); 
    cy.get('.leading-none > .flex').clear().should('have.value', '');
  });

  it("should go back to initial state by clearing search bar ", () => {
    cy.get('.leading-none > .flex').clear().should('have.value', '');
  });

  // test search query

  it("should call graphql query with Margarita", () => {
    cy.get('.leading-none > .flex').type(search);
    cy.intercept('POST', 'http://localhost:4000/').as('backendIterceptSearch')
    cy.get('.leading-none > .flex').type('{enter}');
    cy.wait('@backendIterceptSearch').its('request.body.variables.name').should('contain', search)
    cy.get('[data-cy="result-list"]').should('be.visible') 
  });

  it("should test backend with Margarita", () => {
    cy.request('POST', 'http://localhost:4000/', {
       operationName: 'SearchDrinksByName',
       query: "query SearchDrinksByName($name: String!, $options: SearchOptions, $offset: Int, $limit: Int) {\n  searchDrinksByName(\n    name: $name\n    options: $options\n    offset: $offset\n    limit: $limit\n  ) {\n    id\n    name\n    alcoholic\n    glass\n    instructions\n    imageUrl\n    measures {\n      measure\n      ingredient {\n        name\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}",
       variables: {
        limit: 10,
        name: search,
        offset: 0,
        options: {
            alcohol: true,
            sort: 'asc'
        }
       } 
    }).then((res) => {
        const resultNameList: string[] = [];
        
        res.body.data.searchDrinksByName.forEach((element: any) => {
            resultNameList.push(element.name)
        });        
        cy.wrap(resultNameList).each((val) => {
          expect(val).to.contain(search); // each value must be true for response to be correct
        });
        
        
    })
  });


  // test routing

  it("should navigate to drinkdetails",() => {
    cy.get('[href="#/details/0"] > [data-cy="result-list-items"]').click()
    cy.url().should('include', 'details/0')
  });

  // test pagination

  it("should load more elements when load more button is clicked", () => {
    cy.get('[data-cy="result-list-items"]').should('have.length', 10)
    cy.get('.gap-10 > :nth-child(3)').click()
    cy.get('[data-cy="result-list-items"]').should('have.length', 20)
  })


});
