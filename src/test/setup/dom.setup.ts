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
(global as any).__dom_setup_setVisible = () => defineOffsetProperties(100, 30);
(global as any).__dom_setup_setHidden = () => defineOffsetProperties(0, 0);

beforeEach(() => {
  (global as any).__dom_setup_setVisible();
});

/**
 * Mock ResizeObserver for testing purposes.
 */
let resizeCallback: ResizeObserverCallback;
class ResizeObserverMock {
  constructor(cb: ResizeObserverCallback) {
    resizeCallback = cb;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}
(global as any).ResizeObserver = ResizeObserverMock;

(global as any).__dom_setup_triggerResize = (
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