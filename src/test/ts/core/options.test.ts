import { OptionResolver } from "../../../main/ts/core/options";

describe("OptionResolver", () => {
  let element: Partial<HTMLInputElement>;

  beforeEach(() => {
    element = {
      getAttribute: jest.fn(),
      hasAttribute: jest.fn().mockReturnValue(false),
    };
    jest.clearAllMocks();
    jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  it("resolves default options when no attributes or user options are provided", () => {
    const options = OptionResolver.resolve(element as HTMLInputElement, {});
    expect(options.onlabel).toBe("On");
    expect(options.offlabel).toBe("Off");
    expect(options.onstyle).toBe("primary");
    expect(options.offstyle).toBe("secondary");
  });

  it("resolves user options if provided", () => {
    const options = OptionResolver.resolve(element as HTMLInputElement, {
      onlabel: "Yes",
      offlabel: "No",
      onstyle: "success",
      offstyle: "danger",
    });
    expect(options.onlabel).toBe("Yes");
    expect(options.offlabel).toBe("No");
    expect(options.onstyle).toBe("success");
    expect(options.offstyle).toBe("danger");
  });

  it("resolves attributes from element if provided", () => {
    (element.getAttribute as jest.Mock).mockImplementation((attr) => {
      if (attr === "data-onlabel") return "Start";
      if (attr === "data-offlabel") return "Stop";
      return null;
    });

    const options = OptionResolver.resolve(element as HTMLInputElement, {});
    expect(options.onlabel).toBe("Start");
    expect(options.offlabel).toBe("Stop");
  });

  it("handles deprecated options via data attributes", () => {
    (element.getAttribute as jest.Mock).mockImplementation((attr) => {
      if (attr === "data-on") return "DeprecatedOn";
      if (attr === "data-off") return "DeprecatedOff";
      return null;
    });

    const options = OptionResolver.resolve(element as HTMLInputElement, {});

    expect(options.onlabel).toBe("DeprecatedOn");
    expect(options.offlabel).toBe("DeprecatedOff");
    expect(console.warn).toHaveBeenCalledTimes(2);
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("data-on attribute is deprecated")
    );
  });

  it("falls back to userOptions if deprecated attribute not set", () => {
    (element.getAttribute as jest.Mock).mockReturnValue(null);

    const options = OptionResolver.resolve(element as HTMLInputElement, {
      on: "UserOn",
      off: "UserOff",
    });

    expect(options.onlabel).toBe("UserOn");
    expect(options.offlabel).toBe("UserOff");
  });
});
