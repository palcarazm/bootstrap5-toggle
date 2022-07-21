/// <reference types="cypress" />
import ToggleModel from "../support/togglemodel";
import PageModel from "../support/pagemodel";

describe("Tristate feature", () => {
  context("Given ECMAS bootstrap toggle interface",()=>{
    testCase("ecmas");
  });
  context("Given jQuery bootstrap toggle interface",()=>{
    testCase("jquery");
  });
});

function testCase(bstInterface) {
  const data_test = "tristate";
  context("When an enabled determinated tristate toggle is clicked", () => {
    const test_id = "#status-enabled";
    it("Then toggle state change to indeterminate", () => {
      PageModel.load(bstInterface, data_test);
      cy.get(test_id).each(($test) => {
        ToggleModel.checkToggleClick($test, true, 'enabled',true);
      });
    });
  });

  context("When an enabled indeterminated tristate toggle is clicked", () => {
    const test_id = "#status-enabled";
    it("Then toggle state change to determinate", () => {
      PageModel.load(bstInterface, data_test);
      cy.get(test_id).each(($test) => {
        cy.wrap($test).find('.toggle').click().then(()=>{
          ToggleModel.checkToggleClick($test, true, 'enabled',true);
        });
      });
    });
  });
  
  context("When a disabled toggle is cliked", () => {
    const test_id = "#status-disabled";
    it("Then toggle don't change", () => {
      PageModel.load(bstInterface, data_test);
      cy.get(test_id).each(($test) => {
        ToggleModel.checkToggleClick($test, false, 'disabled',true);
      });
    });
  });
  
  context("When a readonly toggle is clicked", () => {
    const test_id = "#status-readonly";
    it("Then toggle don't change", () => {
      PageModel.load(bstInterface, data_test);
      cy.get(test_id).each(($test) => {
        ToggleModel.checkToggleClick($test, false, 'readonly',true);
      });
    });
  });
}