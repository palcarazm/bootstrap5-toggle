import { DOMBuilder } from "./core/DOMBuilder";
import { OptionResolver } from "./core/OptionResolver";
import { StateReducer } from "./core/StateReducer";
import { ToggleActionType } from "./core/StateReducer.types";
import { ToggleMethods } from "./core/types";
(function () {
    var Toggle = /** @class */ (function () {
        function Toggle(element, options) {
            this.element = element;
            this.options = OptionResolver.resolve(element, options);
            this.stateReducer = new StateReducer(element, this.options.tristate);
            this.domBuilder = new DOMBuilder(element, this.options, this.stateReducer.get());
            this.render();
        }
        Toggle.prototype.render = function () {
            var _this = this;
            // 9: Add listeners
            this.domBuilder.root.addEventListener("pointerdown", function (e) {
                if (_this.stateReducer.do(ToggleActionType.NEXT)) {
                    _this.domBuilder.render(_this.stateReducer.get());
                    _this.trigger();
                }
            }, { passive: true });
            this.domBuilder.root.addEventListener("keypress", function (e) {
                if (e.key == " ") {
                    if (_this.stateReducer.do(ToggleActionType.NEXT)) {
                        _this.domBuilder.render(_this.stateReducer.get());
                        _this.trigger();
                    }
                }
            }, { passive: true });
            if (this.element.id) {
                document
                    .querySelectorAll('label[for="' + this.element.id + '"]')
                    .forEach(function (label) {
                    label.addEventListener("pointerdown", function (e) {
                        e.preventDefault();
                        if (_this.stateReducer.do(ToggleActionType.NEXT)) {
                            _this.domBuilder.render(_this.stateReducer.get());
                            _this.trigger();
                        }
                        _this.domBuilder.root.focus();
                    }, { passive: true });
                });
            }
            // 12: Keep reference to this instance for subsequent calls via `getElementById().bootstrapToggle()`
            this.element.bsToggle = this;
        };
        Toggle.prototype.toggle = function (silent) {
            if (silent === void 0) { silent = false; }
            if (this.stateReducer.do(ToggleActionType.TOGGLE)) {
                this.domBuilder.render(this.stateReducer.get());
                if (!silent)
                    this.trigger();
            }
        };
        Toggle.prototype.on = function (silent) {
            if (silent === void 0) { silent = false; }
            if (this.stateReducer.do(ToggleActionType.ON)) {
                this.domBuilder.render(this.stateReducer.get());
                if (!silent)
                    this.trigger();
            }
        };
        Toggle.prototype.off = function (silent) {
            if (silent === void 0) { silent = false; }
            if (this.stateReducer.do(ToggleActionType.OFF)) {
                this.domBuilder.render(this.stateReducer.get());
                if (!silent)
                    this.trigger();
            }
        };
        Toggle.prototype.indeterminate = function (silent) {
            if (silent === void 0) { silent = false; }
            if (this.stateReducer.do(ToggleActionType.INDETERMINATE)) {
                this.domBuilder.render(this.stateReducer.get());
                if (!silent)
                    this.trigger();
            }
        };
        Toggle.prototype.determinate = function (silent) {
            if (silent === void 0) { silent = false; }
            if (this.stateReducer.do(ToggleActionType.DETERMINATE)) {
                this.domBuilder.render(this.stateReducer.get());
                if (!silent)
                    this.trigger();
            }
        };
        Toggle.prototype.enable = function () {
            if (this.stateReducer.do(ToggleActionType.ENABLE)) {
                this.domBuilder.render(this.stateReducer.get());
            }
        };
        Toggle.prototype.disable = function () {
            if (this.stateReducer.do(ToggleActionType.DISABLE)) {
                this.domBuilder.render(this.stateReducer.get());
            }
        };
        Toggle.prototype.readonly = function () {
            if (this.stateReducer.do(ToggleActionType.READONLY)) {
                this.domBuilder.render(this.stateReducer.get());
            }
        };
        Toggle.prototype.update = function (silent) {
            if (this.element.disabled)
                this.disable();
            else if (this.element.readOnly)
                this.readonly();
            else
                this.enable();
            if (this.element.checked)
                this.on(silent);
            else
                this.off(silent);
        };
        Toggle.prototype.trigger = function (silent) {
            if (silent === void 0) { silent = false; }
            if (!silent)
                this.element.dispatchEvent(new Event("change", { bubbles: true }));
        };
        Toggle.prototype.destroy = function () {
            var _a, _b;
            // A: Remove button-group from UI, replace checkbox element
            (_a = this.domBuilder.root.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(this.element, this.domBuilder.root);
            (_b = this.domBuilder.root.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(this.domBuilder.root);
            // B: Delete internal refs
            delete this.element.bsToggle;
        };
        Toggle.prototype.rerender = function () {
            this.destroy();
            this.element.bootstrapToggle();
        };
        return Toggle;
    }());
    /**
     * Add `bootstrapToggle` prototype function to HTML Elements
     * Enables execution when used with HTML - ex: `document.getElementById('toggle').bootstrapToggle('on')`
     */
    HTMLInputElement.prototype.bootstrapToggle = function (options, silent) {
        var _bsToggle = this.bsToggle || new Toggle(this, (options && typeof options !== "string") ? options : {});
        // Execute method calls
        if (options && typeof options === "string") {
            switch (options) {
                case ToggleMethods.TOGGLE:
                case ToggleMethods.toggle:
                    return _bsToggle.toggle(silent);
                case ToggleMethods.ON:
                case ToggleMethods.on:
                    return _bsToggle.on(silent);
                case ToggleMethods.OFF:
                case ToggleMethods.off:
                    return _bsToggle.off(silent);
                case ToggleMethods.INDETERMINATE:
                case ToggleMethods.indeterminate:
                    return _bsToggle.indeterminate(silent);
                case ToggleMethods.DETERMINATE:
                case ToggleMethods.determinate:
                    return _bsToggle.determinate(silent);
                case ToggleMethods.ENABLE:
                case ToggleMethods.enable:
                    return _bsToggle.enable();
                case ToggleMethods.DISABLE:
                case ToggleMethods.disable:
                    return _bsToggle.disable();
                case ToggleMethods.READONLY:
                case ToggleMethods.readonly:
                    return _bsToggle.readonly();
                case ToggleMethods.DESTROY:
                case ToggleMethods.destroy:
                    return _bsToggle.destroy();
                case ToggleMethods.RENDERER:
                case ToggleMethods.rerender:
                    return _bsToggle.rerender();
            }
        }
    };
    /**
     * Replace all `input[type=checkbox][data-toggle="toggle"]` inputs with "Bootstrap-Toggle"
     * Executes once page elements have rendered enabling script to be placed in `<head>`
     */
    if (typeof window !== "undefined")
        window.onload = function () {
            document
                .querySelectorAll('input[type=checkbox][data-toggle="toggle"]')
                .forEach(function (ele) {
                ele.bootstrapToggle();
            });
        };
    // Export library if possible
    if (typeof module !== "undefined" && module.exports) {
        module.exports = Toggle;
    }
})();
