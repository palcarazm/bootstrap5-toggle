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

  /**
   * Check a toggle base on the toggle options 
   * @param {Chainable<JQuery<HTMLElementTagNameMap[K]>>} $toggle : toggle element
   * @param {Object} options : toggle options
   */
  checkToggleElementWithOptions($toggle, options){
    this._checkToggleWithOptions($toggle, options);
    this._checkToggleOnWithOptions($toggle, options);
    this._checkToggleOffWithOptions($toggle, options);

    // Size Check
    let sizeClass = this.getSizeClass(options.size || this.DEFAULTS.size);
    if(sizeClass != ''){
      cy.wrap($toggle).should("have.class", sizeClass)
      cy.wrap($toggle).find('.toggle-on').should("have.class", sizeClass)
      cy.wrap($toggle).find('.toggle-off').should("have.class", sizeClass)
    }
  }

  /**
   * Check a toggle base on the toggle options 
   * @param {Chainable<JQuery<HTMLElementTagNameMap[K]>>} $toggle : toggle element
   * @param {Object} options : toggle options
   */
   _checkToggleWithOptions($toggle, options){
    if($toggle.find('input').is("[checked]")){
      cy.wrap($toggle)
        .should("not.have.class", "off")
        .and("have.class",'btn-'+(options.onstyle || this.DEFAULTS.onstyle))
    }else{
      cy.wrap($toggle)
        .should("have.class", "off")
        .and("have.class",'btn-'+(options.offstyle || this.DEFAULTS.offstyle))
    }
    if(options.width || this.DEFAULTS.width) cy.wrap($toggle).should('have.css', 'width', (options.width || this.DEFAULTS.width)+'px')
    if(options.height || this.DEFAULTS.height) cy.wrap($toggle).should('have.css', 'height', (options.height || this.DEFAULTS.height)+'px')
    if((options.style || this.DEFAULTS.style) != '') cy.wrap($toggle).should('have.class', options.style || this.DEFAULTS.style)
  }

  /**
   * Check a toggle on base on the toggle options 
   * @param {Chainable<JQuery<HTMLElementTagNameMap[K]>>} $toggle : toggle element
   * @param {Object} options : toggle options
   */
   _checkToggleOnWithOptions($toggle, options){
    cy.wrap($toggle).find('.toggle-on').should("have.html", options.on || this.DEFAULTS.on)
    cy.wrap($toggle).find('.toggle-on').should("have.class", 'btn-'+(options.onstyle || this.DEFAULTS.onstyle))
  }

  /**
   * Check a toggle off base on the toggle options 
   * @param {Chainable<JQuery<HTMLElementTagNameMap[K]>>} $toggle : toggle element
   * @param {Object} options : toggle options
   */
   _checkToggleOffWithOptions($toggle, options){
    cy.wrap($toggle).find('.toggle-off').should("have.html", options.off || this.DEFAULTS.off)
    cy.wrap($toggle).find('.toggle-off').should("have.class", 'btn-'+(options.offstyle || this.DEFAULTS.offstyle))
  }

  /**
   * Fet the toggle size class
   * @param {string} size toggle data-size
   * @returns {string} size class
   */
  getSizeClass(size){
    let sizeClass
    switch (size) {
			case 'large':
			case 'lg':
				sizeClass = 'btn-lg';
				break;
			case 'small':
			case 'sm':
				sizeClass = 'btn-sm';
				break;
			case 'mini':
			case 'xs':
				sizeClass = 'btn-xs';
				break;
			default:
				sizeClass = ''
				break;
		}
    return sizeClass;
  }
}
export default PageModel;
