/// <reference types="cypress" />
import ToggleModel from "../support/togglemodel";
import PageModel from "../support/pagemodel";

describe("Label forwarding feature", () => {
  context("Given ECMAS bootstrap toggle interface", () => {
    testCase("ecmas");
  });
  context("Given jQuery bootstrap toggle interface", () => {
    testCase("jquery");
  });
});

function testCase(bstInterface) {
  context("When the label for a toggle is clicked", () => {
    const data_test = "layout";
    it("Then toggle change and get focused", () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        ToggleModel.checkLabelClick($test, true);
        cy.wrap($test).find(".toggle").should("be.focused");
      });
    });
  });
}
