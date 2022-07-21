/// <reference types="cypress" />
import ToggleModel from "../support/togglemodel";
import PageModel from "../support/pagemodel";

describe("Toggle modified by API", () => {
  context("Given ECMAS bootstrap toggle interface",()=>{
    testCase("ecmas");
  });
  context("Given jQuery bootstrap toggle interface",()=>{
    testCase("jquery");
  });
});

function testCase(bstInterface) {
  const data_test = "api-methods";
  context("When the API constructor method is call", () => {
    it("Then toggle is rendered", () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        cy.wrap($test).find('button[data-method="initialize"]').click()
        cy.wrap($test).find('.toggle').should('exist');
        cy.wrap($test).find('input').should('exist').and('not.be.visible');
      });
    });
  });
  context("When the API destroy method is call", () => {
    it("Then toggle is destroyed and the checkbox is showed", () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        cy.wrap($test).find('button[data-method="initialize"]').click()
        cy.wrap($test).find('button[data-method="destroy"]').click()
        cy.wrap($test).find('.toggle').should('not.exist');
        cy.wrap($test).find('input').should('exist').and('be.visible').and('have.length',1);
      });
    });
  });
  context("When the API disable method is call", () => {
    it("Then toggle and the checkbox are disabled", () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        cy.wrap($test).find('button[data-method="initialize"]').click()
        cy.wrap($test).find('button[data-method="disable"]').click()
        cy.wrap($test).find('.toggle').should('have.class', 'disabled').and('have.attr', 'disabled');
        cy.wrap($test).find('input').should('be.disabled');
      });
    });
  });
  context("When the API readonly method is call", () => {
    it("Then toggle is disabled and the checkbox is set as readonly", () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        cy.wrap($test).find('button[data-method="initialize"]').click()
        cy.wrap($test).find('button[data-method="readonly"]').click()
        cy.wrap($test).find('.toggle').should('have.class', 'disabled').and('have.attr', 'disabled');
        cy.wrap($test).find('input').should('not.be.disabled').and('have.attr','readonly');
      });
    });
  });
  context("When the API enable method is call", () => {
    it("Then toggle and the checkbox are enabled", () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        cy.wrap($test).find('button[data-method="initialize"]').click()
        cy.wrap($test).find('button[data-method="disable"]').click()
        cy.wrap($test).find('button[data-method="enable"]').click()
        cy.wrap($test).find('.toggle').should('not.have.class', 'disabled').and('not.have.attr', 'disabled');
        cy.wrap($test).find('input').should('not.be.disabled');
      });
    });
  });
  context("When the API on method is call", () => {
    it("Then toggle and the checkbox are checked and a change event is fired", () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        cy.wrap($test).find('button[data-method="initialize"]').click()
        cy.wrap($test).find('button[data-method="on"]').click()
        cy.wrap($test).find('.toggle').should('not.have.class', 'off');
        cy.wrap($test).find('input:eq(0)').should('be.checked');
        cy.wrap($test).find('input:eq(1)').should('not.be.checked');
        cy.wrap($test).find('.badge').should('exist');
      });
    });
  });
  context("When the API off method is call", () => {
    it("Then toggle and the checkbox are not checked and a change event is fired", () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        cy.wrap($test).find('button[data-method="initialize"]').click()
        cy.wrap($test).find('button[data-method="on"]').click()
        cy.wrap($test).find('button[data-method="off"]').click()
        cy.wrap($test).find('.toggle').should('have.class', 'off');
        cy.wrap($test).find('input:eq(0)').should('not.be.checked');
        cy.wrap($test).find('input:eq(1)').should('be.checked');
        cy.wrap($test).find('.badge').should('exist');
      });
    });
  });
  context("When the API toggle method is call", () => {
    it("Then toggle and the checkbox must change the checked state and a change event is fired", () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        cy.wrap($test).find('button[data-method="initialize"]').click()
        //ON
        cy.wrap($test).find('button[data-method="toggle"]').click()
        cy.wrap($test).find('.toggle').should('not.have.class', 'off');
        cy.wrap($test).find('input:eq(0)').should('be.checked');
        cy.wrap($test).find('input:eq(1)').should('not.be.checked');
        cy.wrap($test).find('.badge').should('exist');
        //OFF
        cy.wrap($test).find('button[data-method="toggle"]').click()
        cy.wrap($test).find('.toggle').should('have.class', 'off');
        cy.wrap($test).find('input:eq(0)').should('not.be.checked');
        cy.wrap($test).find('input:eq(1)').should('be.checked');
        cy.wrap($test).find('.badge').should('exist');
      });
    });
  });
  context("When the API on silent method is call", () => {
    it("Then toggle and the checkbox are checked and a change event is not fired", () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        cy.wrap($test).find('button[data-method="initialize"]').click()
        cy.wrap($test).find('button[data-method="on-silent"]').click()
        cy.wrap($test).find('.toggle').should('not.have.class', 'off');
        cy.wrap($test).find('input:eq(0)').should('be.checked');
        cy.wrap($test).find('input:eq(1)').should('not.be.checked');
        cy.wrap($test).find('.badge').should('not.exist');
      });
    });
  });
  context("When the API off silent method is call", () => {
    it("Then toggle and the checkbox are not checked and a change event is not fired", () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        cy.wrap($test).find('button[data-method="initialize"]').click()
        cy.wrap($test).find('button[data-method="on-silent"]').click()
        cy.wrap($test).find('button[data-method="off-silent"]').click()
        cy.wrap($test).find('.toggle').should('have.class', 'off');
        cy.wrap($test).find('input:eq(0)').should('not.be.checked');
        cy.wrap($test).find('input:eq(1)').should('be.checked');
        cy.wrap($test).find('.badge').should('not.exist');
      });
    });
  });
  context("When the API toggle silent method is call", () => {
    it("Then toggle and the checkbox must change the checked state and a change event is not fired", () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        cy.wrap($test).find('button[data-method="initialize"]').click()
        //ON
        cy.wrap($test).find('button[data-method="toggle-silent"]').click()
        cy.wrap($test).find('.toggle').should('not.have.class', 'off');
        cy.wrap($test).find('input:eq(0)').should('be.checked');
        cy.wrap($test).find('input:eq(1)').should('not.be.checked');
        cy.wrap($test).find('.badge').should('not.exist');
        //OFF
        cy.wrap($test).find('button[data-method="toggle-silent"]').click()
        cy.wrap($test).find('.toggle').should('have.class', 'off');
        cy.wrap($test).find('input:eq(0)').should('not.be.checked');
        cy.wrap($test).find('input:eq(1)').should('be.checked');
        cy.wrap($test).find('.badge').should('not.exist');
      });
    });
  });
  context("When the API indeterminate method is call", () => {
    it("Then toggle and the checkbox are not checked and have not name, and a change event is fired", () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        cy.wrap($test).find('button[data-method="initialize"]').click()
        cy.wrap($test).find('button[data-method="indeterminate"]').click()
        cy.wrap($test).find('.toggle').should('have.class', 'indeterminate');
        cy.wrap($test).find('input:eq(0)').should('not.be.checked').and('not.have.attr', 'name');
        cy.wrap($test).find('input:eq(1)').should('not.be.checked').and('not.have.attr', 'name');
        cy.wrap($test).find('input:indeterminate').should('exist').and('have.length',2);
        cy.wrap($test).find('.badge').should('exist');
      });
    });
  });
  context("When the API determinate method is call in a off chackbox", () => {
    it("Then toggle and the checkbox are not checked and have name, and a change event is fired", () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        cy.wrap($test).find('button[data-method="initialize"]').click()
        cy.wrap($test).find('button[data-method="off"]').click()
        cy.wrap($test).find('button[data-method="indeterminate"]').click()
        cy.wrap($test).find('button[data-method="determinate"]').click()
        cy.wrap($test).find('.toggle').should('not.have.class', 'indeterminate');
        cy.wrap($test).find('input:eq(0)').should('not.be.checked').and('have.attr', 'name');
        cy.wrap($test).find('input:eq(1)').should('be.checked').and('have.attr', 'name');
        cy.wrap($test).find('input:indeterminate').should('not.exist');
        cy.wrap($test).find('.badge').should('exist');
      });
    });
  });
  context("When the API indeterminate silent method is call", () => {
    it("Then toggle and the checkbox are not checked and have not name, and a change event is not fired", () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        cy.wrap($test).find('button[data-method="initialize"]').click()
        cy.wrap($test).find('button[data-method="indeterminate-silent"]').click()
        cy.wrap($test).find('.toggle').should('have.class', 'indeterminate');
        cy.wrap($test).find('input:eq(0)').should('not.be.checked').and('not.have.attr', 'name');
        cy.wrap($test).find('input:eq(1)').should('not.be.checked').and('not.have.attr', 'name');
        cy.wrap($test).find('.badge').should('not.exist');
      });
    });
  });
  context("When the API determinate silent method is call in a off chackbox", () => {
    it("Then toggle and the checkbox are not checked and have name, and a change event is not fired", () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test) => {
        cy.wrap($test).find('button[data-method="initialize"]').click()
        cy.wrap($test).find('button[data-method="off"]').click()
        cy.wrap($test).find('button[data-method="indeterminate"]').click()
        cy.wrap($test).find('button[data-method="determinate-silent"]').click()
        cy.wrap($test).find('.toggle').should('not.have.class', 'indeterminate');
        cy.wrap($test).find('input:eq(0)').should('not.be.checked').and('have.attr', 'name');
        cy.wrap($test).find('input:eq(1)').should('be.checked').and('have.attr', 'name');
        cy.wrap($test).find('.badge').should('not.exist');
      });
    });
  });
}
