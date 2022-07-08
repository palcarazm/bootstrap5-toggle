/// <reference types="cypress" />
import PageModel from "../support/pagemodel"
const pageModel = new PageModel();
const rgbWhite = 'rgb(255, 255, 255)';

describe('Solid colors feature', () => {
  context('When data-onstyle attribute is set to a solid color and toogle is activated', () =>{
    const data_test = 'color-on';
    it('Then toggle-on background color must have the associated color', () => {
      pageModel.load(data_test);
      pageModel.getTests().each(($test)=>{      
        pageModel.assertComputedStyleProperty($test,'button','.toggle-on','background-color');
      });
    });

    it('Then toggle border color must have the associated color', () => {
      pageModel.load(data_test);
      pageModel.getTests().each(($test)=>{      
        pageModel.assertComputedStyleProperty($test,'button','.toggle','border-color');
      });
    });

    it('Then toggle-on text color must have the associated color', () => {
      pageModel.load(data_test);
      pageModel.getTests().each(($test)=>{      
        pageModel.assertComputedStyleProperty($test,'button','.toggle-on','color');
      });
    });

    it('Then toggle-handle border color must be white', () => {
      pageModel.load(data_test);
      pageModel.getTests().each(($test)=>{      
        cy.wrap($test).find('.toggle-handle').should('have.css','border-color',rgbWhite)
      });
    });

    it('Then toggle-handle background color must be white', () => {
      pageModel.load(data_test);
      pageModel.getTests().each(($test)=>{      
        cy.wrap($test).find('.toggle-handle').should('have.css','background-color',rgbWhite)
      });
    });
  });

  context('When data-offstyle attribute is set to a solid color and toogle is deactivated', () =>{
    const data_test = 'color-off';
    it('Then toggle-off background color must have the associated color', () => {
      pageModel.load(data_test);
      pageModel.getTests().each(($test)=>{      
        pageModel.assertComputedStyleProperty($test,'button','.toggle-off','background-color');
      });
    });

    it('Then toggle border color must have the associated color', () => {
      pageModel.load(data_test);
      pageModel.getTests().each(($test)=>{      
        pageModel.assertComputedStyleProperty($test,'button','.toggle','border-color');
      });
    });

    it('Then toggle-off text color must have the associated color', () => {
      pageModel.load(data_test);
      pageModel.getTests().each(($test)=>{      
        pageModel.assertComputedStyleProperty($test,'button','.toggle-off','color');
      });
    });

    it('Then toggle-handle border color must be white', () => {
      pageModel.load(data_test);
      pageModel.getTests().each(($test)=>{      
        cy.wrap($test).find('.toggle-handle').should('have.css','border-color',rgbWhite)
      });
    });

    it('Then toggle-handle background color must be white', () => {
      pageModel.load(data_test);
      pageModel.getTests().each(($test)=>{      
        cy.wrap($test).find('.toggle-handle').should('have.css','background-color',rgbWhite)
      });
    });
  });
});