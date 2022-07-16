/// <reference types="cypress" />
import ToggleModel from "../support/togglemodel";
import PageModel from "../support/pagemodel";

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
      PageModel.load(bstInterface, data_test);
      cy.get(test_id).each(($test) => {
        PageModel.assertComputedStyleProperty($test,'button','.toggle','opacity');
      });
    });

    it("Then toggle cursor is equal to bootstrap enabled button cursor", () => {
      PageModel.load(bstInterface, data_test);
      cy.get(test_id).each(($test) => {
        PageModel.assertComputedStyleProperty($test,'button','.toggle','cursor');
      });
    });

    it("Then toggle pointer events are equal to bootstrap enabled button pointer events", () => {
      PageModel.load(bstInterface, data_test);
      cy.get(test_id).each(($test) => {
        PageModel.assertComputedStyleProperty($test,'button','.toggle','pointer-events');
      });
    });

    it("Then toggle change on click", () => {
      PageModel.load(bstInterface, data_test);
      cy.get(test_id).each(($test) => {
        ToggleModel.checkToggleClick($test, true);
      });
    });
  });
  
  context("When toggle is disabled", () => {
    const test_id = "#status-disabled";
    it("Then toggle opacity is equal to bootstrap disabled button opacity", () => {
      PageModel.load(bstInterface, data_test);
      cy.get(test_id).each(($test) => {
        PageModel.assertComputedStyleProperty($test,'button','.toggle','opacity');
      });
    });

    it("Then toggle cursor is equal to bootstrap disabled button cursor", () => {
      PageModel.load(bstInterface, data_test);
      cy.get(test_id).each(($test) => {
        PageModel.assertComputedStyleProperty($test,'button','.toggle','cursor');
      });
    });

    it("Then toggle pointer events are equal to bootstrap disabled button pointer events", () => {
      PageModel.load(bstInterface, data_test);
      cy.get(test_id).each(($test) => {
        PageModel.assertComputedStyleProperty($test,'button','.toggle','pointer-events');
      });
    });

    it("Then toggle do not change on click", () => {
      PageModel.load(bstInterface, data_test);
      cy.get(test_id).each(($test) => {
        ToggleModel.checkToggleClick($test, false);
      });
    });
  });
  
  context("When toggle is readonly", () => {
    const test_id = "#status-readonly";
    it("Then toggle opacity is equal to bootstrap disabled button opacity", () => {
      PageModel.load(bstInterface, data_test);
      cy.get(test_id).each(($test) => {
        PageModel.assertComputedStyleProperty($test,'button','.toggle','opacity');
      });
    });

    it("Then toggle cursor is equal to bootstrap disabled button cursor", () => {
      PageModel.load(bstInterface, data_test);
      cy.get(test_id).each(($test) => {
        PageModel.assertComputedStyleProperty($test,'button','.toggle','cursor');
      });
    });

    it("Then toggle pointer events are equal to bootstrap disabled button pointer events", () => {
      PageModel.load(bstInterface, data_test);
      cy.get(test_id).each(($test) => {
        PageModel.assertComputedStyleProperty($test,'button','.toggle','pointer-events');
      });
    });

    it.only("Then toggle do not change on click", () => {
      PageModel.load(bstInterface, data_test);
      cy.get(test_id).each(($test) => {
        ToggleModel.checkToggleClick($test, false, 'readonly');
      });
    });
  });
}