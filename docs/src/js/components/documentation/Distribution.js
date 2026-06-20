import DocArticle from "./DocArticle";
import DocSection from "./DocSection";

class Distribution extends DocSection {
  static headers = ["Bootstrap Support", "Plugin Last Release", "End Of Life"];
  static entries = [
    { bootstrap: "5", plugin: "5", eol: "5" },
    { bootstrap: "4", plugin: "4", eol: "4" },
    { bootstrap: "3", plugin: "3", eol: "3" },
  ];

  static build() {
    return super.build(
      "distribution",
      "Library Distributions",
      [
        DocArticle.build({
          description: Distribution.#table(),
        }),
      ],
      "mb-3"
    );
  }

  static #table() {
    const container = document.createElement("div");
    container.className = "table-responsive";

    const table = document.createElement("table");
    table.className = "table  table-striped table-condensed mb-0";

    const caption = document.createElement("caption");
    caption.textContent = "Library Distributions";

    table.append(
      caption,
      Distribution.#tableHeader(),
      Distribution.#tableBody()
    );
    container.appendChild(table);
    return container;
  }

  static #tableHeader() {
    const thead = document.createElement("thead");
    const row = document.createElement("tr");

    Distribution.headers.forEach((headerText) => {
      const th = document.createElement("th");
      th.textContent = headerText;
      row.appendChild(th);
    });

    thead.appendChild(row);
    return thead;
  }

  static #tableBody() {
    const tbody = document.createElement("tbody");
    Distribution.entries.forEach((entry) => {
      const row = document.createElement("tr");
      const tdBootstrap = document.createElement("td");
      const aBootstrap = document.createElement("a");
      aBootstrap.href = `https://getbootstrap.com/docs/${entry.bootstrap}.0`;
      aBootstrap.target = "_blank";
      aBootstrap.rel = "noopener noreferrer";
      aBootstrap.title = `Bootstrap ${entry.bootstrap}`;
      const imgBootstrap = document.createElement("img");
      imgBootstrap.src = `https://img.shields.io/static/v1?label=bootstrap&message=%5Ev${entry.bootstrap}.0.0&color=informational&logo=bootstrap&logoColor=white`;
      imgBootstrap.alt = `Bootstrap ${entry.bootstrap}`;
      aBootstrap.appendChild(imgBootstrap);
      tdBootstrap.appendChild(aBootstrap);

      const tdPlugin = document.createElement("td");
      const aPlugin = document.createElement("a");
      aPlugin.href = `https://github.com/palcarazm/bootstrap5-toggle/releases`;
      aPlugin.target = "_blank";
      aPlugin.rel = "noopener noreferrer";
      aPlugin.title = `bs-toggle v${entry.plugin}`;
      const imgPlugin = document.createElement("img");
      imgPlugin.src = `https://img.shields.io/github/package-json/v/palcarazm/bootstrap5-toggle/v${entry.plugin}?logo=github`;
      imgPlugin.alt = `bs-toggle v${entry.plugin}`;
      aPlugin.appendChild(imgPlugin);
      tdPlugin.appendChild(aPlugin);

      const tdEOL = document.createElement("td");
      const aEOL = document.createElement("a");
      aEOL.href = `https://github.com/palcarazm/bootstrap5-toggle/security/policy`;
      aEOL.target = "_blank";
      aEOL.rel = "noopener noreferrer";
      aEOL.title = `End of Life`;
      const imgEOL = document.createElement("img");
      imgEOL.src = `https://img.shields.io/endpoint?url=https%3A%2F%2Fpalcarazm.github.io%2Fbootstrap5-toggle%2Fapi%2Feol%2Fv${entry.eol}`;
      imgEOL.alt = `EOL v${entry.eol}`;
      aEOL.appendChild(imgEOL);
      tdEOL.appendChild(aEOL);

      row.append(tdBootstrap, tdPlugin, tdEOL);
      tbody.appendChild(row);
    });
    return tbody;
  }
}

export default Distribution;
