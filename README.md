[![GitHub license](https://img.shields.io/github/license/palcarazm/bootstrap5-toggle.svg)](https://github.com/palcarazm/bootstrap5-toggle/blob/master/LICENSE)
[![Latest release](https://img.shields.io/github/package-json/v/palcarazm/bootstrap5-toggle/master)](https://github.com/palcarazm/bootstrap5-toggle/releases)
[![JSDelivr Badge](https://img.shields.io/jsdelivr/npm/hm/bootstrap5-toggle?color=success&label=hits&logo=jsdelivr&logoColor=white)](https://www.jsdelivr.com/package/npm/bootstrap5-toggle)
[![NPM Badge](https://img.shields.io/npm/dm/bootstrap5-toggle?logo=npm&color=success)](https://www.npmjs.com/package/bootstrap5-toggle)
[![Build](https://img.shields.io/github/workflow/status/palcarazm/bootstrap5-toggle/Build%20Check?logo=npm)](https://github.com/palcarazm/bootstrap5-toggle/actions?query=workflow%3A%22Build+Check%22)
[![Test](https://img.shields.io/github/workflow/status/palcarazm/bootstrap5-toggle/Cypress%20Tests?label=tests&logo=cypress)](https://github.com/palcarazm/bootstrap5-toggle/actions?query=workflow%3A%22Cypress+Tests%22)
[![Maintenance](https://img.shields.io/badge/maintained%3F-yes-success.svg)](https://github.com/palcarazm/bootstrap5-toggle/graphs/contributors)
[![Funding](https://img.shields.io/badge/sponsor-30363D?style=flat&logo=GitHub-Sponsors&logoColor=#white)](https://github.com/sponsors/palcarazm)
[![Rate this package](https://badges.openbase.com/js/rating/bootstrap5-toggle.svg?token=rNvznTVToo+EmX5g+KTvfYqI9+YTWJeUWTxPj7tLA6o=)](https://openbase.com/js/bootstrap5-toggle?utm_source=embedded&utm_medium=badge&utm_campaign=rating-badge&utm_term=js/bootstrap5-toggle)

# Bootstrap 5 Toggle

**Bootstrap 5 Toggle** is a bootstrap plugin/widget that converts checkboxes into toggles.

***

#### Library Distributions
Branch | Bootstrap Support | Last Release
---|---|---
[bootstrap5-toggle](https://github.com/palcarazm/bootstrap5-toggle)                        | [![Bootstrap 5](https://img.shields.io/static/v1?label=bootstrap&message=v5.X.X&color=informational&logo=bootstrap&logoColor=white)](https://getbootstrap.com/docs/5.0) | [![Latest release](https://img.shields.io/github/package-json/v/palcarazm/bootstrap5-toggle/master)](https://github.com/palcarazm/bootstrap5-toggle/releases)
[bootstrap5-toggle v3.X.X](https://github.com/palcarazm/bootstrap5-toggle/tree/v3.X.X)     | [![Bootstrap 4](https://img.shields.io/static/v1?label=bootstrap&message=v4.X.X&color=informational&logo=bootstrap&logoColor=white)](https://getbootstrap.com/docs/4.0) | [![Latest release](https://img.shields.io/github/package-json/v/palcarazm/bootstrap5-toggle/v3.X.X)](https://github.com/palcarazm/bootstrap5-toggle/releases)
# Demos
**Demos and API Docs:** https://palcarazm.github.io/bootstrap5-toggle/  

![Demo GIF](img/bootstrap5-toggle-demo.gif)

<!-- To update TOC run .\node_modules\.bin\doctoc README.md --github -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Installation](#installation)
  - [CDN](#cdn)
    - [jQuery Interface](#jquery-interface)
    - [ECMAS Interface](#ecmas-interface)
  - [Download](#download)
  - [NPM](#npm)
  - [Yarn](#yarn)
- [Usage](#usage)
  - [Initialize With HTML](#initialize-with-html)
  - [Initialize With Code](#initialize-with-code)
- [API](#api)
  - [Options](#options)
  - [Methods](#methods)
- [Events](#events)
  - [Event Propagation](#event-propagation)
  - [Stopping Event Propagation](#stopping-event-propagation)
  - [API vs Input](#api-vs-input)
- [Collaborators welcom!](#collaborators-welcom)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

**************************************************************************************************

# Installation

## CDN
[![JSDelivr Badge](https://img.shields.io/jsdelivr/npm/hm/bootstrap5-toggle?color=success&label=hits&logo=jsdelivr&logoColor=white)](https://www.jsdelivr.com/package/npm/bootstrap5-toggle)
### jQuery Interface
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap5-toggle@4.3.1/css/bootstrap5-toggle.min.css" rel="stylesheet">  
<script src="https://cdn.jsdelivr.net/npm/bootstrap5-toggle@4.3.1/js/bootstrap5-toggle.min.js"></script>
```

### ECMAS Interface
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap5-toggle@4.3.1/css/bootstrap5-toggle.min.css" rel="stylesheet">  
<script src="https://cdn.jsdelivr.net/npm/bootstrap5-toggle@4.3.1/js/bootstrap5-toggle.ecmas.min.js"></script>
```

## Download
[![Latest release](https://img.shields.io/github/package-json/v/palcarazm/bootstrap5-toggle/master)](https://github.com/palcarazm/bootstrap5-toggle/releases)

## NPM
[![NPM Badge](https://img.shields.io/npm/dm/bootstrap5-toggle?logo=npm&color=success)](https://www.npmjs.com/package/bootstrap5-toggle)
```ksh
npm install bootstrap5-toggle
```

## Yarn
```ksh
yarn add bootstrap5-toggle
```

# Usage

## Initialize With HTML
Simply add `data-toggle="toggle"` to automatically convert a plain checkbox into a bootstrap 5 toggle.

```html
<input id="chkToggle" type="checkbox" data-toggle="toggle">
```

## Initialize With Code
Toggles can also be initialized via JavaScript code.  

EX: Initialize id `chkToggle` with a single line of JavaScript.
```html
<input id="chkToggle" type="checkbox" checked>
<script>
  $(function(){
    $('#chkToggle').bootstrapToggle();
  });
</script>
```

# API

## Options
* Options can be passed via data attributes or JavaScript
* For data attributes, append the option name to `data-` (ex: `data-on="Enabled"`)

```html
<input type="checkbox" data-toggle="toggle" data-on="Enabled" data-off="Disabled">
<input type="checkbox" id="toggle-two">
<script>
  $(function() {
    $('#toggle-two').bootstrapToggle({
      on: 'Enabled',
      off: 'Disabled'
    });
  })
</script>
```

Name      |Type       |Default     |Description                 |
----------|-----------|-----------|----------------------------|
`on`      |string/html|"On"       |Text of the on toggle
`off`     |string/html|"Off"      |Text of the off toggle
`size`    |string     |"normal"   |Size of the toggle. Possible values are: `large`, `normal`, `small`, `mini`.
`onstyle` |string     |"primary"  |Style of the on toggle. Possible values are: `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark` and with `outline-` prefix
`offstyle`|string     |"secondary"|Style of the off toggle. Possible values are: `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark` and with `outline-` prefix
`onvalue` |string     |*null*     |Sets on state value
`offvalue`|string     |*null*     |Sets off state value
`style`   |string     |           |Appends the value to the class attribute of the toggle. This can be used to apply custom styles. Refer to Custom Styles for reference.
`width`   |integer    |*null*     |Sets the width of the toggle. if set to *null*, width will be auto-calculated.
`height`  |integer    |*null*     |Sets the height of the toggle. if set to *null*, height will be auto-calculated.
`tabindex`|integer    |0          |Sets the tabindex of the toggle.
`tristate`|boolean    |false      |Sets tristate support

## Methods
Methods can be used to control toggles directly.

```html
<input id="toggle-demo" type="checkbox" data-toggle="toggle">
```

Method       |Example                                              |Description
-------------|-----------------------------------------------------|------------------------------------------
initialize   | `$('#toggle-demo').bootstrapToggle()`               |Initializes the toggle plugin with options
destroy      | `$('#toggle-demo').bootstrapToggle('destroy')`      |Destroys the toggle
on           | `$('#toggle-demo').bootstrapToggle('on')`           |Sets the toggle to 'On' state
off          | `$('#toggle-demo').bootstrapToggle('off')`          |Sets the toggle to 'Off' state
toggle       | `$('#toggle-demo').bootstrapToggle('toggle')`       |Toggles the state of the toggle on/off
enable       | `$('#toggle-demo').bootstrapToggle('enable')`       |Enables the toggle
disable      | `$('#toggle-demo').bootstrapToggle('disable')`      |Disables the toggle
readonly     | `$('#toggle-demo').bootstrapToggle('readonly')`     |Disables the toggle but preserve checkbox enabled
indeterminate| `$('#toggle-demo').bootstrapToggle('indeterminate')`|Sets the toggle to 'indeterminate' state
determinate  | `$('#toggle-demo').bootstrapToggle('determinate')`  |Sets the toggle to 'determinate' state

# Events

## Event Propagation
Note All events are propagated to and from input element to the toggle.

You should listen to events from the `<input type="checkbox">` directly rather than look for custom events.

```html
<input id="toggle-event" type="checkbox" data-toggle="toggle">
<div id="console-event"></div>
<script>
  $(function() {
    $('#toggle-event').change(function() {
      $('#console-event').html('Toggle: ' + $(this).prop('checked'))
    })
  })
</script>
```

## Stopping Event Propagation
Passing `true` to the on, off, toggle, determinate and indeterminate methods will enable the silent option to prevent the control from propagating the change event in cases where you want to update the controls on/off state, but do not want to fire the onChange event.

```html
<input id="toggle-silent" type="checkbox" data-toggle="toggle">
<button class="btn btn-success" onclick="toggleApiOnSilent()" >On by API (silent)</button>
<button class="btn btn-success" onclick="toggleApiOffSilent()">Off by API (silent)</button>
<button class="btn btn-warning" onclick="toggleApiOnNotSilent()">On by API (not silent)</button>
<button class="btn btn-warning" onclick="toggleApiOffNotSilent()">On by API (not silent)</button>
<script>
  function toggleApiOnSilent() {
    $('#toggle-silent').bootstrapToggle('on', true);
  }
  function toggleApiOffSilent() {
    $('#toggle-silent').bootstrapToggle('off', true);
  }
  function toggleApiOnNotSilent() {
    $('#toggle-silent').bootstrapToggle('on');
  }
  function toggleApiOffNotSilent() {
    $('#toggle-silent').bootstrapToggle('off');
  }
</script>
```

## API vs Input
This also means that using the API or Input to trigger events will work both ways.

```html
<input id="toggle-trigger" type="checkbox" data-toggle="toggle">
<button class="btn btn-success" onclick="toggleApiOn()" >On by API</button>
<button class="btn btn-danger"  onclick="toggleApiOff()">Off by API</button>
<button class="btn btn-success" onclick="toggleInpOn()" >On by Input</button>
<button class="btn btn-danger"  onclick="toggleInpOff()">Off by Input</button>
<script>
  function toggleApiOn() {
    $('#toggle-trigger').bootstrapToggle('on')
  }
  function toggleApiOff() {
    $('#toggle-trigger').bootstrapToggle('off')  
  }
  function toggleInpOn() {
    $('#toggle-trigger').prop('checked', true).change()
  }
  function toggleInpOff() {
    $('#toggle-trigger').prop('checked', false).change()
  }
</script>
```
# Collaborators welcom!
- :sos: ¿Do you need some help? Open a issue in [GitHub help wanted](https://github.com/palcarazm/bootstrap5-toggle/issues/new?assignees=&labels=help+wanted&template=help-wanted.md&title=%5BHELP%5D)
 - :bug: ¿Do you find a bug? Open a issue in [GitHub bug report](https://github.com/palcarazm/bootstrap5-toggle/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBUG%5D)
 - :bulb: ¿Do you have a great idea? Open a issue in [GitHub feature request](https://github.com/palcarazm/bootstrap5-toggle/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=%5BFEATURE%5D)
 - :computer: ¿Do you know how to fix a bug? Open a pull request in [GitHub pull repuest](https://github.com/palcarazm/bootstrap5-toggle/compare).

[![GitHub Contributors](https://contrib.rocks/image?repo=palcarazm/bootstrap5-toggle)](https://github.com/palcarazm/bootstrap5-toggle/graphs/contributors)

¿Do you like the project? Give us a :star: in [GitHub](https://github.com/palcarazm/bootstrap5-toggle).
