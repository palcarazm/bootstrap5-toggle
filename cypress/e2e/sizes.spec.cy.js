/// <reference types="cypress" />
import PageModel from "../support/pagemodel";

describe("Size feature", () => {
  context("Given ECMAS bootstrap toggle interface",()=>{
    testCase("ecmas");
  });
  context("Given jQuery bootstrap toggle interface",()=>{
    testCase("jquery");
  });
});

function testCase(bstInterface) {
  context("When data-size attribute is set", () => {
    const data_test = 'size';
    it("Then toggle height must be equal to button height with this size", () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        PageModel.assertComputedStyleProperty(
          $test,
          "button",
          ".toggle",
          "height"
        );
      });
    });

    it("Then toggle height must be equal to select height with this size", () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        PageModel.assertComputedStyleProperty(
          $test,
          "select",
          ".toggle",
          "height"
        );
      });
    });

    it("Then toggle height must be equal to input height with this size", () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        PageModel.assertComputedStyleProperty(
          $test,
          'input[type="text"]',
          ".toggle",
          "height"
        );
      });
    });
  });
}