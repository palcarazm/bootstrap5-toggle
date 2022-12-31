class ToggleModel {
  static DEFAULTS = {
    onlabel: "On",
    offlabel: "Off",
    onstyle: "primary",
    offstyle: "secondary",
    onvalue: null,
    offvalue: null,
    ontitle: null,
    offtitle: null,
    size: "normal",
    style: "",
    width: null,
    height: null,
    tabindex: 0,
    tristate: false,
  };

  static DEPRECATION = {
    ATTRIBUTE: "attribute",
    OPTION: "option",
    log: function (type, oldlabel, newlabel) {
      return `Bootstrap Toggle deprecation warning: Using ${oldlabel} ${type} is deprected. Use ${newlabel} instead.`;
    },
    warnCheck: function (type, oldlabel, newlabel) {
      cy.get("@consoleWarn").should(
        "be.calledWith",
        ToggleModel.DEPRECATION.log(type, oldlabel, newlabel)
      );
    },
  };

  /**
   * Check a click in an element
   * @param {Chainable<JQuery<HTMLElementTagNameMap[K]>>} test : test element
   * @param {String} elementSelector:  Selector for the element to click
   * @param {Boolean} isEnabled: Toggle enabled (Y/N)
   * @param {String} inputAttr: input attribute for disabled toggle [disabled (default) or readonly]
   * @param {Boolean} tristate: Tristate toggle (Y/N)
   * @static
   * @private
   */
  static #checkElementClick(
    test,
    elementSelector,
    isEnabled,
    inputAttr = "disabled",
    tristate = false
  ) {
    let prevState = test.find(".toggle input").is("[checked]");

    if (isEnabled) {
      cy.wrap(test).find(".toggle input").should("be.enabled");
    } else if (inputAttr == "disabled") {
      cy.wrap(test)
        .find(".toggle input")
        .should("be.disabled")
        .and("not.have.attr", "readonly");
    } else if (inputAttr == "readonly") {
      cy.wrap(test)
        .find(".toggle input")
        .should("be.enabled")
        .and("have.attr", "readonly");
    } else {
      throw new Error(
        "Test fail. Argument not supported for inputAttr " + inputAttr
      );
    }

    let prevDeterminated = null;
    if (tristate) {
      prevDeterminated = !test.find(".toggle").hasClass("indeterminate");
    }
    cy.wrap(test)
      .find(elementSelector)
      .click({ force: true })
      .then(() => {
        if (tristate) {
          this.#checkActionPerformedTristate(
            test,
            isEnabled,
            prevState,
            prevDeterminated
          );
        } else {
          this.#checkActionPerformedBistate(
            test,
            isEnabled,
            prevState,
            prevDeterminated
          );
        }
      });
  }

  /**
   * Check a click in an toggle
   * @param {Chainable<JQuery<HTMLElementTagNameMap[K]>>} test : test element
   * @param {Boolean} isEnabled: Toggle enabled (Y/N)
   * @param {String} inputAttr: input attribute for disabled toggle [disabled (default) or readonly]
   * @param {Boolean} tristate: Tristate toggle (Y/N)
   * @static
   */
  static checkToggleClick(
    test,
    isEnabled,
    inputAttr = "disabled",
    tristate = false
  ) {
    ToggleModel.#checkElementClick(
      test,
      ".toggle",
      isEnabled,
      inputAttr,
      tristate
    );
  }

  /**
   * Check a click in an label
   * @param {Chainable<JQuery<HTMLElementTagNameMap[K]>>} test : test element
   * @param {Boolean} isEnabled: Toggle enabled (Y/N)
   * @param {String} inputAttr: input attribute for disabled toggle [disabled (default) or readonly]
   * @param {Boolean} tristate: Tristate toggle (Y/N)
   * @static
   */
  static checkLabelClick(
    test,
    isEnabled,
    inputAttr = "disabled",
    tristate = false
  ) {
    ToggleModel.#checkElementClick(
      test,
      "label",
      isEnabled,
      inputAttr,
      tristate
    );
  }

  /**
   * Check a Keypress with focused toggle
   * @param {Chainable<JQuery<HTMLElementTagNameMap[K]>>} test : test element
   * @param {Boolean} isEnabled: Toggle enabled (Y/N)
   * @param {String} inputAttr: input attribute for disabled toggle [disabled (default) or readonly]
   * @param {Boolean} tristate: Tristate toggle (Y/N)
   * @static
   */
  static checkToggleKeypress(
    test,
    isEnabled,
    inputAttr = "disabled",
    tristate = false
  ) {
    let prevState = test.find(".toggle input").is("[checked]");

    if (isEnabled) {
      cy.wrap(test).find(".toggle input").should("be.enabled");
    } else if (inputAttr == "disabled") {
      cy.wrap(test)
        .find(".toggle input")
        .should("be.disabled")
        .and("not.have.attr", "readonly");
    } else if (inputAttr == "readonly") {
      cy.wrap(test)
        .find(".toggle input")
        .should("be.enabled")
        .and("have.attr", "readonly");
    } else {
      throw new Error(
        "Test fail. Argument not supported for inputAttr " + inputAttr
      );
    }

    let prevDeterminated = null;
    if (tristate) {
      prevDeterminated = !test.find(".toggle").hasClass("indeterminate");
    }

    cy.wrap(test)
      .find(".toggle")
      .focus()
      .type(" ")
      .then(() => {
        if (tristate) {
          this.#checkActionPerformedTristate(
            test,
            isEnabled,
            prevState,
            prevDeterminated
          );
        } else {
          this.#checkActionPerformedBistate(
            test,
            isEnabled,
            prevState,
            prevDeterminated
          );
        }
      });
  }

  /**
   * Check bistate toggle before doing an action
   * @param {Chainable<JQuery<HTMLElementTagNameMap[K]>>} test : test element
   * @param {Boolean} isEnabled: Toggle enabled (Y/N)
   * @param {Boolean} prevState: Toggle where ON (Y/N)
   * @static
   */
  static #checkActionPerformedBistate($test, isEnabled, prevState) {
    let isChecked = (isEnabled && !prevState) || (!isEnabled && prevState);
    cy.wrap($test)
      .find(".toggle input")
      .should(isChecked ? "be.checked" : "not.be.checked");
    cy.wrap($test)
      .find(".toggle")
      .should(isChecked ? "not.have.class" : "have.class", "off");
    /*cy.wrap($test).find(isChecked ? '.toggle-on' : '.toggle-off').should('be.visible');
    cy.wrap($test).find(isChecked ? '.toggle-off' : '.toggle-on').should('not.be.visible');
    CYPRESS ISSUE 22750 (https://github.com/cypress-io/cypress/issues/22750)*/
  }

  /**
   * Check tristate toggle before doing an action
   * @param {Chainable<JQuery<HTMLElementTagNameMap[K]>>} test : test element
   * @param {Boolean} isEnabled: Toggle enabled (Y/N)
   * @param {Boolean} prevState: Toggle where ON (Y/N)
   * @param {Boolean} prevDeterminated: Toggle where determinate (Y/N)
   * @static
   */
  static #checkActionPerformedTristate(
    $test,
    isEnabled,
    prevState,
    prevDeterminated
  ) {
    let isChecked =
      (isEnabled && !prevState && !prevDeterminated) ||
      (!isEnabled && prevState);
    let isDeterminated =
      (isEnabled && !prevDeterminated) || (!isEnabled && prevDeterminated);

    cy.wrap($test)
      .find(".toggle input")
      .should(isChecked ? "be.checked" : "not.be.checked");
    cy.wrap($test)
      .find(".toggle")
      .should(
        isChecked || (!isDeterminated && prevState)
          ? "not.have.class"
          : "have.class",
        "off"
      );
    cy.wrap($test)
      .find(".toggle")
      .should(
        isDeterminated ? "not.have.class" : "have.class",
        "indeterminate"
      );
    if (isDeterminated) {
      /*cy.wrap($test).find(isChecked ? '.toggle-on' : '.toggle-off').should('be.visible');
      cy.wrap($test).find(isChecked ? '.toggle-off' : '.toggle-on').should('not.be.visible');
      CYPRESS ISSUE 22750 (https://github.com/cypress-io/cypress/issues/22750)*/
    } else {
      /*cy.wrap($test).find('.toggle-on').should('be.visible');
      cy.wrap($test).find('.toggle-off').should('be.visible');
      CYPRESS ISSUE 22750 (https://github.com/cypress-io/cypress/issues/22750)*/
    }
  }

  /**
   * Check a toggle base on the toggle options
   * @param {Chainable<JQuery<HTMLElementTagNameMap[K]>>} $toggle : toggle element
   * @param {Object} options : toggle options
   * @static
   */
  static checkToggleElementWithOptions($toggle, options) {
    this.#checkToggleWithOptions($toggle, options);
    this.#checkToggleOnWithOptions($toggle, options);
    this.#checkToggleOffWithOptions($toggle, options);
    this.#checkElementwhitOptions($toggle, options);

    // Size Check
    let sizeClass = this.#getSizeClass(options.size || this.DEFAULTS.size);
    if (sizeClass != "") {
      cy.wrap($toggle).should("have.class", sizeClass);
      cy.wrap($toggle).find(".toggle-on").should("have.class", sizeClass);
      cy.wrap($toggle).find(".toggle-off").should("have.class", sizeClass);
    }
  }

  /**
   * Check a toggle base on the toggle options
   * @param {Chainable<JQuery<HTMLElementTagNameMap[K]>>} $toggle : toggle element
   * @param {Object} options : toggle options
   * @static
   * @private
   */
  static #checkToggleWithOptions($toggle, options) {
    if ($toggle.find("input").is("[checked]")) {
      cy.wrap($toggle)
        .should("not.have.class", "off")
        .and("have.class", "btn-" + (options.onstyle || this.DEFAULTS.onstyle));
    } else {
      cy.wrap($toggle)
        .should("have.class", "off")
        .and(
          "have.class",
          "btn-" + (options.offstyle || this.DEFAULTS.offstyle)
        );
    }
    cy.wrap($toggle).should(
      "have.attr",
      "tabindex",
      options.tabindex || this.DEFAULTS.tabindex
    );
    if (options.width || this.DEFAULTS.width)
      cy.wrap($toggle).should(
        "have.css",
        "width",
        (options.width || this.DEFAULTS.width) + "px"
      );
    if (options.height || this.DEFAULTS.height)
      cy.wrap($toggle).should(
        "have.css",
        "height",
        (options.height || this.DEFAULTS.height) + "px"
      );
    if ((options.style || this.DEFAULTS.style) != "")
      cy.wrap($toggle).should(
        "have.class",
        options.style || this.DEFAULTS.style
      );
  }

  /**
   * Check a toggle on base on the toggle options
   * @param {Chainable<JQuery<HTMLElementTagNameMap[K]>>} $toggle : toggle element
   * @param {Object} options : toggle options
   * @static
   * @private
   */
  static #checkToggleOnWithOptions($toggle, options) {
    let onlabel = this.DEFAULTS.onlabel;
    if (options.onlabel) {
      onlabel = options.onlabel;
    } else if (options.on) {
      this.DEPRECATION.warnCheck(this.DEPRECATION.OPTION, "on", "onlabel");
      onlabel = options.on;
    }
    cy.wrap($toggle).find(".toggle-on").should("have.html", onlabel);

    if (options.ontitle) {
      cy.wrap($toggle)
        .find(".toggle-on")
        .should("have.attr", "title", options.ontitle);
    }

    cy.wrap($toggle)
      .find(".toggle-on")
      .should(
        "have.class",
        "btn-" + (options.onstyle || this.DEFAULTS.onstyle)
      );
  }

  /**
   * Check a toggle off base on the toggle options
   * @param {Chainable<JQuery<HTMLElementTagNameMap[K]>>} $toggle : toggle element
   * @param {Object} options : toggle options
   * @static
   * @private
   */
  static #checkToggleOffWithOptions($toggle, options) {
    let offlabel = this.DEFAULTS.offlabel;
    if (options.offlabel) {
      offlabel = options.offlabel;
    } else if (options.off) {
      this.DEPRECATION.warnCheck(this.DEPRECATION.OPTION, "off", "offlabel");
      offlabel = options.off;
    }
    cy.wrap($toggle).find(".toggle-off").should("have.html", offlabel);

    if (options.offtitle) {
      cy.wrap($toggle)
        .find(".toggle-off")
        .should("have.attr", "title", options.offtitle);
    }

    cy.wrap($toggle)
      .find(".toggle-off")
      .should(
        "have.class",
        "btn-" + (options.offstyle || this.DEFAULTS.offstyle)
      );
  }

  static #checkElementwhitOptions($toggle, options) {
    cy.wrap($toggle).find("input:eq(0)").should("not.visible");
    if (options.onvalue) {
      cy.wrap($toggle)
        .find("input:eq(0)")
        .should(
          "have.attr",
          "value",
          $toggle.find("input:eq(0)").val() || options.onvalue
        );
    }
    if (options.offvalue) {
      cy.wrap($toggle)
        .find("input:eq(1)")
        .should("have.attr", "value", options.offvalue)
        .and("have.attr", "data-toggle", "invert-toggle")
        .and("not.visible");
    } else {
      cy.wrap($toggle).find("input:eq(1)").should("not.exist");
    }
  }

  /**
   * Fet the toggle size class
   * @param {string} size toggle data-size
   * @returns {string} size class
   * @static
   * @private
   */
  static #getSizeClass(size) {
    let sizeClass;
    switch (size) {
      case "large":
      case "lg":
        sizeClass = "btn-lg";
        break;
      case "small":
      case "sm":
        sizeClass = "btn-sm";
        break;
      case "mini":
      case "xs":
        sizeClass = "btn-xs";
        break;
      default:
        sizeClass = "";
        break;
    }
    return sizeClass;
  }
}
export default ToggleModel;
