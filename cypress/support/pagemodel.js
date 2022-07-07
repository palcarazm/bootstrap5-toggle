class PageModel {
    /**
     * Load Test App and go to the selected test
     * @param {String} btn_data_test : data-test of the button to click
     */
  load(btn_data_test) {
    cy.visit("./test/test-app.html");
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
   * 
   * @param {Chainable<JQuery<HTMLElementTagNameMap[K]>>} test : test elements
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
            window.getComputedStyle(element[0]).getPropertyValue(referenceProperty)
          );
      });
  }
}
export default PageModel;
