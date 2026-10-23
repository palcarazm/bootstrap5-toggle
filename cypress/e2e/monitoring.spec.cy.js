/// <reference types="cypress" />
import PageModel from "../support/pagemodel";

describe("Developer Tools: Monitoring", () => {
    context("Given ECMAS bootstrap toggle interface", () => {
        testCase("ecmas");
    });
    context("Given jQuery bootstrap toggle interface", () => {
        testCase("jquery");
    });
});

function testCase(bstInterface) {
    const data_test = "api-methods";

    beforeEach(() => {
        PageModel.load(bstInterface, data_test);
    });

    afterEach(() => {
        cy.window().then((win) => {
            try {
                win.BootstrapToggle.MONITOR.stop();
            } catch {
                // ignore: monitor may already be stopped
            }
        });
    });

    it("MONITOR is exposed and starts stopped", () => {
        cy.window().then((win) => {
            expect(win.BootstrapToggle.MONITOR).to.exist;
            expect(win.BootstrapToggle.MONITOR.getLevel()).to.be.undefined;
        });
    });

    it("start('DEBUG') produces a console.debug line per fired domain event", () => {
        cy.window().then((win) => {
            win.BootstrapToggle.MONITOR.start("DEBUG");
        });

        cy.get("@consoleDebug").should("not.have.been.called");

        PageModel.getTests().each(($test) => {
            cy.wrap($test).find('button[data-method="initialize"]').click();
            cy.wrap($test).find('button[data-method="on"]').click();
        });

        cy.get("@consoleDebug").should("have.been.called");
        cy.get("@consoleDebug").should((stub) => {
            const calls = stub.getCalls().map((c) => c.args[0]);
            expect(calls.some((msg) => /\[toggle:DEBUG\] on/.test(msg))).to.be
                .true;
        });
    });

    it("setLevel('INFO') stops domain-event logging but keeps lifecycle logging", () => {
        cy.window().then((win) => {
            win.BootstrapToggle.MONITOR.start("DEBUG");
            win.BootstrapToggle.MONITOR.setLevel("INFO");
        });

        cy.get("@consoleDebug").invoke("resetHistory");

        PageModel.getTests().each(($test) => {
            cy.wrap($test).find('button[data-method="initialize"]').click();
            cy.wrap($test).find('button[data-method="on"]').click();
            cy.wrap($test).find('button[data-method="destroy"]').click();
        });

        cy.get("@consoleDebug").should("not.have.been.called");
    });

    it("stop() produces no new log lines on subsequent clicks", () => {
        cy.window().then((win) => {
            win.BootstrapToggle.MONITOR.start("DEBUG");
            win.BootstrapToggle.MONITOR.stop();
        });

        cy.get("@consoleDebug").invoke("resetHistory");

        PageModel.getTests().each(($test) => {
            cy.wrap($test).find('button[data-method="initialize"]').click();
            cy.wrap($test).find('button[data-method="on"]').click();
        });

        cy.get("@consoleDebug").should("not.have.been.called");
    });

    it("start('DEBUG') after stop() restores logging", () => {
        cy.window().then((win) => {
            win.BootstrapToggle.MONITOR.start("DEBUG");
            win.BootstrapToggle.MONITOR.stop();
        });

        cy.get("@consoleDebug").invoke("resetHistory");

        cy.window().then((win) => {
            win.BootstrapToggle.MONITOR.start("DEBUG");
        });

        PageModel.getTests().each(($test) => {
            cy.wrap($test).find('button[data-method="initialize"]').click();
            cy.wrap($test).find('button[data-method="on"]').click();
        });

        cy.get("@consoleDebug").should("have.been.called");
    });

    it("getLevel() reports the current level and undefined when stopped", () => {
        cy.window().then((win) => {
            expect(win.BootstrapToggle.MONITOR.getLevel()).to.be.undefined;

            win.BootstrapToggle.MONITOR.start("DEBUG");
            expect(win.BootstrapToggle.MONITOR.getLevel()).to.eq("DEBUG");

            win.BootstrapToggle.MONITOR.setLevel("INFO");
            expect(win.BootstrapToggle.MONITOR.getLevel()).to.eq("INFO");

            win.BootstrapToggle.MONITOR.stop();
            expect(win.BootstrapToggle.MONITOR.getLevel()).to.be.undefined;
        });
    });
}
