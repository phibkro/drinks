import RemoveReviewButton from "./RemoveReviewButton"
import { client} from gql

export const hasOperationName = (req, operationName: string) => {
  const { body } = req
  return (
    Object.prototype.hasOwnProperty.call(body, 'operationName') &&
    body.operationName === operationName
  )
}

// Alias query if operationName matches
export const aliasQuery = (req, operationName: string) => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Query`
  }
}

// Alias mutation if operationName matches
export const aliasMutation = (req, operationName: string) => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Mutation`
  }
}


// components/somewhere.ts   
describe("API SPY", () => {
  beforeEach(() => {
    cy.visit("/details/8");
    cy.intercept("POST", "http://localhost:4000/", (req) => {
      aliasMutation(req, "RemoveReview")
    })
  });
  it("post review", () => {
    cy.intercept("POST", "http://localhost:4000/" ).as("newReview")

    //Gjør skriving
    cy.visit("http://localhost:5173/project2/details/8");
    cy.get("svg").eq(6).click()
    cy.get("textarea").click().type("Booooozy. And goooood")
    cy.get("input").click()

    cy.wait("@gqlRemoveReviewMutation").should(nop => {
      console.log("mop");
      console.log(nop);
      
    })
  
    cy.get("@newReview").should(newReview => {
      console.log("Response");
      console.log(newReview.response.body);
      
    })
  })
})