/// <reference types="cypress" />
import PageModel from "../support/pagemodel"
const pageModel = new PageModel();

describe('Outline colors feature', () => {
  context('When data-onstyle attribute is set to an outline color and toogle is activated', () =>{
    const data_test = 'outline-on';
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

    it('Then toggle-handle border must have the associated color', () => {
      pageModel.load(data_test);
      pageModel.getTests().each(($test)=>{      
        pageModel.assertComputedStyleProperty($test,'button','.toggle-handle','border-color');
      });
    });

    it('Then toggle-handle background color must have the associated color', () => {
      pageModel.load(data_test);
      pageModel.getTests().each(($test)=>{      
        pageModel.assertComputedStyleProperty($test,'button','.toggle-handle','color','background-color');
      });
    });
  });

  context('When data-offstyle attribute is set to an outline color and toogle is deactivated', () =>{
    const data_test = 'outline-off';
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

    it('Then toggle-handle border color must have the associated color', () => {
      pageModel.load(data_test);
      pageModel.getTests().each(($test)=>{      
        pageModel.assertComputedStyleProperty($test,'button','.toggle-handle','border-color');
      });
    });

    it('Then toggle-handle background color must have the associated color', () => {
      pageModel.load(data_test);
      pageModel.getTests().each(($test)=>{      
        pageModel.assertComputedStyleProperty($test,'button','.toggle-handle','color','background-color');
      });
    });
  });
});