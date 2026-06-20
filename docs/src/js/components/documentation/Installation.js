import DocArticle from "./DocArticle";
import DocSection from "./DocSection";

class Installation extends DocSection {
  static build() {
    return super.build("installation", "Installation", [
      Installation.#cdn(),
      Installation.#github(),
      Installation.#npm(),
      Installation.#yarn(),
    ]);
  }

  static #cdn() {
    const ecmas = `<link href="https://cdn.jsdelivr.net/npm/bootstrap5-toggle@${versions.bootstrap5Toggle}/css/bootstrap5-toggle.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap5-toggle@${versions.bootstrap5Toggle}/js/bootstrap5-toggle.ecmas.min.js"></script>`;
    const jquery = `<link href="https://cdn.jsdelivr.net/npm/bootstrap5-toggle@${versions.bootstrap5Toggle}/css/bootstrap5-toggle.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap5-toggle@${versions.bootstrap5Toggle}/js/bootstrap5-toggle.jquery.min.js"></script>`;
    return DocArticle.build({
      title: "CDN",
      badge: {
        name: "jsDelivr",
        href: "https://www.jsdelivr.com/package/npm/bootstrap5-toggle",
        imgSrc:
          "https://img.shields.io/jsdelivr/npm/hm/bootstrap5-toggle?label=hits&logo=jsdelivr&logoColor=white",
      },
      codePanel: {
        name: "cdn",
        language: "html",
        contents: [ecmas, jquery],
      },
    });
  }

  static #github() {
    return DocArticle.build({
      title: "Download from GitHub",
      badge: {
        name: "Latest release",
        href: "https://github.com/palcarazm/bootstrap5-toggle/releases",
        imgSrc:
          "https://img.shields.io/github/package-json/v/palcarazm/bootstrap5-toggle/v5?logo=github",
      },
    });
  }

  static #npm() {
    return DocArticle.build({
      title: "NPM",
      badge: {
        name: "NPM",
        href: "https://www.npmjs.com/package/bootstrap5-toggle",
        imgSrc: "https://img.shields.io/npm/dm/bootstrap5-toggle?logo=npm",
      },
      codeBlock: {
        language: "shell",
        code: `npm install bootstrap5-toggle@${versions.bootstrap5Toggle}`,
      },
    });
  }

  static #yarn() {
    return DocArticle.build({
      title: "Yarn",
      codeBlock: {
        language: "shell",
        code: `yarn add bootstrap5-toggle@${versions.bootstrap5Toggle}`,
      },
    });
  }
}

export default Installation;
