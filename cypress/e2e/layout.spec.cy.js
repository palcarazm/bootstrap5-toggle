/// <reference types="cypress" />
import ToggleModel from "../support/togglemodel";
import PageModel from "../support/pagemodel";

describe("Layout feature", () => {
  context("Given ECMAS bootstrap toggle interface",()=>{
    testCase("ecmas");
  });
  context("Given jQuery bootstrap toggle interface",()=>{
    testCase("jquery");
  });
});

function testCase(bstInterface) {
  context("When a toggle is in Input Group", () => {
    const data_test = 'layout';
    it("Then toggle height must be equal to elements height with this size", () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        PageModel.assertComputedStyleProperty(
          $test,
          "input",
          ".toggle",
          "height"
        );
        PageModel.assertComputedStyleProperty(
          $test,
          "input",
          ".toggle",
          "height"
        );
      });
    });
    it("Then toggle change on click", () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        ToggleModel.checkToggleClick($test, true);
      });
    });
  });
}
