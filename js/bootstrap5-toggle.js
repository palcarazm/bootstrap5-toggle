/* Copyright Notice
 * bootstrap5-toggle v4.2.0
 * https://palcarazm.github.io/bootstrap5-toggle/
 * @author 2011-2014 Min Hur (https://github.com/minhur)
 * @author 2018-2019 Brent Ely (https://github.com/gitbrent)
 * @author 2022 Pablo Alcaraz Martínez (https://github.com/palcarazm)
 * @license MIT
 * @see https://github.com/palcarazm/bootstrap5-toggle/blob/master/LICENSE
 */


+function ($) {
 	'use strict';

	// TOGGLE PUBLIC CLASS DEFINITION
	// ==============================

	let Toggle = function (element, options) {
		// A: Capture ref to HMTL element
		this.$element  = $(element)
		// B: Set options
		this.options   = $.extend({}, this.defaults(), options)
		// LAST: Render Toggle
		this.render()
	}

	Toggle.DEFAULTS = {
		on: 'On',
		off: 'Off',
		onstyle: 'primary',
		offstyle: 'secondary',
		size: 'normal',
		style: '',
		width: null,
		height: null
	}

	Toggle.prototype.defaults = function() {
		return {
			on: this.$element.attr('data-on') || Toggle.DEFAULTS.on,
			off: this.$element.attr('data-off') || Toggle.DEFAULTS.off,
			onstyle: this.$element.attr('data-onstyle') || Toggle.DEFAULTS.onstyle,
			offstyle: this.$element.attr('data-offstyle') || Toggle.DEFAULTS.offstyle,
			size: this.$element.attr('data-size') || Toggle.DEFAULTS.size,
			style: this.$element.attr('data-style') || Toggle.DEFAULTS.style,
			width: this.$element.attr('data-width') || Toggle.DEFAULTS.width,
			height: this.$element.attr('data-height') || Toggle.DEFAULTS.height
		}
	}

	Toggle.prototype.render = function () {
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
		let $toggleOn = $('<label for="'+ this.$element.prop('id') +'" class="btn">').html(this.options.on)
			.addClass('btn-' +this.options.onstyle + ' ' + size)
		
		// 2: Off
		let $toggleOff = $('<label for="'+ this.$element.prop('id') +'" class="btn">').html(this.options.off)
			.addClass('btn-' +this.options.offstyle + ' ' + size)
		
		// 3: Handle
		let $toggleHandle = $('<span class="toggle-handle btn">')
			.addClass(size)

		// 4: Toggle Group
		let $toggleGroup = $('<div class="toggle-group">')
			.append($toggleOn, $toggleOff, $toggleHandle)
			
		// 5: Toggle
		let $toggle = $('<div class="toggle btn" data-toggle="toggle" role="button">')
			.addClass( this.$element.prop('checked') ? 'btn-' +this.options.onstyle : 'btn-' +this.options.offstyle+' off' )
			.addClass(size).addClass(this.options.style)

		// 6: Replace HTML checkbox with Toggle-Button
		this.$element.wrap($toggle)
		$.extend(this, {
			$toggle: this.$element.parent(),
			$toggleOn: $toggleOn,
			$toggleOff: $toggleOff,
			$toggleGroup: $toggleGroup
		})
		this.$toggle.append($toggleGroup)

		// 7: Set button W/H, lineHeight
		{
			// A: Set style W/H
			let width = this.options.width || Math.max($toggleOn.outerWidth(), $toggleOff.outerWidth())+($toggleHandle.outerWidth()/2)
			let height = this.options.height || Math.max($toggleOn.outerHeight(), $toggleOff.outerHeight())
			this.$toggle.css({ width: width, height: height })

			// B: Apply on/off class
			$toggleOn.addClass('toggle-on')
			$toggleOff.addClass('toggle-off')

			// C: Finally, set lineHeight if needed
			if (this.options.height) {
				$toggleOn.css('line-height', $toggleOn.height() + 'px')
				$toggleOff.css('line-height', $toggleOff.height() + 'px')
			}
		}

		// 8: Add listeners (NOT NEEDED)
		// 9: Set toggle to bootstrap object (NOT NEEDED)
		// 10: Keep reference to this instance for subsequent calls via `getElementById().bootstrapToggle()` (NOT NEEDED)
		// 11: Fire events
		this.update(true)
		this.trigger(true)
	}

	Toggle.prototype.toggle = function (silent = false) {
		if (this.$element.prop('checked')) this.off(silent)
		else this.on(silent)
	}

	Toggle.prototype.on = function (silent = false) {
		if (this.$element.prop('disabled')) return false
		this.$toggle.removeClass('btn-' +this.options.offstyle + ' off').addClass('btn-' +this.options.onstyle)
		this.$element.prop('checked', true)
		if (!silent) this.trigger()
	}

	Toggle.prototype.off = function (silent = false) {
		if (this.$element.prop('disabled')) return false
		this.$toggle.removeClass('btn-' +this.options.onstyle).addClass('btn-' +this.options.offstyle + ' off')
		this.$element.prop('checked', false)
		if (!silent) this.trigger()
	}

	Toggle.prototype.enable = function () {
		this.$toggle.removeClass('disabled')
		this.$toggle.removeAttr('disabled')
		this.$element.prop('disabled', false)
	}

	Toggle.prototype.disable = function () {
		this.$toggle.addClass('disabled')
		this.$toggle.attr('disabled', 'disabled')
		this.$element.prop('disabled', true)
	}

	Toggle.prototype.update = function (silent) {
		if (this.$element.prop('disabled')) this.disable()
		else this.enable()
		if (this.$element.prop('checked')) this.on(silent)
		else this.off(silent)
	}

	Toggle.prototype.trigger = function (silent) {
		this.$element.off('change.bs.toggle')
		if (!silent) this.$element.change()
		this.$element.on('change.bs.toggle', $.proxy(function() {
			this.update()
		}, this))
	}

	Toggle.prototype.destroy = function() {
		// A: Remove button-group from UI, replace checkbox element
		this.$element.off('change.bs.toggle')
		this.$toggleGroup.remove()

		// B: Delete internal refs
		this.$element.removeData('bs.toggle')
		this.$element.unwrap()
	}

	// TOGGLE PLUGIN DEFINITION
	// ========================

	function Plugin(option) {
		let optArg = Array.prototype.slice.call( arguments, 1 )[0]

		return this.each(function () {
			let $this   = $(this)
			let data    = $this.data('bs.toggle')
			let options = typeof option == 'object' && option

			if (!data) {
				data = new Toggle(this, options)
				$this.data('bs.toggle', data)
			}
			if (typeof option === 'string' && data[option] && typeof optArg === 'boolean') data[option](optArg)
			else if (typeof option === 'string' && data[option]) data[option]()
			//else if (option && !data[option]) console.log('bootstrap-toggle: error: method `'+ option +'` does not exist!');
		})
	}

	let old = $.fn.bootstrapToggle

	$.fn.bootstrapToggle             = Plugin
	$.fn.bootstrapToggle.Constructor = Toggle

	// TOGGLE NO CONFLICT
	// ==================

	$.fn.toggle.noConflict = function () {
		$.fn.bootstrapToggle = old
		return this
	}

	// TOGGLE DATA-API
	// ===============

	/**
	 * Replace all `input[type=checkbox][data-toggle="toggle"]` inputs with "Bootstrap-Toggle"
	 * Executes once page elements have rendered enabling script to be placed in `<head>`
	 */
	$(document).ready(function() {
		$('input[type=checkbox][data-toggle^=toggle]').bootstrapToggle()
	})

	$(document).on('click.bs.toggle', 'div[data-toggle^=toggle]', function(e) {
		let $checkbox = $(this).find('input[type=checkbox]')
		$checkbox.bootstrapToggle('toggle')
		e.preventDefault()
	})
}(jQuery);
