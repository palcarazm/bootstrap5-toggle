/// <reference types="cypress" />
import PageModel from "../support/pagemodel";
const pageModel = new PageModel();

describe("Custom Style feature", () => {
  context("Given ECMAS bootstrap toggle interface",()=>{
    testCase("ecmas");
  });
  context("Given jQuery bootstrap toggle interface",()=>{
    testCase("jquery");
  });
});

function testCase(bstInterface) {
  context("When data-style attribute is set", () => {
    const data_test = "custom-style";
    it("Then toggle have a class like the data-style value", () => {
      pageModel.load(bstInterface, data_test);
      pageModel.getTests().each(($test) => {
        if ($test.find('input[data-toggle="toggle"][data-style]').length > 0) {
          cy.wrap($test)
            .find(".toggle")
            .should('have.class', $test.find('input[data-toggle="toggle"][data-style]').attr('data-style') );
        }
      });
    });
  });
}
