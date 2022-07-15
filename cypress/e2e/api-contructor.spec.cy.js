/// <reference types="cypress" />
import ToggleModel from "../support/togglemodel";
import PageModel from "../support/pagemodel";

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
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        cy.wrap($test).find("button").click()
        cy.wrap($test).find('.toggle').then(($toggle)=>{
          ToggleModel.checkToggleElementWithOptions($toggle, JSON.parse($test.find('code').html()))
        });
      });
    });
  });
}
