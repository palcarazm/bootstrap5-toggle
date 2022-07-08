/// <reference types="cypress" />
import PageModel from "../support/pagemodel";
const pageModel = new PageModel();

describe("Custom Text feature", () => {
  context("When data-on attribute is set", () => {
    const data_test = "custom-text";
    it("Then toggle-on text is equal to a custom text", () => {
      pageModel.load(data_test);
      pageModel.getTests().each(($test) => {
        if ($test.find('input[data-toggle="toggle"][data-on]').length > 0) {
          cy.wrap($test)
            .find("code")
            .then(($element) => {
              cy.wrap($test)
                .find(".toggle-on")
                .should("have.text", $element.html());
            });
        }
      });
    });
  });

  context("When data-off attribute is set", () => {
    const data_test = "custom-text";
    it("Then toggle-off text is equal to a custom text", () => {
      pageModel.load(data_test);
      pageModel.getTests().each(($test) => {
        if ($test.find('input[data-toggle="toggle"][data-off]').length > 0) {
          cy.wrap($test)
            .find("code")
            .then(($element) => {
              cy.wrap($test)
                .find(".toggle-off")
                .should("have.text", $element.html());
            });
        }
      });
    });
  });

  context("When data-on attribute isn't set", () => {
    const data_test = "custom-text";
    it("Then toggle-on text is equal to the default text", () => {
      pageModel.load(data_test);
      pageModel.getTests().each(($test) => {
        if (
          $test.find('input[data-toggle="toggle"]:not([data-on])').length > 0
        ) {
          cy.wrap($test)
            .find(".toggle-on")
            .should("have.text", pageModel.DEFAULTS.on);
        }
      });
    });
  });

  context("When data-off attribute isn't set", () => {
    const data_test = "custom-text";
    it("Then toggle-off text is equal to the default text", () => {
      pageModel.load(data_test);
      pageModel.getTests().each(($test) => {
        if (
          $test.find('input[data-toggle="toggle"]:not([data-off])').length > 0
        ) {
          cy.wrap($test)
            .find(".toggle-off")
            .should("have.text", pageModel.DEFAULTS.off);
        }
      });
    });
  });
});
