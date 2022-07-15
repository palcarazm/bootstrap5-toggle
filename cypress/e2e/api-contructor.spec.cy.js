/// <reference types="cypress" />
import PageModel from "../support/pagemodel";
const pageModel = new PageModel();

describe("Toggle set by API", () => {
  context("Given ECMAS bootstrap toggle interface",()=>{
    testCase("ecmas");
  });
  context("Given jQuery bootstrap toggle interface",()=>{
    testCase("jquery");
  });
});

function testCase(bstInterface) {
  context("When the API constructor method is call", () => {
    const data_test = "api-constructor";
    it("Then toggle is render with the options provided to the API constructor method", () => {
      pageModel.load(bstInterface, data_test);
      pageModel.getTests().each(($test) => {
        cy.wrap($test).find("button").click()
        cy.wrap($test).find('.toggle').then(($toggle)=>{
          pageModel.checkToggleElementWithOptions($toggle, JSON.parse($test.find('code').html()))
        });
      });
    });
  });
}
