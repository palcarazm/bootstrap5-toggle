/// <reference types="cypress" />
import PageModel from "../support/pagemodel";

describe("Custom Size feature", () => {
  context("Given ECMAS bootstrap toggle interface",()=>{
    testCase("ecmas");
  });
  context("Given jQuery bootstrap toggle interface",()=>{
    testCase("jquery");
  });
});

function testCase(bstInterface) {
  context("When data-width attribute is set", () => {
    const data_test = "custom-size";
    it("Then toggle width is equal to data-width value", () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        if ($test.find('input[data-toggle="toggle"][data-width]').length > 0) {
          cy.wrap($test)
            .find('input[data-toggle="toggle"]')
            .then(($element) => {
              cy.wrap($test)
                .find('.toggle')
                .should(
                  "have.css",
                  "width",
                  $element.attr('data-width') +'px'
                );
            });
        }
      });
    });
  });

  context("When data-height attribute is set", () => {
    const data_test = "custom-size";
    it("Then toggle height is equal to data-height value", () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        if ($test.find('input[data-toggle="toggle"][data-height]').length > 0) {
          cy.wrap($test)
            .find('input[data-toggle="toggle"]')
            .then(($element) => {
              cy.wrap($test)
                .find('.toggle')
                .should(
                  "have.css",
                  "height",
                  $element.attr('data-height') +'px'
                );
            });
        }
      });
    });
  });
}
