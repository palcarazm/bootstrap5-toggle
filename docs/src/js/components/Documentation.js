import Distribution from "./documentation/Distribution";
import Installation from "./documentation/Installation";
import Usage from "./documentation/Usage";
import Features from "./documentation/Features";
import Api from "./documentation/Api";
import Events from "./documentation/Events";
import Accessibility from "./documentation/Accessibility";

class Documentation {
  static #sections = [
    Distribution.build(),
    Installation.build(),
    Usage.build(),
    Features.build(),
    Api.build(),
    Events.build(),
    Accessibility.build(),
  ];

  static build() {
    const documentation = document.createElement("div");
    documentation.className = "col-md-9 col-lg-10";

    documentation.append(...Documentation.#sections);

    return documentation;
  }
}

export default Documentation;
