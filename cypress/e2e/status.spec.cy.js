/// <reference types="cypress" />
import PageModel from "../support/pagemodel";
const pageModel = new PageModel();

describe("Status feature", () => {
  const data_test = "status";
  context("When toggle is enabled", () => {
    const test_id = "#status-enabled";
    it("Then toggle opacity is equal to bootstrap enabled button opacity", () => {
      pageModel.load(data_test);
      cy.get(test_id).each(($test) => {
        pageModel.assertComputedStyleProperty($test,'button','.toggle','opacity');
      });
    });

    it("Then toggle cursor is equal to bootstrap enabled button cursor", () => {
      pageModel.load(data_test);
      cy.get(test_id).each(($test) => {
        pageModel.assertComputedStyleProperty($test,'button','.toggle','cursor');
      });
    });

    it("Then toggle pointer events are equal to bootstrap enabled button pointer events", () => {
      pageModel.load(data_test);
      cy.get(test_id).each(($test) => {
        pageModel.assertComputedStyleProperty($test,'button','.toggle','pointer-events');
      });
    });

    it("Then toggle change on click", () => {
      pageModel.load(data_test);
      cy.get(test_id).each(($test) => {
        pageModel.checkToggleClick($test, true);
      });
    });
  });
  
  context("When toggle is disabled", () => {
    const test_id = "#status-disabled";
    it("Then toggle opacity is equal to bootstrap enabled button opacity", () => {
      pageModel.load(data_test);
      cy.get(test_id).each(($test) => {
        pageModel.assertComputedStyleProperty($test,'button','.toggle','opacity');
      });
    });

    it("Then toggle cursor is equal to bootstrap enabled button cursor", () => {
      pageModel.load(data_test);
      cy.get(test_id).each(($test) => {
        pageModel.assertComputedStyleProperty($test,'button','.toggle','cursor');
      });
    });

    it("Then toggle pointer events are equal to bootstrap enabled button pointer events", () => {
      pageModel.load(data_test);
      cy.get(test_id).each(($test) => {
        pageModel.assertComputedStyleProperty($test,'button','.toggle','pointer-events');
      });
    });

    it("Then toggle do not change on click", () => {
      pageModel.load(data_test);
      cy.get(test_id).each(($test) => {
        pageModel.checkToggleClick($test, false);
      });
    });
  });
});
