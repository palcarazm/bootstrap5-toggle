/// <reference types="cypress" />
import ToggleModel from "../support/togglemodel";
import PageModel from "../support/pagemodel";

describe("Custom Text feature", () => {
  context("Given ECMAS bootstrap toggle interface", () => {
    testCase("ecmas");
  });
  context("Given jQuery bootstrap toggle interface", () => {
    testCase("jquery");
  });
});

function testCase(bstInterface) {
  context("When data-onlabel attribute is set", () => {
    const data_test = "custom-text";
    it("Then toggle-on text is equal to a custom text", () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        if (
          $test.find('input[data-toggle="toggle"][data-onlabel]').length > 0
        ) {
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

  context("When data-offlabel attribute is set", () => {
    const data_test = "custom-text";
    it("Then toggle-off text is equal to a custom text", () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        if (
          $test.find('input[data-toggle="toggle"][data-offlabel]').length > 0
        ) {
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

  context("When data-on attribute is set", () => {
    const data_test = "custom-text";
    it("Then toggle-on text is equal to a custom text", () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        if ($test.find('input[data-toggle="toggle"][data-on]').length > 0) {
          ToggleModel.DEPRECATION.warnCheck(
            ToggleModel.DEPRECATION.ATTRIBUTE,
            "data-on",
            "data-onlabel"
          );
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
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        if ($test.find('input[data-toggle="toggle"][data-off]').length > 0) {
          ToggleModel.DEPRECATION.warnCheck(
            ToggleModel.DEPRECATION.ATTRIBUTE,
            "data-off",
            "data-offlabel"
          );
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

  context("When data-onlabel attribute isn't set", () => {
    const data_test = "custom-text";
    it("Then toggle-on text is equal to the default text", () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        if (
          $test.find(
            'input[data-toggle="toggle"]:not([data-onlabel]):not([data-on])'
          ).length > 0
        ) {
          cy.wrap($test)
            .find(".toggle-on")
            .should("have.text", ToggleModel.DEFAULTS.onlabel);
        }
      });
    });
  });

  context("When data-offlabel attribute isn't set", () => {
    const data_test = "custom-text";
    it("Then toggle-off text is equal to the default text", () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        if (
          $test.find(
            'input[data-toggle="toggle"]:not([data-offlabel]):not([data-off])'
          ).length > 0
        ) {
          cy.wrap($test)
            .find(".toggle-off")
            .should("have.text", ToggleModel.DEFAULTS.offlabel);
        }
      });
    });
  });
}
