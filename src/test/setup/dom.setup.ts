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

/**
 * Mock requestAnimationFrame and cancelAnimationFrame
 */
let originalRAF: typeof requestAnimationFrame;
let originalCancelRAF: typeof cancelAnimationFrame;

beforeEach(() => {
    originalRAF = globalThis.requestAnimationFrame;
    originalCancelRAF = globalThis.cancelAnimationFrame;
    (globalThis as any).__dom_cancelRAF = jest.fn();

    jest.spyOn(globalThis, "requestAnimationFrame").mockImplementation(
        (callback: FrameRequestCallback) => {
            callback(performance.now());
            return 0;
        }
    );
    
    jest.spyOn(globalThis, "cancelAnimationFrame").mockImplementation(
        (globalThis as any).__dom_cancelRAF
    );
});

afterEach(() => {
    globalThis.requestAnimationFrame = originalRAF;
    globalThis.cancelAnimationFrame = originalCancelRAF;
});