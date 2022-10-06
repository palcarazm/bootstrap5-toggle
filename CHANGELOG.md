# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased
### Changed
* refactor: More specific CSS selectors

## [3.7.1](https://github.com/palcaraz/bootstrap5-toggle/tree/v3.7.1) 2022-08-09
### [Full Changelog](https://github.com/palcaraz/bootstrap5-toggle/compare/v3.7.0...v3.7.1)
### Fixed
* fix: Transparent inner border (#55) by @palcarazm in https://github.com/palcarazm/bootstrap5-toggle/pull/57
* fix: In input-group corners aren't rendered as expected (#54) by @palcarazm in https://github.com/palcarazm/bootstrap5-toggle/pull/59

## [3.7.0](https://github.com/palcaraz/bootstrap5-toggle/tree/v3.7.0) 2022-08-01
### [Full Changelog](https://github.com/palcaraz/bootstrap5-toggle/compare/v3.6.0...v3.7.0)
### Added
* feat: Distribution of ECMAS lib (#2) by @palcarazm in https://github.com/palcarazm/bootstrap5-toggle/pull/36
* feat: Support readonly attribute (#35) by @palcarazm in https://github.com/palcarazm/bootstrap5-toggle/pull/37
* feat: Toggles focusable from the keyboard (#38) by @palcarazm in https://github.com/palcarazm/bootstrap5-toggle/pull/41
* feat: Switch toggle from keyboard (#39) by @palcarazm in https://github.com/palcarazm/bootstrap5-toggle/pull/42
* feat: Custom value for on and off state on form submit (#34) by @palcarazm in https://github.com/palcarazm/bootstrap5-toggle/pull/43
* feat: Tristate toggle (#40) by @palcarazm in https://github.com/palcarazm/bootstrap5-toggle/pull/47
* feat: Support toggle silent method by @palcarazm in https://github.com/palcarazm/bootstrap5-toggle/pull/30
### Changed
* feat: Remove btn-light from handle  by @palcarazm in https://github.com/palcarazm/bootstrap5-toggle/pull/21
* feat: Change default btn off class to secondary  by @palcarazm in https://github.com/palcarazm/bootstrap5-toggle/pull/22
### Fixed
* fix: Handle border color and btn-light border color by @palcarazm in https://github.com/palcarazm/bootstrap5-toggle/pull/17
* fix: Render in input-group by @palcarazm in https://github.com/palcarazm/bootstrap5-toggle/pull/29

## [3.6.0](https://github.com/gitbrent/bootstrap4-toggle/tree/v3.6.0) 2019-10-17
### [Full Changelog](https://github.com/gitbrent/bootstrap4-toggle/compare/v3.5.0...v3.6.0)
### Added
- Added option to change toggle without triggering onChange event (silent toggle) [\#7](https://github.com/gitbrent/bootstrap4-toggle/issue/7) ([aswin1980](https://github.com/aswin1980))
- Added accessibility properties to labels [\#11](https://github.com/gitbrent/bootstrap4-toggle/issue/11) ([aproquot](https://github.com/aproquot))
### Changed
- Fixed URLs in js and css file top comment [\#5](https://github.com/gitbrent/bootstrap4-toggle/issue/5) ([wilecoyte78](https://github.com/wilecoyte78))
- Disable style is not working [\#18](https://github.com/gitbrent/bootstrap4-toggle/issue/18) ([rychlym](https://github.com/rychlym))

## [3.5.0](https://github.com/gitbrent/bootstrap4-toggle/tree/v3.5.0) 2019-07-02
### [Full Changelog](https://github.com/gitbrent/bootstrap4-toggle/compare/v3.4.0...v3.5.0)
### Added
- Added ARIA `role="button"` tag to toggle
- Added `cursor: pointer;` style to toggle
### Changed
- Fixed: Touch not working on mobile [\#2](https://github.com/gitbrent/bootstrap4-toggle/issue/2) ([wilecoyte78](https://github.com/wilecoyte78))
- Updated to Bootstrap version 4.3.1
- Updated README with better Yarn instructions

## [3.4.0](https://github.com/gitbrent/bootstrap4-toggle/tree/v3.4.0) 2019-01-03
### [Full Changelog](https://github.com/gitbrent/bootstrap4-toggle/compare/v3.3.0...v3.4.0)
### Added
- Outline button styles are now available
### Changed
- Updated to Bootstrap version 4.2.1

## [3.3.0](https://github.com/gitbrent/bootstrap4-toggle/tree/v3.3.0) 2018-12-19
### [Full Changelog](https://github.com/gitbrent/bootstrap4-toggle/compare/v3.2.0...v3.3.0)
### Added
- New test created to compare core bootstrap sizes to bootstrap4-toggle
### Changed
- Introduced new `size` values that mirror bootstrap 4: (`lg`, `sm`, `xs`)
- Converted all css units from `px` to `rem`
- Properly added border on `light` button (moved from .toggle class)
### Removed
**DEPRECATED** Classic `size` values (`large`, `small`, `mini`)


## [3.2.0](https://github.com/gitbrent/bootstrap4-toggle/tree/v3.2.0) 2018-11-27
### [Full Changelog](https://github.com/gitbrent/bootstrap4-toggle/compare/v3.1.0...v3.2.0)
### Added
### Changed
- Removed permanent `active` state from "Off" label so mouse-over highlighting works the same as "On"
### Removed



## [3.1.0](https://github.com/gitbrent/bootstrap4-toggle/tree/v3.1.0) 2018-10-25
### [Full Changelog](https://github.com/gitbrent/bootstrap4-toggle/compare/v3.0.0...v3.1.0)
### Added
- `index.html` includes new section with dark mode colors
### Changed
- `index.html` now fully responsive, better menu, rearranged sections
- Tweaked `border` property to work with all backgrounds and colors
### Removed



## [3.0.0](https://github.com/gitbrent/bootstrap4-toggle/tree/v3.0.0) 2018-10-21
### [Full Changelog](https://github.com/gitbrent/bootstrap4-toggle/compare/v2.2.2...v3.0.0)
### Added
- Touch support
### Changed
- Implements Bootstrap 4 colors/styles
### Removed
- Old Bootstrap 2 files

[Unreleased]: https://github.com/gitbrent/bootstrap4-toggle/compare/v1.9.0...HEAD
[3.2.0]: https://github.com/gitbrent/bootstrap4-toggle/compare/v3.1.0...v3.2.0
[3.1.0]: https://github.com/gitbrent/bootstrap4-toggle/compare/v3.0.0...v3.1.0
[3.0.0]: https://github.com/gitbrent/bootstrap4-toggle/compare/v2.2.2...v3.0.0
