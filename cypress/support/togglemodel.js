class ToggleModel {
  static DEFAULTS = {
    on: "On",
    off: "Off",
    onstyle: "primary",
    offstyle: "secondary",
    size: "normal",
    style: "",
    width: null,
    height: null,
    tabindex: 0,
  };

  /**
   * Check a click in a toggle element
   * @param {Chainable<JQuery<HTMLElementTagNameMap[K]>>} test : test element
   * @param {Boolean} isEnabled: Toggle enabled (Y/N)
   * @param {String} inputAttr: input attribute for disabled toggle [disabled (default) or readonly]
   * @static
   */
  static checkToggleClick(test, isEnabled, inputAttr = 'disabled') {
    let prevState = test.find(".toggle input").is("[checked]");

    if(isEnabled){
      cy.wrap(test).find(".toggle input").should("be.enabled");
    }else if(inputAttr == 'disabled'){
      cy.wrap(test).find('input').should('be.disabled').and('not.have.attr','readonly');
    }else if(inputAttr == 'readonly'){
      cy.wrap(test).find('input').should('be.enabled').and('have.attr','readonly');
    }else{
      throw new Error("Test fail. Argument not supported for inputAttr " + inputAttr);
    }

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
   * @static
   */
  static checkToggleElementWithOptions($toggle, options){
    this.#checkToggleWithOptions($toggle, options);
    this.#checkToggleOnWithOptions($toggle, options);
    this.#checkToggleOffWithOptions($toggle, options);

    // Size Check
    let sizeClass = this.#getSizeClass(options.size || this.DEFAULTS.size);
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
   * @static
   * @private
   */
  static #checkToggleWithOptions($toggle, options){
    if($toggle.find('input').is("[checked]")){
      cy.wrap($toggle)
        .should("not.have.class", "off")
        .and("have.class",'btn-'+(options.onstyle || this.DEFAULTS.onstyle))
    }else{
      cy.wrap($toggle)
        .should("have.class", "off")
        .and("have.class",'btn-'+(options.offstyle || this.DEFAULTS.offstyle))
    }
    cy.wrap($toggle).should('have.attr','tabindex',(options.tabindex || this.DEFAULTS.tabindex))
    if(options.width || this.DEFAULTS.width) cy.wrap($toggle).should('have.css', 'width', (options.width || this.DEFAULTS.width)+'px')
    if(options.height || this.DEFAULTS.height) cy.wrap($toggle).should('have.css', 'height', (options.height || this.DEFAULTS.height)+'px')
    if((options.style || this.DEFAULTS.style) != '') cy.wrap($toggle).should('have.class', options.style || this.DEFAULTS.style)
  }

  /**
   * Check a toggle on base on the toggle options 
   * @param {Chainable<JQuery<HTMLElementTagNameMap[K]>>} $toggle : toggle element
   * @param {Object} options : toggle options
   * @static
   * @private
   */
  static #checkToggleOnWithOptions($toggle, options){
    cy.wrap($toggle).find('.toggle-on').should("have.html", options.on || this.DEFAULTS.on)
    cy.wrap($toggle).find('.toggle-on').should("have.class", 'btn-'+(options.onstyle || this.DEFAULTS.onstyle))
  }

  /**
   * Check a toggle off base on the toggle options 
   * @param {Chainable<JQuery<HTMLElementTagNameMap[K]>>} $toggle : toggle element
   * @param {Object} options : toggle options
   * @static
   * @private
   */
  static #checkToggleOffWithOptions($toggle, options){
    cy.wrap($toggle).find('.toggle-off').should("have.html", options.off || this.DEFAULTS.off)
    cy.wrap($toggle).find('.toggle-off').should("have.class", 'btn-'+(options.offstyle || this.DEFAULTS.offstyle))
  }

  /**
   * Fet the toggle size class
   * @param {string} size toggle data-size
   * @returns {string} size class
   * @static
   * @private
   */
  static #getSizeClass(size){
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
export default ToggleModel;
