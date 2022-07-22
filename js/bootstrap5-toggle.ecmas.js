/* Copyright Notice
 * bootstrap5-toggle v4.2.0
 * https://palcarazm.github.io/bootstrap5-toggle/
 * @author 2011-2014 Min Hur (https://github.com/minhur)
 * @author 2018-2019 Brent Ely (https://github.com/gitbrent)
 * @author 2022 Pablo Alcaraz Martínez (https://github.com/palcarazm)
 * @license MIT
 * @see https://github.com/palcarazm/bootstrap5-toggle/blob/master/LICENSE
 */


'use strict';

(function() {
	/**
	 * `Toggle` is instantiated for each toggle-button
	 */
	class Toggle {
		constructor(element, options) {
			const DEFAULTS = {
				on: 'On',
				onstyle: 'primary',
				onvalue: null,
				off: 'Off',
				offstyle: 'secondary',
				offvalue: null,
				size: '',
				style: '',
				width: null,
				height: null,
				tabindex: 0,
				tristate: false,
				name: null
			};
			options = options || {};

			// A: Capture ref to HMTL element
			this.element = element;

			// B: Set options
			this.options = {
				on: this.element.getAttribute('data-on') || options.on || DEFAULTS.on,
				onstyle: this.element.getAttribute('data-onstyle') || options.onstyle || DEFAULTS.onstyle,
				onvalue: this.element.getAttribute('value') || this.element.getAttribute('data-onvalue') || options.onvalue || DEFAULTS.onvalue,
				off: this.element.getAttribute('data-off') || options.off || DEFAULTS.off,
				offstyle: this.element.getAttribute('data-offstyle') || options.offstyle || DEFAULTS.offstyle,
				offvalue: this.element.getAttribute('data-offvalue') || options.offvalue || DEFAULTS.offvalue,
				size: this.element.getAttribute('data-size') || options.size || DEFAULTS.size,
				style: this.element.getAttribute('data-style') || options.style || DEFAULTS.style,
				width: this.element.getAttribute('data-width') || options.width || DEFAULTS.width,
				height: this.element.getAttribute('data-height') || options.height || DEFAULTS.height,
				tabindex: this.element.getAttribute('tabindex') || options.tabindex || DEFAULTS.tabindex,
				tristate: this.element.hasAttribute('tristate') || options.tristate || DEFAULTS.tristate,
				name: this.element.getAttribute('name') || options.name || DEFAULTS.name,
			};

			// LAST: Render Toggle
			this.render();
		}
		render() {
			function calcH(el) {
				const styles = window.getComputedStyle(el);
				const height = el.offsetHeight;
				const borderTopWidth = parseFloat(styles.borderTopWidth);
				const borderBottomWidth = parseFloat(styles.borderBottomWidth);
				const paddingTop = parseFloat(styles.paddingTop);
				const paddingBottom = parseFloat(styles.paddingBottom);

				return height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom;
			}
			// 0: Parse size
			let size;
			switch (this.options.size ) {
				case 'large':
				case 'lg':
					size = 'btn-lg';
					break;
				case 'small':
				case 'sm':
					size = 'btn-sm';
					break;
				case 'mini':
				case 'xs':
					size = 'btn-xs';
					break;
				default:
					size = ''
					break;
			}

			// 1: On
			let ecmasToggleOn = document.createElement('label');
			ecmasToggleOn.setAttribute('class', 'btn btn-' + this.options.onstyle + ' ' + size);
			ecmasToggleOn.setAttribute('for', this.element.id);
			ecmasToggleOn.innerHTML = this.options.on;

			// 2: Off
			let ecmasToggleOff = document.createElement('label');
			ecmasToggleOff.setAttribute('class', 'btn btn-' + this.options.offstyle + ' ' + size);
			ecmasToggleOff.setAttribute('for', this.element.id);
			ecmasToggleOff.innerHTML = this.options.off;

			// 3: Handle
			let ecmasToggleHandle = document.createElement('span');
			ecmasToggleHandle.setAttribute('class', 'toggle-handle btn ' + size);

			// 4: Toggle Group
			let ecmasToggleGroup = document.createElement('div');
			ecmasToggleGroup.setAttribute('class', 'toggle-group');
			ecmasToggleGroup.appendChild(ecmasToggleOn);
			ecmasToggleGroup.appendChild(ecmasToggleOff);
			ecmasToggleGroup.appendChild(ecmasToggleHandle);

			// 5: Toggle
			let ecmasToggle = document.createElement('div');
			ecmasToggle.setAttribute('class', 'toggle btn');
			ecmasToggle.classList.add(this.element.checked ? 'btn-' + this.options.onstyle : 'btn-' + this.options.offstyle);
			ecmasToggle.setAttribute('tabindex',this.options.tabindex);
			if (!this.element.checked) ecmasToggle.classList.add('off');
			if (this.options.size) ecmasToggle.classList.add(size);
			if (this.options.style) {
				(this.options.style).split(' ').forEach((style)=>{
					ecmasToggle.classList.add(style);
				});
			}
			if (this.element.disabled || this.element.readOnly){
				ecmasToggle.classList.add('disabled');
				ecmasToggle.setAttribute('disabled', 'disabled');
			}

			// 6: Set form values
		if(this.options.onvalue) this.element.setAttribute('value', this.options.onvalue);
		let invElement = null;
		if(this.options.offvalue){
			invElement = this.element.cloneNode();
			invElement.setAttribute('value',this.options.offvalue);
			invElement.setAttribute('data-toggle', 'invert-toggle');
			invElement.removeAttribute('id');
			invElement.checked = !this.element.checked;
		}

			// 7: Replace HTML checkbox with Toggle-Button
			this.element.parentElement.insertBefore(ecmasToggle, this.element);
			ecmasToggle.appendChild(this.element);
			if(invElement) ecmasToggle.appendChild(invElement);
			ecmasToggle.appendChild(ecmasToggleGroup);

			// 8: Set button W/H, lineHeight
			{
				// A: Set style W/H
				// NOTE: `offsetWidth` returns *rounded* integer values, so use `getBoundingClientRect` instead.
				ecmasToggle.style.width =
					(this.options.width ||
						Math.max(ecmasToggleOn.getBoundingClientRect().width, ecmasToggleOff.getBoundingClientRect().width) + ecmasToggleHandle.getBoundingClientRect().width / 2) + 'px';
				ecmasToggle.style.height = (this.options.height || Math.max(ecmasToggleOn.getBoundingClientRect().height, ecmasToggleOff.getBoundingClientRect().height)) + 'px';

				// B: Apply on/off class
				ecmasToggleOn.classList.add('toggle-on');
				ecmasToggleOff.classList.add('toggle-off');

				// C: Finally, set lineHeight if needed
				if (this.options.height) {
					ecmasToggleOn.style.lineHeight = calcH(ecmasToggleOn) + 'px';
					ecmasToggleOff.style.lineHeight = calcH(ecmasToggleOff) + 'px';
				}
			}

			// 9: Add listeners
			ecmasToggle.addEventListener('touchstart', (e)=>{
				this.#toggleActionPerformed(e)
			});
			ecmasToggle.addEventListener('click', (e)=>{
				this.#toggleActionPerformed(e)
			});
			ecmasToggle.addEventListener('keypress', (e)=>{
				if(e.key == " "){
					this.#toggleActionPerformed(e)
				}
			});

			// 10: Set elements to bootstrap object
			this.ecmasToggle = ecmasToggle;
			this.invElement = invElement;

			// 11: Keep reference to this instance for subsequent calls via `getElementById().bootstrapToggle()`
			this.element.bsToggle = this;
		}

		/**
	 * Trigger actions
	 * @param {Event} e event
	 */
	#toggleActionPerformed(e){
		if(this.options.tristate){
			if(this.ecmasToggle.classList.contains('indeterminate')){
				this.determinate(true);
				this.toggle();
			}else{
				this.indeterminate();
			}
		}else{
			this.toggle()
		}
		e.preventDefault()
	}

		toggle(silent = false) {
			if (this.element.checked) this.off(silent);
			else this.on(silent);
		}

		on(silent = false) {
			if (this.element.disabled || this.element.readOnly) return false;
			this.ecmasToggle.classList.remove('btn-' + this.options.offstyle);
			this.ecmasToggle.classList.add('btn-' + this.options.onstyle);
			this.ecmasToggle.classList.remove('off');
			this.element.checked = true;
			if(this.invElement) this.invElement.checked = false;
			if (!silent) this.trigger();
		}

		off(silent = false) {
			if (this.element.disabled || this.element.readOnly) return false;
			this.ecmasToggle.classList.remove('btn-' + this.options.onstyle);
			this.ecmasToggle.classList.add('btn-' + this.options.offstyle);
			this.ecmasToggle.classList.add('off');
			this.element.checked = false;
			if(this.invElement) this.invElement.checked = true;
			if (!silent) this.trigger();
		}

		indeterminate(silent = false) {
			if (!this.options.tristate || this.element.disabled || this.element.readOnly) return false;
			this.ecmasToggle.classList.add('indeterminate');
			this.element.indeterminate = true;
			this.element.removeAttribute('name');
			if(this.invElement) this.invElement.indeterminate = true;
			if(this.invElement) this.invElement.removeAttribute('name');
			if (!silent) this.trigger()
		}

		determinate(silent = false) {
			if (!this.options.tristate || this.element.disabled || this.element.readOnly) return false;
			this.ecmasToggle.classList.remove('indeterminate');
			this.element.indeterminate = false;
			if(this.options.name) this.element.setAttribute('name', this.options.name);
			if(this.invElement) this.invElement.indeterminate = false;
			if(this.invElement && this.options.name) this.invElement.setAttribute('name', this.options.name);
			if (!silent) this.trigger()
		}

		enable() {
			this.ecmasToggle.classList.remove('disabled');
			this.ecmasToggle.removeAttribute('disabled');
			this.element.removeAttribute('disabled');
			this.element.removeAttribute('readonly');
			if(this.invElement) {
				this.invElement.removeAttribute('disabled');
				this.invElement.removeAttribute('readonly');
			}
		}

		disable() {
			this.ecmasToggle.classList.add('disabled');
			this.ecmasToggle.setAttribute('disabled', '');
			this.element.setAttribute('disabled', '');
			this.element.removeAttribute('readonly');
			if(this.invElement) {
				this.invElement.setAttribute('disabled', '');
				this.invElement.removeAttribute('readonly');
			}
		}

		readonly() {
			this.ecmasToggle.classList.add('disabled');
			this.ecmasToggle.setAttribute('disabled', '');
			this.element.removeAttribute('disabled');
			this.element.setAttribute('readonly', '');
			if(this.invElement) {
				this.invElement.removeAttribute('disabled');
				this.invElement.setAttribute('readonly', '');
			}
		}

		update(silent) {
			if (this.element.disabled) this.disable();
			else if (this.element.readOnly) this.readonly();
			else this.enable();
			if (this.element.checked) this.on(silent);
			else this.off(silent);
		}

		trigger(silent) {
			if (!silent) this.element.dispatchEvent(new Event('change', { bubbles: true }));
		}

		destroy() {
			// A: Remove button-group from UI, replace checkbox element
			this.ecmasToggle.parentNode.insertBefore(this.element, this.ecmasToggle);
			this.ecmasToggle.parentNode.removeChild(this.ecmasToggle);

			// B: Delete internal refs
			delete this.element.bsToggle;
			delete this.ecmasToggle;
		}
	}

	/**
	 * Add `bootstrapToggle` prototype function to HTML Elements
	 * Enables execution when used with HTML - ex: `document.getElementById('toggle').bootstrapToggle('on')`
	 */
	Element.prototype.bootstrapToggle = function(options, silent) {
		let _bsToggle = this.bsToggle || new Toggle(this, options);

		// Execute method calls
		if (options && typeof options === 'string') {
			if (options.toLowerCase() == 'toggle') _bsToggle.toggle(silent);
			else if (options.toLowerCase() == 'on') _bsToggle.on(silent);
			else if (options.toLowerCase() == 'off') _bsToggle.off(silent);
			else if (options.toLowerCase() == 'indeterminate') _bsToggle.indeterminate(silent);
			else if (options.toLowerCase() == 'determinate') _bsToggle.determinate(silent);
			else if (options.toLowerCase() == 'enable') _bsToggle.enable();
			else if (options.toLowerCase() == 'disable') _bsToggle.disable();
			else if (options.toLowerCase() == 'readonly') _bsToggle.readonly();
			else if (options.toLowerCase() == 'destroy') _bsToggle.destroy();
		}
	};

	/**
	 * Replace all `input[type=checkbox][data-toggle="toggle"]` inputs with "Bootstrap-Toggle"
	 * Executes once page elements have rendered enabling script to be placed in `<head>`
	 */
	if (typeof window !== 'undefined')
		window.onload = function() {
			document.querySelectorAll('input[type=checkbox][data-toggle="toggle"]').forEach(function(ele) {
				ele.bootstrapToggle();
			});
		};

	// Export library if possible
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = Toggle;
	}
})();