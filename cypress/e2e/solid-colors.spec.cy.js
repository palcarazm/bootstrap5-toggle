/// <reference types="cypress" />
import PageModel from "../support/pagemodel"

const rgbWhite = 'rgb(248, 249, 250)';

describe('Solid colors feature', () => {
  context("Given ECMAS bootstrap toggle interface",()=>{
    testCase("ecmas");
  });
  context("Given jQuery bootstrap toggle interface",()=>{
    testCase("jquery");
  });
});

function testCase(bstInterface) {
  context('When data-onstyle attribute is set to a solid color and toogle is activated', () =>{
    const data_test = 'color-on';
    it('Then toggle-on background color must have the associated color', () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test)=>{      
        PageModel.assertComputedStyleProperty($test,'button','.toggle-on','background-color');
      });
    });

    it('Then toggle border color must have the associated color', () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test)=>{      
        PageModel.assertComputedStyleProperty($test,'button','.toggle','border-color');
      });
    });

    it('Then toggle-on text color must have the associated color', () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test)=>{      
        PageModel.assertComputedStyleProperty($test,'button','.toggle-on','color');
      });
    });

    it('Then toggle-handle border color must be white', () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test)=>{      
        cy.wrap($test).find('.toggle-handle').should('have.css','border-color',rgbWhite)
      });
    });

    it('Then toggle-handle background color must be white', () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test)=>{      
        cy.wrap($test).find('.toggle-handle').should('have.css','background-color',rgbWhite)
      });
    });
  });

  context('When data-offstyle attribute is set to a solid color and toogle is deactivated', () =>{
    const data_test = 'color-off';
    it('Then toggle-off background color must have the associated color', () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test)=>{      
        PageModel.assertComputedStyleProperty($test,'button','.toggle-off','background-color');
      });
    });

    it('Then toggle border color must have the associated color', () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test)=>{      
        PageModel.assertComputedStyleProperty($test,'button','.toggle','border-color');
      });
    });

    it('Then toggle-off text color must have the associated color', () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test)=>{      
        PageModel.assertComputedStyleProperty($test,'button','.toggle-off','color');
      });
    });

    it('Then toggle-handle border color must be white', () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test)=>{      
        cy.wrap($test).find('.toggle-handle').should('have.css','border-color',rgbWhite)
      });
    });

    it('Then toggle-handle background color must be white', () => {
      PageModel.load(bstInterface, data_test);
      PageModel.getTests().each(($test)=>{      
        cy.wrap($test).find('.toggle-handle').should('have.css','background-color',rgbWhite)
      });
    });
  });
}