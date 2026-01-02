/// <reference types="cypress" />
import PageModel from "../support/pagemodel";

describe("Form data feature", () => {
  context("Given ECMAS bootstrap toggle interface", () => {
    testCase("ecmas");
  });
  context("Given jQuery bootstrap toggle interface", () => {
    testCase("jquery");
  });
});

function testCase(bstInterface) {
  const data_test = "form-data";
  context("When the form is submitted with all toggles on", () => {
    it("Then form data should have toggle-on values", () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        formDataCheck($test,
          [
            {
              name: "toggle-with-opts-with-value",
              value: "VALUE",
            },
            {
              name: "toggle-with-opts-no-value",
              value: "ON",
            },
            {
              name: "toggle-with-no-opts-no-value",
              value: "on",
            },
          ]
      );        
      });
    });
  });
  context("When the form is submitted with all toggles off", () => {
    it("Then form data should have toggle-off values", () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        cy.wrap($test).find(".toggle").each((toggle) => {
          cy.wrap(toggle).click({ force: true });
        });
        formDataCheck($test,
          [
            {
              name: "toggle-with-opts-with-value",
              value: "OFF",
            },
            {
              name: "toggle-with-opts-no-value",
              value: "OFF",
            },
          ]
      );        
      });
    });
  });
}

function formDataCheck($test, expectedFormData) {
  cy.wrap($test).find("button[type='submit']").click();
  cy.wrap($test)
    .find("#form-payload")
    .invoke("text")
    .then((output) =>JSON.parse(output))
    .should('deep.equal', expectedFormData);
}
