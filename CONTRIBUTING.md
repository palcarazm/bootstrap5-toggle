# Contributing to Bootstrap 5 Toggle

Thank you for considering contributing to Bootstrap 5 Toggle! We appreciate your interest and are excited to collaborate with you. To ensure a smooth contribution process, please follow the guidelines outlined below.

## How to Contribute

### 1. **Fork and Clone**
Currently, we do not require forking the repository. Please clone the repository directly from the [ Bootstrap 5 Toggle GitHub repository](https://github.com/palcarazm/bootstrap5-toggle).

### 2. **Branch Structure**

- **Feature Branches**: For adding new features, create a branch from the `develop/vX.Y.Z` that corresponds to the milestone of the feature. If such a branch does not exist, use the nearest available `develop` branch. Name your branch `feat/XXX`, where `XXX` is the issue number. If no issue exists, create one first and wait until is validate and planned.

- **Fix Branches**: For bug fixes, create a branch from the `develop/vX.Y.Z` that aligns with the milestone of the fix. Name your branch `fix/XXX`, where `XXX` is the issue number. If no issue exists, create one and wait until is confirmed and planned.

### 3. **Commit Messages**
We use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages. When you install the project, Husky will add a commit-msg hook to enforce this convention via commit lint.

### 4. **Pull Requests**
- **Template**: Use the provided pull request template.
- **Checks**: Ensure your pull request passes all CI checks. The minimum test coverage is 80%.
- **Approval**: Pull requests must be reviewed and approved before merging.

## Testing and Validation

- **Running Tests**: Execute tests with `npm run test`. Unit Tests are written with Jest, and a minimum coverage of 80% is required. End-to-End test are written with Cypress.
- **Writing Tests**: Write tests using Jest to ensure coverage meets the 80% minimum requirement.

## Reporting Issues

- **Bug Reports**: Create an [Issue](https://github.com/palcarazm/bootstrap5-toggle/issues) of type `bug` following the issue template. We will review, categorize, and prioritize the issue as needed. Contributors will be credited in the Release Notes. For support, use the [Discussions](https://github.com/palcarazm/bootstrap5-toggle/discussions) section. For security issues, follow the instructions in `SECURITY.md` and **do not open a public issue**.

- **Feature Requests**: Create an [Issue](https://github.com/palcarazm/bootstrap5-toggle/issues) of type `feature` using the template provided. We will analyze, categorize, and prioritize the request. Contributors will be credited in the Release Notes. For ambitious features, we may move the discussion to a thread in the [Discussions](https://github.com/palcarazm/bootstrap5-toggle/discussions) section.

## Code Style and Standards

- **Style Guide**: Follow the ESLint configuration file provided in the repository. The style guide may be updated over time.
- **Linters and Formatters**: Use ESLint with Husky's pre-commit hook to enforce code quality.

## Documentation and Resources

- **Project Documentation**: All classes have JSDoc comments that should be updated. Documentation page is available in `gh-pages` branch.
- **Community Resources**: Participate in the [Discussions](https://github.com/palcarazm/bootstrap5-toggle/discussions) section for community support and engagement.

## Code of Conduct

Please adhere to our [Code of Conduct](CODE_OF_CONDUCT.md), which is based on the Contributor Covenant. We strive to create a welcoming and inclusive environment for all contributors.

## Contact

For any questions or further communication, you can reach us via [email](mailto:pablo@alcaraz.es) or preferably by opening a thread in the Q&A section of the [Discussions](https://github.com/palcarazm/bootstrap5-toggle/discussions) section.

Thank you for your contributions to bootstrap5-toggle!

