import PageModel from "../support/pagemodel";
const pageModel = new PageModel();

describe("Size feature", () => {
  context("When data-size attribute is set", () => {
    const data_test = 'size';
    it("Then toggle height must be equal to button height with this size", () => {
      pageModel.load(data_test);
      pageModel.getTests().each(($test) => {
        pageModel.assertComputedStyleProperty(
          $test,
          "button",
          ".toggle",
          "height"
        );
      });
    });

    it("Then toggle height must be equal to select height with this size", () => {
      pageModel.load(data_test);
      pageModel.getTests().each(($test) => {
        pageModel.assertComputedStyleProperty(
          $test,
          "select",
          ".toggle",
          "height"
        );
      });
    });

    it("Then toggle height must be equal to input height with this size", () => {
      pageModel.load(data_test);
      pageModel.getTests().each(($test) => {
        pageModel.assertComputedStyleProperty(
          $test,
          'input[type="text"]',
          ".toggle",
          "height"
        );
      });
    });
  });
});
