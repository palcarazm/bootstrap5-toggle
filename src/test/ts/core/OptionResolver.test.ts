import { OptionResolver } from "../../../main/ts/core/OptionResolver";

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

    describe("width and height options", () => {
        it("resolve numeric values as pixel unit", () => {
            const options = OptionResolver.resolve(element as HTMLInputElement, {
                width: "5",
                height: "5",
            });
            expect(options.width).toBe("5px");
            expect(options.height).toBe("5px");
        });

        it("support px unit", () => {
            const options = OptionResolver.resolve(element as HTMLInputElement, {
                width: "5px",
                height: "5px",
            });
            expect(options.width).toBe("5px");
            expect(options.height).toBe("5px");
        });

        it("support rem unit", () => {
            const options = OptionResolver.resolve(element as HTMLInputElement, {
                width: "5rem",
                height: "5rem",
            });
            expect(options.width).toBe("5rem");
            expect(options.height).toBe("5rem");
        });

        it("support em unit", () => {
            const options = OptionResolver.resolve(element as HTMLInputElement, {
                width: "5em",
                height: "5em",
            });
            expect(options.width).toBe("5em");
            expect(options.height).toBe("5em");
        });

        it("support % unit", () => {
            const options = OptionResolver.resolve(element as HTMLInputElement, {
                width: "50%",
                height: "50%",
            });
            expect(options.width).toBe("50%");
            expect(options.height).toBe("50%");
        });

        it("support viewport unit", () => {
            const options = OptionResolver.resolve(element as HTMLInputElement, {
                width: "5vw",
                height: "5vh",
            });
            expect(options.width).toBe("5vw");
            expect(options.height).toBe("5vh");
        });

        it("support auto", () => {
            const options = OptionResolver.resolve(element as HTMLInputElement, {
                width: "auto",
                height: "auto",
            });
            expect(options.width).toBe("auto");
            expect(options.height).toBe("auto");
        });
    });
});
