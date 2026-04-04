[![GitHub license](https://img.shields.io/github/license/palcarazm/bootstrap5-toggle.svg?color=informational)](https://github.com/palcarazm/bootstrap5-toggle/blob/master/LICENSE)
[![Latest release](https://img.shields.io/github/package-json/v/palcarazm/bootstrap5-toggle/v5?logo=github)](https://github.com/palcarazm/bootstrap5-toggle/releases)
[![Bootstrap 5](https://img.shields.io/static/v1?label=bootstrap&message=%5E5.0.0&color=informational&logo=bootstrap&logoColor=white)](https://getbootstrap.com/docs/5.0)
[![JSDelivr Badge](https://img.shields.io/jsdelivr/npm/hm/bootstrap5-toggle?label=hits&logo=jsdelivr&logoColor=white)](https://www.jsdelivr.com/package/npm/bootstrap5-toggle)
[![NPM Badge](https://img.shields.io/npm/dm/bootstrap5-toggle?logo=npm)](https://www.npmjs.com/package/bootstrap5-toggle)
[![EOL](https://img.shields.io/endpoint?url=https%3A%2F%2Fpalcarazm.github.io%2Fbootstrap5-toggle%2Fapi%2Feol%2Fv5)](https://github.com/palcarazm/bootstrap5-toggle/security/policy)
[![Funding](https://img.shields.io/badge/sponsor-30363D?style=flat&logo=GitHub-Sponsors&logoColor=#white)](https://github.com/sponsors/palcarazm)

[![Coverage Status](https://img.shields.io/coverallsCoverage/github/palcarazm/bootstrap5-toggle?branch=v5&logo=coveralls)](https://coveralls.io/github/palcarazm/bootstrap5-toggle?branch=v5)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=palcarazm_bootstrap5-toggle&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=palcarazm_bootstrap5-toggle)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=palcarazm_bootstrap5-toggle&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=palcarazm_bootstrap5-toggle)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=palcarazm_bootstrap5-toggle&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=palcarazm_bootstrap5-toggle)
[![Security](https://img.shields.io/badge/security-monitored-informational?logo=snyk)](https://snyk.io/advisor/npm-package/bootstrap5-toggle)


# Bootstrap 5 Toggle

**Bootstrap 5 Toggle** is a bootstrap plugin/widget that converts checkboxes into toggles.

---

#### Library Distributions

|                           Version                            |                                                                             Bootstrap Support                                                                             |                                                                             Last Release                                                                              |                                                                                     End of Life                                                                                      |
| :----------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [v5](https://github.com/palcarazm/bootstrap5-toggle/tree/v5) | [![Bootstrap 5](https://img.shields.io/static/v1?label=bootstrap&message=%5E5.0.0&color=informational&logo=bootstrap&logoColor=white)](https://getbootstrap.com/docs/5.0) | [![Latest release](https://img.shields.io/github/package-json/v/palcarazm/bootstrap5-toggle/v5?logo=github)](https://github.com/palcarazm/bootstrap5-toggle/releases) | [![EOL](https://img.shields.io/endpoint?url=https%3A%2F%2Fpalcarazm.github.io%2Fbootstrap5-toggle%2Fapi%2Feol%2Fv5)](https://github.com/palcarazm/bootstrap5-toggle/security/policy) |
| [v4](https://github.com/palcarazm/bootstrap5-toggle/tree/v4) | [![Bootstrap 5](https://img.shields.io/static/v1?label=bootstrap&message=%5E5.0.0&color=informational&logo=bootstrap&logoColor=white)](https://getbootstrap.com/docs/5.0) | [![Latest release](https://img.shields.io/github/package-json/v/palcarazm/bootstrap5-toggle/v4?logo=github)](https://github.com/palcarazm/bootstrap5-toggle/releases) | [![EOL](https://img.shields.io/endpoint?url=https%3A%2F%2Fpalcarazm.github.io%2Fbootstrap5-toggle%2Fapi%2Feol%2Fv4)](https://github.com/palcarazm/bootstrap5-toggle/security/policy) |
| [v3](https://github.com/palcarazm/bootstrap5-toggle/tree/v3) | [![Bootstrap 4](https://img.shields.io/static/v1?label=bootstrap&message=%5E4.0.0&color=informational&logo=bootstrap&logoColor=white)](https://getbootstrap.com/docs/4.0) | [![Latest release](https://img.shields.io/github/package-json/v/palcarazm/bootstrap5-toggle/v3?logo=github)](https://github.com/palcarazm/bootstrap5-toggle/releases) | [![EOL](https://img.shields.io/endpoint?url=https%3A%2F%2Fpalcarazm.github.io%2Fbootstrap5-toggle%2Fapi%2Feol%2Fv3)](https://github.com/palcarazm/bootstrap5-toggle/security/policy) |

See EOL for each version in [Security Policy Page](https://github.com/palcarazm/bootstrap5-toggle/security/policy).

# Demo and documentation

**Please read our documentation page for a completed usage explanation:** https://palcarazm.github.io/bootstrap5-toggle/

---

<!-- To update TOC run .\node_modules\.bin\doctoc README.md --github -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installation](#installation)
  - [CDN](#cdn)
    - [ECMAS Interface](#ecmas-interface)
    - [jQuery Interface](#jquery-interface)
  - [Download](#download)
  - [NPM](#npm)
  - [Yarn](#yarn)
- [Usage](#usage)
  - [Initialize With HTML](#initialize-with-html)
  - [Initialize With Code](#initialize-with-code)
- [Collaborators welcome!](#collaborators-welcome)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

---

# Installation

## CDN

[![JSDelivr Badge](https://img.shields.io/jsdelivr/npm/hm/bootstrap5-toggle?label=hits&logo=jsdelivr&logoColor=white)](https://www.jsdelivr.com/package/npm/bootstrap5-toggle)

### ECMAS Interface

```html
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap5-toggle@5.3.0/css/bootstrap5-toggle.min.css"
  rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/npm/bootstrap5-toggle@5.3.0/js/bootstrap5-toggle.ecmas.min.js"></script>
```

### jQuery Interface

```html
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap5-toggle@5.3.0/css/bootstrap5-toggle.min.css"
  rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/npm/bootstrap5-toggle@5.3.0/js/bootstrap5-toggle.jquery.min.js"></script>
```

## Download

[![Latest release](https://img.shields.io/github/package-json/v/palcarazm/bootstrap5-toggle/v5?logo=github)](https://github.com/palcarazm/bootstrap5-toggle/releases)

## NPM

[![NPM Badge](https://img.shields.io/npm/dm/bootstrap5-toggle?logo=npm)](https://www.npmjs.com/package/bootstrap5-toggle)

```ksh
npm install bootstrap5-toggle@5.3.0
```

## Yarn

```ksh
yarn add bootstrap5-toggle@5.3.0
```

# Usage

## Initialize With HTML

Add `data-toggle="toggle"` to automatically convert a plain checkbox into a bootstrap 5 toggle.

```html
<input id="chkToggle" type="checkbox" data-toggle="toggle" />
```

## Initialize With Code

Toggles can also be initialized via JavaScript code.

EX: Initialize id `chkToggle` with a single line of JavaScript.

```html
<input id="chkToggle" type="checkbox" checked />
<script>
  document.querySelector("#chkToggle").bootstrapToggle();
</script>
```

# Collaborators welcome!

- :sos: Do you need some help? Open a thread in [GitHub Discussions Q&A](https://github.com/palcarazm/bootstrap5-toggle/discussions/new?category=q-a)
- :bug: Do you find a bug? Open an issue in [GitHub bug report](https://github.com/palcarazm/bootstrap5-toggle/issues/new?template=01-BUG_REPORT.yml)
- :bulb: Do you have a great idea? Open an issue in [GitHub feature request](https://github.com/palcarazm/bootstrap5-toggle/issues/new?template=02-FEATURE_REQUEST.yml)
- :computer: Do you know how to fix a bug? Open a pull request in [GitHub pull request](https://github.com/palcarazm/bootstrap5-toggle/compare).

[![GitHub Contributors](https://contrib.rocks/image?repo=palcarazm/bootstrap5-toggle)](https://github.com/palcarazm/bootstrap5-toggle/graphs/contributors)

¿Do you like the project? Give us a :star: in [GitHub](https://github.com/palcarazm/bootstrap5-toggle).
