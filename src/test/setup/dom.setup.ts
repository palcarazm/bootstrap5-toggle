/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Setup HTML layout measurements for testing environment.
 */
function defineOffsetProperties(width: number, height: number) {
    Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
        configurable: true,
        get() {
            return width;
        },
    });

    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
        configurable: true,
        get() {
            return height;
        },
    });
}
(globalThis as any).__dom_setup_setVisible = () => defineOffsetProperties(100, 30);
(globalThis as any).__dom_setup_setHidden = () => defineOffsetProperties(0, 0);

beforeEach(() => {
    (globalThis as any).__dom_setup_setVisible();
});

/**
 * Mock ResizeObserver for testing purposes.
 */
let resizeCallback: ResizeObserverCallback;
class ResizeObserverMock {
    constructor(cb: ResizeObserverCallback) {
        resizeCallback = cb;
    }
    observe() {
        // Mock method: no-op
        void 0;
    }
    unobserve() {
        // Mock method: no-op
        void 0;
    }
    disconnect() {
        // Mock method: no-op
        void 0;
    }
}
(globalThis as any).ResizeObserver = ResizeObserverMock;

(globalThis as any).__dom_setup_triggerResize = (
    width = 100,
    height = 30
) => {
    resizeCallback(
        [
      {
          contentRect: { width, height },
      } as ResizeObserverEntry,
        ],
    {} as ResizeObserver
    );
};