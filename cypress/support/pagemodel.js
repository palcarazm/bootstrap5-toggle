class PageModel {
  DEFAULTS = {
    on: "On",
    off: "Off",
    onstyle: "primary",
    offstyle: "secondary",
    size: "normal",
    style: "",
    width: null,
    height: null,
  };
  /**
   * Load Test App and go to the selected test
   * @param {String} bstInterface : Bootstrap Toggle interface (jquery or ecmas)
   * @param {String} btn_data_test : data-test of the button to click
   */
  load(bstInterface, btn_data_test) {
    cy.visit("./test/test-app." + bstInterface.toLowerCase() + ".html");
    cy.get('button[data-test="' + btn_data_test + '"]').click();
  }

  /**
   * Get test Elements in current Test App
   * @returns {Chainable<JQuery<HTMLElementTagNameMap[K]>>} test elements
   */
  getTests() {
    return cy.get(".test");
  }

  /**
   * Assert Computed Style Property
   * @param {Chainable<JQuery<HTMLElementTagNameMap[K]>>} test : test element
   * @param {String} referenceSelector : selector of the reference element in each test element
   * @param {String} toggleSelector : selector of the toggle element in each test element
   * @param {String} referenceProperty : style reference property to assert
   * @param {String} toggleProperty : style toggle property to assert (if not provided as the referenceProperty)
   */
  assertComputedStyleProperty(
    test,
    referenceSelector,
    toggleSelector,
    referenceProperty,
    toggleProperty = null
  ) {
    cy.wrap(test)
      .find(referenceSelector)
      .then((element) => {
        cy.wrap(test)
          .find(toggleSelector)
          .should(
            "have.css",
            toggleProperty || referenceProperty,
            window
              .getComputedStyle(element[0])
              .getPropertyValue(referenceProperty)
          );
      });
  }

  /**
   * Check a click in a toggle element
   * @param {Chainable<JQuery<HTMLElementTagNameMap[K]>>} test : test element
   * @param {Boolean} isEnabled: Toggle enabled (Y/N)
   */
  checkToggleClick(test, isEnabled) {
    let prevState = test.find(".toggle input").is("[checked]");

    cy.wrap(test).find(".toggle input").should(isEnabled ? "be.enabled" : "not.be.enabled");

    cy.wrap(test).find(".toggle").click({force: true}).then(() => {
      let isChecked = (isEnabled && !prevState) || (!isEnabled && prevState)  ;
      cy.wrap(test).find(".toggle input").should(isChecked ? "be.checked" : "not.be.checked");
      cy.wrap(test).find(".toggle").should(isChecked ? "not.have.class" : "have.class", "off");
      /*cy.wrap(test).find(isChecked ? '.toggle-on' : '.toggle-off').should('be.visible');
      cy.wrap(test).find(isChecked ? '.toggle-off' : '.toggle-on').should('not.be.visible');
      CYPRESS ISSUE 22750 (https://github.com/cypress-io/cypress/issues/22750)*/
    });
  }
}
export default PageModel;
