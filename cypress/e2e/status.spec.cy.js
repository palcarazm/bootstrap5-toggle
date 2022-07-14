/// <reference types="cypress" />
import PageModel from "../support/pagemodel";
const pageModel = new PageModel();

describe("Status feature", () => {
  context("Given ECMAS bootstrap toggle interface",()=>{
    testCase("ecmas");
  });
  context("Given jQuery bootstrap toggle interface",()=>{
    testCase("jquery");
  });
});

function testCase(bstInterface) {
  const data_test = "status";
  context("When toggle is enabled", () => {
    const test_id = "#status-enabled";
    it("Then toggle opacity is equal to bootstrap enabled button opacity", () => {
      pageModel.load(bstInterface, data_test);
      cy.get(test_id).each(($test) => {
        pageModel.assertComputedStyleProperty($test,'button','.toggle','opacity');
      });
    });

    it("Then toggle cursor is equal to bootstrap enabled button cursor", () => {
      pageModel.load(bstInterface, data_test);
      cy.get(test_id).each(($test) => {
        pageModel.assertComputedStyleProperty($test,'button','.toggle','cursor');
      });
    });

    it("Then toggle pointer events are equal to bootstrap enabled button pointer events", () => {
      pageModel.load(bstInterface, data_test);
      cy.get(test_id).each(($test) => {
        pageModel.assertComputedStyleProperty($test,'button','.toggle','pointer-events');
      });
    });

    it("Then toggle change on click", () => {
      pageModel.load(bstInterface, data_test);
      cy.get(test_id).each(($test) => {
        pageModel.checkToggleClick($test, true);
      });
    });
  });
  
  context("When toggle is disabled", () => {
    const test_id = "#status-disabled";
    it("Then toggle opacity is equal to bootstrap disabled button opacity", () => {
      pageModel.load(bstInterface, data_test);
      cy.get(test_id).each(($test) => {
        pageModel.assertComputedStyleProperty($test,'button','.toggle','opacity');
      });
    });

    it("Then toggle cursor is equal to bootstrap disabled button cursor", () => {
      pageModel.load(bstInterface, data_test);
      cy.get(test_id).each(($test) => {
        pageModel.assertComputedStyleProperty($test,'button','.toggle','cursor');
      });
    });

    it("Then toggle pointer events are equal to bootstrap disabled button pointer events", () => {
      pageModel.load(bstInterface, data_test);
      cy.get(test_id).each(($test) => {
        pageModel.assertComputedStyleProperty($test,'button','.toggle','pointer-events');
      });
    });

    it("Then toggle do not change on click", () => {
      pageModel.load(bstInterface, data_test);
      cy.get(test_id).each(($test) => {
        pageModel.checkToggleClick($test, false);
      });
    });
  });
}