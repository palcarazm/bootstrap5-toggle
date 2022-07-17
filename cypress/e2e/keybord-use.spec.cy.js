/// <reference types="cypress" />
require('cypress-plugin-tab');
import PageModel from "../support/pagemodel";
import ToggleModel from "../support/togglemodel";

describe("Keyboard use feature", () => {
  context("Given ECMAS bootstrap toggle interface",()=>{
    testCase("ecmas");
  });
  context("Given jQuery bootstrap toggle interface",()=>{
    testCase("jquery");
  });
});

function testCase(bstInterface) {
  context("When previous element is selected and tab is pressed", () => {
    const data_test = 'layout';
    it("Then toggle is focused", () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        cy.wrap($test)
          .find("input.form-control")
          .tab().should('have.class','toggle');
      });
    });
  });
  context("When toggle element is selected and spacebar is pressed", () => {
    const data_test = 'layout';
    it.only("Then toggle is toggle", () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        ToggleModel.checkToggleKeypress($test,true);
      });
    });
  });
}
