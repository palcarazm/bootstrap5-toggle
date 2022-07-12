/// <reference types="cypress" />
import PageModel from "../support/pagemodel";
const pageModel = new PageModel();

describe("Layout feature", () => {
  context("When a toggle is in Input Group", () => {
    const data_test = 'layout';
    it("Then toggle height must be equal to elements height with this size", () => {
      pageModel.load(data_test);
      pageModel.getTests().each(($test) => {
        pageModel.assertComputedStyleProperty(
          $test,
          "input",
          ".toggle",
          "height"
        );
        pageModel.assertComputedStyleProperty(
          $test,
          "input",
          ".toggle",
          "height"
        );
      });
    });

    it("Then toggle change on click", () => {
      pageModel.load(data_test);
      pageModel.getTests().each(($test) => {
        pageModel.checkToggleClick($test, true);
      });
    });
    
  });
});
